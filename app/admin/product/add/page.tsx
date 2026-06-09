"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Check, X, Plus, Trash2, ImageIcon,
  Package, Tag, DollarSign, BarChart2, Truck, ChevronDown,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Variant {
  id: number;
  size: string;
  color: string;
  colorHex: string;
  sku: string;
  stock: number;
  price: string;
  salePrice: string;
  variantStatus: string;
}

interface ProductImage { id: number; url: string; file?: File; }

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-indigo-500">{icon}</span>
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-gray-400 hidden sm:block">{subtitle}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────
function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT = "w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all";
const SELECT = INPUT + " bg-white";

// ── Add Variant Modal ──────────────────────────────────────────────────────
function AddVariantModal({ onClose, onAdd }: { onClose: () => void; onAdd: (v: Variant) => void }) {
  const [form, setForm] = useState<Omit<Variant, "id">>({
    size: "", color: "", colorHex: "#6366f1", sku: "", stock: 0,
    price: "", salePrice: "", variantStatus: "Active",
  });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!form.size || !form.color || !form.price) { setError("Size, color and price are required."); return; }
    onAdd({ ...form, id: Date.now() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Add Variant</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={15} /></button>
        </div>
        <div className="p-5 space-y-4">
          {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Size" required>
              <input type="text" placeholder="e.g. S, M, L, XL, 42" value={form.size}
                onChange={e => setForm({ ...form, size: e.target.value })} className={INPUT} />
            </Field>
            <Field label="Font / Style">
              <input type="text" placeholder="e.g. Bold, Regular" value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })} className={INPUT} />
            </Field>
          </div>

          <Field label="Color" required>
            <div className="flex items-center gap-2">
              <input type="color" value={form.colorHex}
                onChange={e => setForm({ ...form, colorHex: e.target.value })}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
              <input type="text" placeholder="Color name (e.g. Black, Red)" value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
                className={INPUT + " flex-1"} />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Price" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" placeholder="0.00" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className={INPUT + " pl-6"} />
              </div>
            </Field>
            <Field label="Sale Price">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="text" placeholder="0.00" value={form.salePrice}
                  onChange={e => setForm({ ...form, salePrice: e.target.value })}
                  className={INPUT + " pl-6"} />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Display Order">
              <input type="number" min={0} value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })} className={INPUT} />
            </Field>
            <Field label="Sale End Date">
              <input type="date" className={INPUT} />
            </Field>
          </div>

          <Field label="SKU">
            <input type="text" placeholder="SKU-XXX-000" value={form.sku}
              onChange={e => setForm({ ...form, sku: e.target.value })} className={INPUT} />
          </Field>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center gap-2">
            <input type="checkbox" id="sync-price" className="accent-indigo-600" />
            <label htmlFor="sync-price" className="text-xs text-indigo-700 cursor-pointer">Sync price and stock with parent product</label>
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white">Cancel</button>
          <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Add Variant</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Basic Info
  const [name, setName]           = useState("");
  const [status, setStatus]       = useState("Active");
  const [vendor, setVendor]       = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]   = useState("Electronics");
  const [tags, setTags]           = useState<string[]>([]);
  const [tagInput, setTagInput]   = useState("");
  const [url, setUrl]             = useState("");
  const [barcode, setBarcode]     = useState("");

  // Pricing
  const [basePrice, setBasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [lastSale, setLastSale]   = useState("");

  // Inventory
  const [totalStock, setTotalStock]   = useState("");
  const [trackInventory, setTrackInventory] = useState(true);
  const [lowStockAlert, setLowStockAlert]   = useState("");
  const [outOfStockAction, setOutOfStockAction] = useState("Allow out-of-stock orders");

  // Media
  const [images, setImages]       = useState<ProductImage[]>([]);

  // Variants
  const [variants, setVariants]   = useState<Variant[]>([
    { id: 1, size: "Small", color: "Black", colorHex: "#1f2937", sku: "SKU-001-SM-BLK", stock: 25, price: "$89.99", salePrice: "$72.99", variantStatus: "Active" },
    { id: 2, size: "Medium", color: "Blue", colorHex: "#3b82f6", sku: "SKU-001-MD-BLU", stock: 15, price: "$89.99", salePrice: "Color Mix", variantStatus: "Active" },
  ]);

  // Shipping
  const [weight, setWeight]       = useState("");
  const [length, setLength]       = useState("");
  const [breadth, setBreadth]     = useState("");
  const [height, setHeight]       = useState("");

  // ── Handlers ──
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setImages(prev => [...prev, { id: Date.now() + Math.random(), url: ev.target?.result as string, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: number) => setImages(prev => prev.filter(i => i.id !== id));

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  const addVariant = (v: Variant) => { setVariants(prev => [...prev, v]); setShowVariantModal(false); };
  const removeVariant = (id: number) => setVariants(prev => prev.filter(v => v.id !== id));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Product name is required";
    if (!basePrice.trim()) e.basePrice = "Base price is required";
    if (!totalStock.trim()) e.totalStock = "Stock quantity is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (isDraft = false) => {
    if (!isDraft && !validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/admin/product");
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/admin/product")}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-xs text-gray-400 mt-0.5">Fill in the details below to list a new product</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={() => handleSave(true)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold transition-colors">
            {saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Check size={14} />}
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT (main) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Basic Information */}
          <Section icon={<Package size={15} />} title="Basic Information" subtitle="Product name, category & description">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Field label="Product Name" required>
                    <input type="text" placeholder="e.g. Wireless Headphones Pro" value={name}
                      onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })); }}
                      className={INPUT + (errors.name ? " border-red-300 focus:border-red-400" : "")} />
                  </Field>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <span className="text-xs font-medium text-gray-600">Status</span>
                  <div className="flex gap-2">
                    {["Active", "Draft"].map(s => (
                      <button key={s} onClick={() => setStatus(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${status === s ? s === "Active" ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <div onClick={() => setStatus(status === "Active" ? "Draft" : "Active")}
                    className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${status === "Active" ? "bg-indigo-600" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${status === "Active" ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vendor">
                  <input type="text" placeholder="Brand or supplier name" value={vendor}
                    onChange={e => setVendor(e.target.value)} className={INPUT} />
                </Field>
                <Field label="Collection">
                  <div className="relative">
                    <select value={collection} onChange={e => setCollection(e.target.value)} className={SELECT + " appearance-none pr-8"}>
                      <option value="">Select collection...</option>
                      {["Summer 2025", "Winter Essentials", "Best Sellers", "New Arrivals"].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </Field>
              </div>

              <Field label="Product Description">
                <textarea rows={4} placeholder="Describe your product in detail..." value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={INPUT + " resize-none"} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <select value={category} onChange={e => setCategory(e.target.value)} className={SELECT}>
                    {["Electronics", "Furniture", "Lighting", "Clothing", "Sports"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Tags">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input type="text" placeholder="Add tag..." value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addTag()}
                        className={INPUT + " flex-1"} />
                      <button onClick={addTag} className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 border border-indigo-200 transition-colors">Add</button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map(t => (
                          <span key={t} className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full">
                            {t}<button onClick={() => removeTag(t)} className="hover:text-red-500"><X size={10} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="URL / Handle">
                  <input type="text" placeholder="product-url-handle" value={url}
                    onChange={e => setUrl(e.target.value)} className={INPUT} />
                </Field>
                <Field label="Barcode / UPC">
                  <input type="text" placeholder="0 00000 00000 0" value={barcode}
                    onChange={e => setBarcode(e.target.value)} className={INPUT} />
                </Field>
              </div>
            </div>
          </Section>

          {/* Pricing */}
          <Section icon={<DollarSign size={15} />} title="Pricing" subtitle="Set your base and sale prices">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Base Price", value: basePrice, set: setBasePrice, error: errors.basePrice, req: true },
                { label: "+ Sale", value: salePrice, set: setSalePrice },
                { label: "Last Sale", value: lastSale, set: setLastSale },
              ].map(({ label, value, set, error, req }) => (
                <div key={label}>
                  <Field label={label} required={req}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input type="text" placeholder="0.00" value={value}
                        onChange={e => { (set as any)(e.target.value); if (error) setErrors(prev => ({ ...prev, basePrice: "" })); }}
                        className={INPUT + " pl-6" + (error ? " border-red-300" : "")} />
                    </div>
                  </Field>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
              ))}
            </div>
          </Section>

          {/* Inventory */}
          <Section icon={<BarChart2 size={15} />} title="Inventory" subtitle="Track stock levels">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Field label="Total Inventory" required>
                    <input type="number" min={0} placeholder="0" value={totalStock}
                      onChange={e => { setTotalStock(e.target.value); setErrors(prev => ({ ...prev, totalStock: "" })); }}
                      className={INPUT + (errors.totalStock ? " border-red-300" : "")} />
                  </Field>
                  {errors.totalStock && <p className="text-xs text-red-500 mt-1">{errors.totalStock}</p>}
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <span className="text-xs font-medium text-gray-600">Track Inventory</span>
                  <div onClick={() => setTrackInventory(!trackInventory)}
                    className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${trackInventory ? "bg-indigo-600" : "bg-gray-200"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${trackInventory ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Low Stock Alert">
                  <input type="number" min={0} placeholder="e.g. 10" value={lowStockAlert}
                    onChange={e => setLowStockAlert(e.target.value)} className={INPUT} />
                </Field>
                <Field label="When Out of Stock">
                  <select value={outOfStockAction} onChange={e => setOutOfStockAction(e.target.value)} className={SELECT}>
                    {["Allow out-of-stock orders", "Block purchases", "Show as 'Out of Stock'"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          </Section>

          {/* Product Media */}
          <Section icon={<ImageIcon size={15} />} title="Product Media" subtitle="Upload product images">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <div key={img.id} className={`relative group rounded-xl overflow-hidden border-2 ${i === 0 ? "border-indigo-400" : "border-gray-200"}`} style={{ width: 80, height: 80 }}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white text-[9px] text-center py-0.5 font-medium">Main</span>}
                    <button onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {/* Upload button */}
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                  <Plus size={18} className="text-gray-400 group-hover:text-indigo-500" />
                  <span className="text-[9px] text-gray-400 group-hover:text-indigo-500">Upload</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
              </div>
              {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/20 transition-all" onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Click to upload product images</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB each</p>
                </div>
              )}
              {images.length > 0 && <p className="text-xs text-gray-400">First image is the main product image. Click × to remove.</p>}
            </div>
          </Section>

          {/* Product Variants */}
          <Section icon={<Tag size={15} />} title="Product Variants" subtitle="Sizes, colors and options">
            <div className="space-y-3">
              {/* Variants table header */}
              {variants.length > 0 && (
                <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-2 mb-1">
                  <span className="col-span-1">Color</span>
                  <span className="col-span-2">Size</span>
                  <span className="col-span-3">SKU / Attributes</span>
                  <span className="col-span-1">SKU</span>
                  <span className="col-span-1">Stock</span>
                  <span className="col-span-2">Price</span>
                  <span className="col-span-1">Status</span>
                  <span className="col-span-1"></span>
                </div>
              )}

              {variants.map(v => (
                <div key={v.id} className="group rounded-xl border border-gray-100 bg-gray-50/50 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
                  {/* Desktop row */}
                  <div className="hidden sm:grid grid-cols-12 gap-2 items-center px-3 py-2.5">
                    <div className="col-span-1">
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: v.colorHex }} />
                    </div>
                    <span className="col-span-2 text-xs font-semibold text-gray-700">{v.size}</span>
                    <span className="col-span-3 text-xs text-gray-500">{v.color}</span>
                    <span className="col-span-1 text-[10px] text-gray-400 font-mono truncate">{v.sku}</span>
                    <span className="col-span-1 text-xs font-semibold text-gray-700">{v.stock}</span>
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-gray-800">{v.price}</p>
                      {v.salePrice && <p className="text-[10px] text-indigo-600">{v.salePrice}</p>}
                    </div>
                    <span className="col-span-1">
                      <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{v.variantStatus}</span>
                    </span>
                    <div className="col-span-1 flex justify-end">
                      <button onClick={() => removeVariant(v.id)} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all">
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="sm:hidden flex items-center gap-3 px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: v.colorHex }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{v.size} — {v.color}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{v.sku}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-gray-800">{v.price}</p>
                      <p className="text-[10px] text-gray-400">Stock: {v.stock}</p>
                    </div>
                    <button onClick={() => removeVariant(v.id)} className="p-1.5 rounded-lg hover:bg-red-100">
                      <Trash2 size={12} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={() => setShowVariantModal(true)}
                className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 px-1 pt-1 transition-colors">
                <Plus size={13} /> Add Variant
              </button>
            </div>
          </Section>

          {/* Shipping & Dimensions */}
          <Section icon={<Truck size={15} />} title="Shipping & Dimensions" subtitle="Weight and size details">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Weight (kg)", value: weight, set: setWeight, placeholder: "0.5" },
                { label: "Length (cm)", value: length, set: setLength, placeholder: "30" },
                { label: "Breadth (cm)", value: breadth, set: setBreadth, placeholder: "20" },
                { label: "Height (cm)", value: height, set: setHeight, placeholder: "10" },
              ].map(({ label, value, set, placeholder }) => (
                <Field key={label} label={label}>
                  <input type="number" min={0} placeholder={placeholder} value={value}
                    onChange={e => (set as any)(e.target.value)} className={INPUT} />
                </Field>
              ))}
            </div>
          </Section>
        </div>

        {/* ── RIGHT sidebar ── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Quick summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 sticky top-4">
            <h3 className="text-sm font-semibold text-gray-800">Product Summary</h3>
            <div className="space-y-2.5 text-xs">
              {[
                ["Name", name || "—"],
                ["Category", category],
                ["Base Price", basePrice ? `$${basePrice}` : "—"],
                ["Stock", totalStock || "—"],
                ["Status", status],
                ["Variants", String(variants.length)],
                ["Images", String(images.length)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400">{k}</span>
                  <span className={`font-semibold truncate max-w-[120px] text-right ${k === "Status" ? status === "Active" ? "text-green-600" : "text-yellow-600" : "text-gray-700"}`}>{v}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              <button onClick={() => handleSave(false)} disabled={saving}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold transition-colors">
                {saving
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Publishing...</>
                  : <><Check size={14} /> Publish Product</>}
              </button>
              <button onClick={() => handleSave(true)} className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button onClick={() => router.push("/admin/product")} className="w-full py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">
                Discard & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky footer */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-2 shadow-lg z-30">
        <button onClick={() => handleSave(true)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Draft</button>
        <button onClick={() => handleSave(false)} disabled={saving}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-1.5">
          {saving ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Check size={14} />}
          {saving ? "Publishing..." : "Publish"}
        </button>
      </div>

      {showVariantModal && <AddVariantModal onClose={() => setShowVariantModal(false)} onAdd={addVariant} />}
    </div>
  );
}