"use client";

import { useState } from "react";
import {
  Store, MapPin, Truck, CreditCard, Share2,
  ImageIcon, Plus, Pencil, Check, X, Trash2, Calendar,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface ShippingZone {
  id: number;
  state: string;
  lga: string;
  station: string;
  amount: number;
  collectionDays: number;
}

// ── Initial shipping zones ─────────────────────────────────────────────────
const INITIAL_ZONES: ShippingZone[] = [
  { id: 1, state: "Oyo",   lga: "Ibadan North",  station: "Olomi Delivery Station",  amount: 1200, collectionDays: 3 },
  { id: 2, state: "Oyo",   lga: "Lagelu",        station: "Olunde Delivery Station", amount: 1000, collectionDays: 3 },
  { id: 3, state: "Lagos", lga: "Ikeja",         station: "Ikeja Pickup Hub",        amount: 1500, collectionDays: 5 },
];

const EMPTY_ZONE: Omit<ShippingZone, "id"> = {
  state: "", lga: "", station: "", amount: 0, collectionDays: 3,
};

// ── Shipping Zone Modal ────────────────────────────────────────────────────
function ShippingModal({
  zone, onClose, onSave,
}: {
  zone: Partial<ShippingZone> | null;
  onClose: () => void;
  onSave: (z: Omit<ShippingZone, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<ShippingZone, "id">>(
    zone ? { state: zone.state ?? "", lga: zone.lga ?? "", station: zone.station ?? "", amount: zone.amount ?? 0, collectionDays: zone.collectionDays ?? 3 }
          : { ...EMPTY_ZONE }
  );
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!form.state.trim() || !form.lga.trim() || !form.station.trim()) {
      setError("State, LGA, and delivery station are required.");
      return;
    }
    if (form.amount < 0) { setError("Amount cannot be negative."); return; }
    if (form.collectionDays < 1) { setError("Collection days must be at least 1."); return; }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">{zone?.id ? "Edit" : "Add"} Shipping Zone</h3>
            <p className="text-xs text-gray-400 mt-0.5">Set location, delivery station and rate</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={16} /></button>
        </div>

        <div className="p-5 space-y-4">
          {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          {/* Location fields */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5"><MapPin size={12} /> Location Details</p>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">State</label>
              <input type="text" placeholder="e.g. Oyo, Lagos, Abuja" value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Local Government Area (LGA)</label>
              <input type="text" placeholder="e.g. Ibadan North, Ikeja, Surulere" value={form.lga}
                onChange={(e) => setForm({ ...form, lga: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Delivery Station in LGA</label>
              <input type="text" placeholder="e.g. Olomi Delivery Station" value={form.station}
                onChange={(e) => setForm({ ...form, station: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white" />
            </div>
          </div>

          {/* Shipping amount */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5"><Truck size={12} /> Shipping Rate</p>
            <label className="block text-xs text-gray-500 mb-1">
              Delivery fee in Naira — <span className="text-green-600 font-medium">enter 0 for free delivery</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">₦</span>
              <input type="number" min={0} placeholder="0" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Math.max(0, Number(e.target.value)) })}
                className="w-full pl-8 pr-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white" />
            </div>
            {form.amount === 0 && (
              <p className="text-[11px] text-green-600 font-medium flex items-center gap-1"><Check size={11} /> This zone will have free delivery</p>
            )}
          </div>

          {/* Collection days */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5"><Calendar size={12} /> Collection / Delivery Days</p>
            <label className="block text-xs text-gray-500">
              How many days after ordering before delivery is available
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setForm({ ...form, collectionDays: Math.max(1, form.collectionDays - 1) })}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 font-bold text-lg">−</button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-gray-800">{form.collectionDays}</span>
                <p className="text-[10px] text-gray-400">{form.collectionDays === 1 ? "day" : "days"} after order</p>
              </div>
              <button onClick={() => setForm({ ...form, collectionDays: form.collectionDays + 1 })}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 font-bold text-lg">+</button>
            </div>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 5, 7].map((d) => (
                <button key={d} onClick={() => setForm({ ...form, collectionDays: d })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${form.collectionDays === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"}`}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
            {zone?.id ? "Save Changes" : "Add Zone"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function StoreSettingsPage() {
  const [saved, setSaved]             = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [shippingModal, setShippingModal] = useState<{ open: boolean; zone: Partial<ShippingZone> | null }>({ open: false, zone: null });
  const [zones, setZones]             = useState<ShippingZone[]>(INITIAL_ZONES);
  const [deleteZoneId, setDeleteZoneId] = useState<number | null>(null);

  const [bankDetails, setBankDetails] = useState({
    name: "Chase Business Checking",
    accountNumber: "•••• •••• •••• 4521",
    routingNumber: "011000138",
    accountType: "Business Checking",
  });

  const [store, setStore] = useState({
    name: "Luminary Aesthetics",
    description: "Premium handcrafted home decor and luxury lifestyle accessories for the modern individual.",
    email: "hello@luminary.com",
    phone: "+1 (800) 012-3456",
    address: "123 Artisan Way, Design District",
    city: "San Francisco",
    state: "94102",
    businessType: "Limited Liability Company (LLC)",
    taxId: "XX-XXXXXXX",
    showTax: true,
    twitterX: "@luminary_home",
    twitter: "",
    pinterest: "",
    banner: "",
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const handleSaveZone = (data: Omit<ShippingZone, "id">) => {
    if (shippingModal.zone?.id) {
      setZones((prev) => prev.map((z) => z.id === shippingModal.zone!.id ? { ...data, id: z.id } : z));
    } else {
      setZones((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShippingModal({ open: false, zone: null });
  };

  const handleDeleteZone = (id: number) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
    setDeleteZoneId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your store identity, logistics, and financial information.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
            <Check size={12} /> Settings saved successfully
          </div>
        )}
      </div>

      {/* ── Basic Info ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2"><Store size={15} className="text-indigo-500" /><h2 className="text-sm font-semibold text-gray-800">Basic Info</h2></div>
          <p className="text-xs text-gray-400 hidden sm:block">Your public store name and branding.</p>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-2">Store Logo</label>
              <label htmlFor="store-logo" className="relative w-full h-28 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <input id="store-logo" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center transition-colors">
                  <ImageIcon size={18} className="text-gray-400 group-hover:text-indigo-500" />
                </div>
                <p className="text-xs text-gray-400">PNG, JPG — 1024×1024</p>
              </label>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Store Name</label>
                <input type="text" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea rows={3} value={store.description} onChange={(e) => setStore({ ...store, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Banner Image</label>
            <input type="file" id="banner-upload" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setStore({ ...store, banner: ev.target?.result as string }); r.readAsDataURL(f); } }} />
            <label htmlFor="banner-upload" className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
              <ImageIcon size={16} className="text-gray-400 group-hover:text-indigo-500" />
              <p className="text-[11px] text-gray-400">Upload wide banner (1920×400)</p>
            </label>
            {store.banner && (
              <div className="mt-3 relative">
                <img src={store.banner} alt="Banner" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                <button onClick={() => setStore({ ...store, banner: "" })} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"><X size={14} /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact & Business ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100"><MapPin size={15} className="text-indigo-500" /><h2 className="text-sm font-semibold text-gray-800">Contact & Location</h2></div>
          <div className="p-5 space-y-3">
            {[{label:"Public Email",key:"email",type:"email"},{label:"Phone Number",key:"phone",type:"tel"},{label:"Street Address",key:"address",type:"text"}].map(({label,key,type})=>(
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
                <input type={type} value={(store as any)[key]} onChange={(e)=>setStore({...store,[key]:e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">City</label><input type="text" value={store.city} onChange={e=>setStore({...store,city:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">ZIP / Postal</label><input type="text" value={store.state} onChange={e=>setStore({...store,state:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100"><CreditCard size={15} className="text-indigo-500"/><h2 className="text-sm font-semibold text-gray-800">Business Details</h2></div>
          <div className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Business Type</label>
              <select value={store.businessType} onChange={e=>setStore({...store,businessType:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white">
                {["Limited Liability Company (LLC)","Sole Proprietorship","Corporation","Partnership"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">Tax ID / EIN</label><input type="text" value={store.taxId} onChange={e=>setStore({...store,taxId:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div onClick={()=>setStore({...store,showTax:!store.showTax})} className={`relative w-9 h-5 rounded-full transition-colors ${store.showTax?"bg-indigo-600":"bg-gray-200"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${store.showTax?"translate-x-4":"translate-x-0.5"}`}/>
              </div>
              <span className="text-xs text-gray-600 font-medium">Show business registration on storefront</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Shipping Settings ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2"><Truck size={15} className="text-indigo-500"/><h2 className="text-sm font-semibold text-gray-800">Shipping Settings</h2></div>
          <p className="text-xs text-gray-400 hidden sm:block">Configure delivery zones, rates and collection days.</p>
        </div>

        <div className="p-5 space-y-3">
          {/* Table header — desktop */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3">
            <span className="col-span-3">State</span>
            <span className="col-span-3">LGA</span>
            <span className="col-span-3">Delivery Station</span>
            <span className="col-span-1 text-center">Days</span>
            <span className="col-span-1 text-right">Rate</span>
            <span className="col-span-1"></span>
          </div>

          {zones.length === 0 && (
            <div className="py-8 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2"><Truck size={16} className="text-gray-400"/></div>
              <p className="text-sm text-gray-400">No shipping zones yet.</p>
              <p className="text-xs text-gray-400 mt-0.5">Add a zone to get started.</p>
            </div>
          )}

          {zones.map((zone) => (
            <div key={zone.id} className="group rounded-xl border border-gray-100 bg-gray-50/50 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all">
              {/* Desktop row */}
              <div className="hidden sm:grid grid-cols-12 gap-2 items-center px-3 py-3">
                <div className="col-span-3">
                  <p className="text-xs font-semibold text-gray-800">{zone.state}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-gray-600">{zone.lga}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-gray-500 truncate">{zone.station}</p>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full">{zone.collectionDays}d</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className={`text-xs font-bold ${zone.amount === 0 ? "text-green-600" : "text-gray-800"}`}>
                    {zone.amount === 0 ? "Free" : `₦${zone.amount.toLocaleString()}`}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button onClick={() => setShippingModal({ open: true, zone })} className="p-1.5 rounded-lg hover:bg-indigo-100 opacity-0 group-hover:opacity-100 transition-all">
                    <Pencil size={12} className="text-indigo-500"/>
                  </button>
                  <button onClick={() => setDeleteZoneId(zone.id)} className="p-1.5 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={12} className="text-red-500"/>
                  </button>
                </div>
              </div>

              {/* Mobile card */}
              <div className="sm:hidden p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-800">{zone.station}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{zone.lga}, {zone.state}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setShippingModal({ open: true, zone })} className="p-1.5 rounded-lg hover:bg-indigo-100 transition-colors"><Pencil size={12} className="text-indigo-500"/></button>
                    <button onClick={() => setDeleteZoneId(zone.id)} className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={12} className="text-red-500"/></button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Calendar size={9}/> {zone.collectionDays} day{zone.collectionDays !== 1 ? "s" : ""}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${zone.amount === 0 ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-700"}`}>
                    {zone.amount === 0 ? "🎉 Free" : `₦${zone.amount.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => setShippingModal({ open: true, zone: null })}
            className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-1 pt-1">
            <Plus size={13} /> Add New Shipping Zone
          </button>

          {/* Summary */}
          {zones.length > 0 && (
            <div className="mt-2 pt-3 border-t border-gray-100 flex flex-wrap gap-3 text-xs text-gray-400">
              <span>{zones.length} zone{zones.length !== 1 ? "s" : ""} configured</span>
              <span>·</span>
              <span className="text-green-600 font-medium">{zones.filter(z => z.amount === 0).length} free delivery zone{zones.filter(z => z.amount === 0).length !== 1 ? "s" : ""}</span>
              <span>·</span>
              <span>Avg. {(zones.reduce((s, z) => s + z.collectionDays, 0) / zones.length).toFixed(1)} days collection</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Bank & Socials ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100"><CreditCard size={15} className="text-indigo-500"/><h2 className="text-sm font-semibold text-gray-800">Bank & Payouts</h2></div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">CH</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700">{bankDetails.name}</p>
                <p className="text-[10px] text-gray-400">{bankDetails.accountNumber}</p>
              </div>
              <button onClick={() => setShowBankModal(true)} className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition-colors">Change</button>
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-gray-400">Next scheduled: 10/24 2025</p>
              <p className="text-sm font-bold text-gray-800">$1,620.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100"><Share2 size={15} className="text-indigo-500"/><h2 className="text-sm font-semibold text-gray-800">Socials</h2></div>
          <div className="p-5 space-y-3">
            {[{label:"X / Twitter",placeholder:"@handle",key:"twitterX"},{label:"Instagram",placeholder:"@yourstore",key:"twitter"},{label:"Pinterest",placeholder:"pinterest.com/store",key:"pinterest"}].map(s=>(
              <div key={s.key}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{s.label}</label>
                <input type="text" placeholder={s.placeholder} value={(store as any)[s.key]} onChange={e=>setStore({...store,[s.key]:e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-gray-300"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col xs:flex-row items-center justify-between gap-3 pt-1 border-t border-gray-100">
        <p className="text-xs text-gray-400">All changes automatically synced to store.</p>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-500 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Discard Changes</button>
          <button onClick={handleSave} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">Save Changes</button>
        </div>
      </div>

      {/* ── Shipping Zone Modal ── */}
      {shippingModal.open && (
        <ShippingModal zone={shippingModal.zone} onClose={() => setShippingModal({ open: false, zone: null })} onSave={handleSaveZone} />
      )}

      {/* ── Delete Zone Confirm ── */}
      {deleteZoneId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteZoneId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto"><Trash2 size={20} className="text-red-500"/></div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Delete Shipping Zone?</h3>
              <p className="text-xs text-gray-400 mt-1">This zone will be permanently removed. This action cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDeleteZoneId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDeleteZone(deleteZoneId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bank Modal ── */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setShowBankModal(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div><h3 className="text-sm font-semibold text-gray-900">Change Bank Account</h3><p className="text-xs text-gray-500">Update your payout details securely.</p></div>
              <button onClick={() => setShowBankModal(false)} className="p-2 text-gray-400 hover:text-gray-600"><X size={16}/></button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">Account Name</label><input type="text" value={bankDetails.name} onChange={e=>setBankDetails({...bankDetails,name:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1.5">Account Number</label><input type="text" value={bankDetails.accountNumber} onChange={e=>setBankDetails({...bankDetails,accountNumber:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1.5">Routing Number</label><input type="text" value={bankDetails.routingNumber} onChange={e=>setBankDetails({...bankDetails,routingNumber:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">Account Type</label><input type="text" value={bankDetails.accountType} onChange={e=>setBankDetails({...bankDetails,accountType:e.target.value})} className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
              <button onClick={() => setShowBankModal(false)} className="text-sm font-medium text-gray-500 px-4 py-2 rounded-lg border border-gray-200 transition-colors">Cancel</button>
              <button onClick={() => setShowBankModal(false)} className="bg-[#4F46E5] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#4338CA] transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}