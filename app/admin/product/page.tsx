"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Plus, TrendingUp, AlertTriangle, RefreshCw, ShoppingBag,
  ChevronLeft, ChevronRight, MoreVertical, ImageIcon, X, Check, Pencil, Trash2, Eye,
  Tag, Package, BarChart2, Truck, DollarSign,
} from "lucide-react";

type PStatus = "Active"|"Draft"|"Out of Stock";
interface Product {
  id:number; name:string; sku:string; category:string; stock:number;
  stockStatus:string; price:string; status:PStatus;
  description?: string; vendor?: string; collection?: string; tags?: string[];
  images?: string[]; variants?: any[]; weight?: string; dimensions?: string;
}

const PRODUCTS: Product[] = [
  { id:1, name:"Ergonomic Office Chair",     sku:"SKU-CHAIR-001", category:"Furniture",   stock:145, stockStatus:"high",   price:"$299.00", status:"Active",
    description:"A premium ergonomic chair designed for all-day comfort with adjustable lumbar support.", vendor:"ErgoLine", tags:["Best Seller","Office"] },
  { id:2, name:"Wireless Mechanical Keyboard",sku:"SKU-KB-002",   category:"Electronics", stock:12,  stockStatus:"low",    price:"$149.50", status:"Active",
    description:"RGB backlit mechanical keyboard with hot-swappable switches.", vendor:"TechCraft", tags:["New"] },
  { id:3, name:"Noise Cancelling Headphones", sku:"SKU-HP-003",   category:"Electronics", stock:0,   stockStatus:"out",    price:"$349.00", status:"Out of Stock",
    description:"Premium over-ear headphones with active noise cancellation and 30-hour battery life.", vendor:"AudioPro" },
  { id:4, name:"Minimalist Desk Lamp",        sku:"SKU-LMP-004",  category:"Lighting",    stock:50,  stockStatus:"medium", price:"$89.00",  status:"Draft",
    description:"Dimmable LED desk lamp with a sleek minimalist design.", vendor:"LightHouse" },
  { id:5, name:"Standing Desk Frame",         sku:"SKU-DSK-005",  category:"Furniture",   stock:8,   stockStatus:"low",    price:"$499.00", status:"Active",
    description:"Electric height-adjustable standing desk frame, supports up to 100kg.", vendor:"ErgoLine" },
  { id:6, name:"USB-C Hub 7-in-1",            sku:"SKU-HUB-006",  category:"Electronics", stock:200, stockStatus:"high",   price:"$59.99",  status:"Active",
    description:"7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader and PD charging.", vendor:"TechCraft" },
  { id:7, name:"Bamboo Monitor Stand",        sku:"SKU-STD-007",  category:"Furniture",   stock:30,  stockStatus:"medium", price:"$45.00",  status:"Active",
    description:"Eco-friendly bamboo monitor stand with built-in storage drawer.", vendor:"EcoDesk" },
  { id:8, name:"LED Desk Pad",                sku:"SKU-PAD-008",  category:"Lighting",    stock:0,   stockStatus:"out",    price:"$35.00",  status:"Out of Stock",
    description:"RGB LED desk mat that doubles as an extended mousepad.", vendor:"LightHouse" },
];

const STAT_CARDS = [
  { label:"Total Products",  value:"3,456", sub:"+5% this week",   subColor:"text-green-600",  icon:ShoppingBag,   iconBg:"bg-indigo-50", iconColor:"text-indigo-500" },
  { label:"Active Listings", value:"3,120", sub:"90% of total",    subColor:"text-green-500",  icon:RefreshCw,     iconBg:"bg-green-50",  iconColor:"text-green-500" },
  { label:"Low Stock Alert", value:"24",    sub:"Requires attention",subColor:"text-orange-500",icon:AlertTriangle, iconBg:"bg-orange-50", iconColor:"text-orange-400" },
  { label:"Out of Stock",    value:"12",    sub:"Action required",  subColor:"text-red-500",    icon:TrendingUp,    iconBg:"bg-red-50",    iconColor:"text-red-400" },
];

const STATUS_STYLE: Record<PStatus, string> = {
  "Active":       "bg-green-100 text-green-700",
  "Draft":        "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-gray-100 text-gray-500",
};
const STOCK_STYLE: Record<string,string> = { high:"bg-indigo-100 text-indigo-600", medium:"bg-blue-100 text-blue-600", low:"bg-orange-100 text-orange-600", out:"bg-red-100 text-red-600" };

const PAGE_SIZE = 5;
const CATEGORIES = ["All","Furniture","Electronics","Lighting"];
const STORAGE_KEY = "marketpro_products";

function Shimmer({ className="" }: { className?:string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />;
}

function Toast({ message, type="success", onClose }: { message:string; type?:"success"|"error"; onClose:()=>void }) {
  useEffect(() => { const t = setTimeout(onClose,3000); return ()=>clearTimeout(t); },[onClose]);
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type==="success"?"bg-gray-900":"bg-red-600"}`}>
      {type==="success"?<Check size={13}/>:<X size={13}/>}{message}
    </div>
  );
}

// ── View Product Modal (FULL DETAILS) ───────────────────────────────────────
function ViewProductModal({ product, onClose, onEdit, onDelete }: {
  product: Product; onClose: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div>
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Product Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">Full information for {product.sku}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18}/></button>
        </div>

        <div className="p-6 space-y-5">

          {/* Top: image + name/price/status */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={28} className="text-gray-300" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{product.name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLE[product.status]}`}>{product.status}</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{product.price}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{product.sku}</span>
                <span>·</span>
                <span>{product.category}</span>
                {product.vendor && <><span>·</span><span>{product.vendor}</span></>}
              </div>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.tags.map(t => (
                    <span key={t} className="text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Description</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5">{product.description}</p>
            </div>
          )}

          {/* Key stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Stock", value: product.stock, icon: BarChart2, badge: STOCK_STYLE[product.stockStatus] },
              { label: "Price", value: product.price, icon: DollarSign },
              { label: "Category", value: product.category, icon: Tag },
              { label: "SKU", value: product.sku, icon: Package, mono: true },
            ].map(({ label, value, icon: Icon, badge, mono }) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Icon size={11} />
                  <span className="text-[10px] uppercase tracking-wide font-semibold">{label}</span>
                </div>
                {badge ? (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full inline-block ${badge}`}>{value}</span>
                ) : (
                  <p className={`text-sm font-bold text-gray-800 dark:text-gray-100 truncate ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Variants ({product.variants.length})</p>
              <div className="space-y-2">
                {product.variants.map((v: any) => (
                  <div key={v.id} className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full border-2 border-white shadow shrink-0" style={{ backgroundColor: v.colorHex }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{v.size} — {v.color}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{v.sku}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-100 shrink-0">{v.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping info */}
          {(product.weight || product.dimensions) && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Truck size={11} /> Shipping
              </p>
              <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                {product.weight && <span>Weight: <span className="font-semibold">{product.weight}kg</span></span>}
                {product.dimensions && <span>Dimensions: <span className="font-semibold">{product.dimensions}</span></span>}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900">
          <button onClick={onDelete} className="flex-1 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center gap-1.5 transition-colors">
            <Trash2 size={14} /> Delete
          </button>
          <button onClick={onEdit} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
            <Pencil size={14} /> Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal ───────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSave }: { product:Product; onClose:()=>void; onSave:(p:Product)=>void }) {
  const [form, setForm] = useState({ ...product });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Edit Product</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={16}/></button>
        </div>
        {[
          { label:"Product Name", key:"name",     type:"text" },
          { label:"SKU",          key:"sku",      type:"text" },
          { label:"Price",        key:"price",    type:"text" },
          { label:"Stock",        key:"stock",    type:"number" },
        ].map(({label,key,type})=>(
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
            <input type={type} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:type==="number"?Number(e.target.value):e.target.value})}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value as PStatus})}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>Active</option><option>Draft</option><option>Out of Stock</option>
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
          <button onClick={()=>onSave(form)} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────
function DeleteModal({ name, onClose, onConfirm }: { name: string; onClose:()=>void; onConfirm:()=>void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center" onClick={e=>e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center mx-auto"><Trash2 size={20} className="text-red-500"/></div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Delete Product?</h3>
          <p className="text-xs text-gray-400 mt-1">Are you sure you want to delete <span className="font-semibold text-gray-700 dark:text-gray-200">{name}</span>? This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const [loading, setLoading]     = useState(true);
  const [products, setProducts]   = useState<Product[]>([]);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewProduct, setViewProduct] = useState<Product|null>(null);
  const [editProduct, setEditProduct] = useState<Product|null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product|null>(null);
  const [openMenu, setOpenMenu]   = useState<number|null>(null);
  const [toast, setToast]         = useState<{msg:string;type:"success"|"error"}|null>(null);

  // ── Load products: merge mock data with any newly added ones from localStorage ──
  useEffect(()=>{
    setTimeout(()=>{
      let stored: Product[] = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) stored = JSON.parse(raw);
      } catch {}
      setProducts([...stored, ...PRODUCTS]);
      setLoading(false);
    },1600);
  },[]);

  // Close menu on outside click (use mousedown + check target isn't inside the menu)
  useEffect(()=>{
    const h = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-product-menu]')) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  },[]);

  const showToast = useCallback((msg:string, type:"success"|"error"="success")=>setToast({msg,type}),[]);

  const filtered = products.filter(p=>{
    const s = p.name.toLowerCase().includes(search.toLowerCase())||p.sku.toLowerCase().includes(search.toLowerCase());
    const c = category==="All"||p.category===category;
    return s&&c;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length/PAGE_SIZE));
  const paginated  = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  const handleSave = (updated:Product) => {
    setProducts(prev=>prev.map(p=>p.id===updated.id?updated:p));
    setEditProduct(null); showToast("Product updated!");
  };

  const handleDelete = (id:number) => {
    setProducts(prev=>prev.filter(p=>p.id!==id));
    // also remove from localStorage if it was a custom-added one
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: Product[] = JSON.parse(raw);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored.filter(p=>p.id!==id)));
      }
    } catch {}
    setOpenMenu(null);
    setDeleteProduct(null);
    setViewProduct(null);
    showToast("Product deleted","error");
  };

  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between"><Shimmer className="h-6 w-24"/><Shimmer className="h-9 w-32 rounded-lg"/></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i=>(
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-20"/><Shimmer className="h-7 w-7 rounded-lg"/></div>
            <Shimmer className="h-7 w-24"/><Shimmer className="h-3 w-28"/>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-3">
        <div className="flex gap-3"><Shimmer className="h-9 flex-1 max-w-sm"/><Shimmer className="h-9 w-40 rounded-lg"/></div>
        {[1,2,3,4,5].map(i=>(
          <div key={i} className="flex items-center gap-3 py-2">
            <Shimmer className="w-10 h-10 rounded-xl"/><Shimmer className="h-3 flex-1"/><Shimmer className="h-3 w-20"/><Shimmer className="h-6 w-14 rounded-full"/>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Products</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track all your products</p>
        </div>
        <button onClick={() => router.push("/admin/product/add")}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={14}/> Add Product
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map(s=>{ const Icon=s.icon; return (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center`}><Icon size={14} className={s.iconColor}/></div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-none">{s.value}</p>
            <p className={`text-[10px] sm:text-xs font-medium ${s.subColor}`}>{s.sub}</p>
          </div>
        );})}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search products..." value={search}
                onChange={e=>{ setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 self-start">
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>{ setCategory(c); setCurrentPage(1); }}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${category===c?"bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>{c}</button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400">{filtered.length} product{filtered.length!==1?"s":""} found</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                {["Image","Product Name","SKU","Category","Stock","Price","Status",""].map(h=><th key={h} className="px-5 py-3 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {paginated.length===0?(
                <tr><td colSpan={8} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><Search size={16} className="text-gray-400"/></div>
                    <p className="text-sm text-gray-400">No products found.</p>
                  </div>
                </td></tr>
              ):paginated.map(p=>(
                <tr key={p.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                      {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-gray-400"/>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={()=>setViewProduct(p)} className="font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 transition-colors text-left">{p.name}</button>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{p.sku}</td>
                  <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 text-xs">{p.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STOCK_STYLE[p.stockStatus]}`}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800 dark:text-gray-100">{p.price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="relative">
                      <button onClick={(e)=>{ e.stopPropagation(); e.preventDefault(); setOpenMenu(prev => prev===p.id?null:p.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                        <MoreVertical size={14} className="text-gray-400"/>
                      </button>
                      {openMenu===p.id&&(
                        <div data-product-menu className="absolute right-0 top-8 z-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-1 w-36" onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>{ setViewProduct(p); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"><Eye size={12}/>View</button>
                          <button onClick={()=>{ setEditProduct(p); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"><Pencil size={12}/>Edit</button>
                          <div className="border-t border-gray-100 dark:border-gray-800 my-1"/>
                          <button onClick={()=>{ setDeleteProduct(p); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"><Trash2 size={12}/>Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-50 dark:divide-gray-800">
          {paginated.length===0?<p className="text-center text-sm text-gray-400 py-10">No products found.</p>
          :paginated.map(p=>(
            <div key={p.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer" onClick={()=>setViewProduct(p)}>
              <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
                {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-gray-400"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{p.name}</p>
                <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-400">{p.category}</span>
                  <span className="text-gray-200">·</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STOCK_STYLE[p.stockStatus]}`}>{p.stock}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{p.price}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 dark:border-gray-800 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length===0?0:(currentPage-1)*PAGE_SIZE+1}–{Math.min(currentPage*PAGE_SIZE,filtered.length)}</span> of <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40"><ChevronLeft size={14} className="text-gray-500"/></button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)} className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${currentPage===p?"bg-[#4F46E5] text-white":"border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>{p}</button>
            ))}
            <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40"><ChevronRight size={14} className="text-gray-500"/></button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {viewProduct && (
        <ViewProductModal
          product={viewProduct}
          onClose={()=>setViewProduct(null)}
          onEdit={()=>{ setEditProduct(viewProduct); setViewProduct(null); }}
          onDelete={()=>setDeleteProduct(viewProduct)}
        />
      )}
      {editProduct && <ProductModal product={editProduct} onClose={()=>setEditProduct(null)} onSave={handleSave}/>}
      {deleteProduct && (
        <DeleteModal name={deleteProduct.name} onClose={()=>setDeleteProduct(null)} onConfirm={()=>handleDelete(deleteProduct.id)}/>
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}