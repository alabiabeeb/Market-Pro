"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search, Plus, TrendingUp, AlertTriangle, RefreshCw, ShoppingBag,
  ChevronLeft, ChevronRight, MoreVertical, ImageIcon, X, Check, Pencil, Trash2, Eye,
} from "lucide-react";

type PStatus = "Active"|"Draft"|"Out of Stock";
interface Product { id:number; name:string; sku:string; category:string; stock:number; stockStatus:string; price:string; status:PStatus; }

const PRODUCTS: Product[] = [
  { id:1, name:"Ergonomic Office Chair",     sku:"SKU-CHAIR-001", category:"Furniture",   stock:145, stockStatus:"high",   price:"$299.00", status:"Active" },
  { id:2, name:"Wireless Mechanical Keyboard",sku:"SKU-KB-002",   category:"Electronics", stock:12,  stockStatus:"low",    price:"$149.50", status:"Active" },
  { id:3, name:"Noise Cancelling Headphones", sku:"SKU-HP-003",   category:"Electronics", stock:0,   stockStatus:"out",    price:"$349.00", status:"Out of Stock" },
  { id:4, name:"Minimalist Desk Lamp",        sku:"SKU-LMP-004",  category:"Lighting",    stock:50,  stockStatus:"medium", price:"$89.00",  status:"Draft" },
  { id:5, name:"Standing Desk Frame",         sku:"SKU-DSK-005",  category:"Furniture",   stock:8,   stockStatus:"low",    price:"$499.00", status:"Active" },
  { id:6, name:"USB-C Hub 7-in-1",            sku:"SKU-HUB-006",  category:"Electronics", stock:200, stockStatus:"high",   price:"$59.99",  status:"Active" },
  { id:7, name:"Bamboo Monitor Stand",        sku:"SKU-STD-007",  category:"Furniture",   stock:30,  stockStatus:"medium", price:"$45.00",  status:"Active" },
  { id:8, name:"LED Desk Pad",                sku:"SKU-PAD-008",  category:"Lighting",    stock:0,   stockStatus:"out",    price:"$35.00",  status:"Out of Stock" },
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

function Shimmer({ className="" }: { className?:string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}

function Toast({ message, type="success", onClose }: { message:string; type?:"success"|"error"; onClose:()=>void }) {
  useEffect(() => { const t = setTimeout(onClose,3000); return ()=>clearTimeout(t); },[onClose]);
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type==="success"?"bg-gray-900":"bg-red-600"}`}>
      {type==="success"?<Check size={13}/>:<X size={13}/>}{message}
    </div>
  );
}

function ProductModal({ product, onClose, onSave }: { product:Product; onClose:()=>void; onSave:(p:Product)=>void }) {
  const [form, setForm] = useState({ ...product });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Edit Product</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16}/></button>
        </div>
        {[
          { label:"Product Name", key:"name",     type:"text" },
          { label:"SKU",          key:"sku",      type:"text" },
          { label:"Price",        key:"price",    type:"text" },
          { label:"Stock",        key:"stock",    type:"number" },
        ].map(({label,key,type})=>(
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <input type={type} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:type==="number"?Number(e.target.value):e.target.value})}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value as PStatus})}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white">
            <option>Active</option><option>Draft</option><option>Out of Stock</option>
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={()=>onSave(form)} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function AddModal({ onClose, onAdd }: { onClose:()=>void; onAdd:(p:Product)=>void }) {
  const [form, setForm] = useState({ name:"",sku:"",category:"Electronics",price:"",stock:0,status:"Active" as PStatus });
  const [error, setError] = useState("");
  const handleSubmit = () => {
    if (!form.name||!form.sku||!form.price) { setError("Name, SKU and price are required."); return; }
    onAdd({ ...form, id:Date.now(), stockStatus: form.stock===0?"out":form.stock<15?"low":form.stock<60?"medium":"high" });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-3 max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Add Product</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16}/></button>
        </div>
        {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        {[
          { label:"Product Name",key:"name",  type:"text",   placeholder:"e.g. Office Chair" },
          { label:"SKU",         key:"sku",   type:"text",   placeholder:"SKU-XXX-000" },
          { label:"Price",       key:"price", type:"text",   placeholder:"$0.00" },
          { label:"Stock",       key:"stock", type:"number", placeholder:"0" },
        ].map(({label,key,type,placeholder})=>(
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <input type={type} placeholder={placeholder} value={(form as any)[key]}
              onChange={e=>setForm({...form,[key]:type==="number"?Number(e.target.value):e.target.value})}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white">
            {["Furniture","Electronics","Lighting"].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">Add Product</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [loading, setLoading]     = useState(true);
  const [products, setProducts]   = useState<Product[]>([]);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product|null>(null);
  const [showAdd, setShowAdd]     = useState(false);
  const [openMenu, setOpenMenu]   = useState<number|null>(null);
  const [toast, setToast]         = useState<{msg:string;type:"success"|"error"}|null>(null);

  useEffect(()=>{ setTimeout(()=>{ setProducts(PRODUCTS); setLoading(false); },1600); },[]);

  const showToast = useCallback((msg:string, type:"success"|"error"="success")=>setToast({msg,type}),[]);

  const filtered = products.filter(p=>{
    const s = p.name.toLowerCase().includes(search.toLowerCase())||p.sku.toLowerCase().includes(search.toLowerCase());
    const c = category==="All"||p.category===category;
    return s&&c;
  });

  const totalPages = Math.ceil(filtered.length/PAGE_SIZE);
  const paginated  = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  const handleSave = (updated:Product) => {
    setProducts(prev=>prev.map(p=>p.id===updated.id?updated:p));
    setEditProduct(null); showToast("Product updated!");
  };
  const handleDelete = (id:number) => {
    setProducts(prev=>prev.filter(p=>p.id!==id)); setOpenMenu(null); showToast("Product deleted","error");
  };
  const handleAdd = (p:Product) => {
    setProducts(prev=>[p,...prev]); setShowAdd(false); showToast("Product added!");
  };

  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between"><Shimmer className="h-6 w-24"/><Shimmer className="h-9 w-32 rounded-lg"/></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i=>(
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-20"/><Shimmer className="h-7 w-7 rounded-lg"/></div>
            <Shimmer className="h-7 w-24"/><Shimmer className="h-3 w-28"/>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
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
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={14}/><span className="hidden xs:inline">Add Product</span><span className="xs:hidden">Add</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map(s=>{ const Icon=s.icon; return (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center`}><Icon size={14} className={s.iconColor}/></div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 leading-none">{s.value}</p>
            <p className={`text-[10px] sm:text-xs font-medium ${s.subColor}`}>{s.sub}</p>
          </div>
        );})}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search products..." value={search}
                onChange={e=>{ setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 self-start">
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>{ setCategory(c); setCurrentPage(1); }}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${category===c?"bg-white text-gray-800 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{c}</button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400">{filtered.length} product{filtered.length!==1?"s":""} found</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                {["Image","Product Name","SKU","Category","Stock","Price","Status",""].map(h=><th key={h} className="px-5 py-3 font-medium">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length===0?(
                <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-400">No products found.</td></tr>
              ):paginated.map(p=>(
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <ImageIcon size={16} className="text-gray-400"/>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{p.name}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{p.sku}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{p.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STOCK_STYLE[p.stockStatus]}`}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800">{p.price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="relative">
                      <button onClick={()=>setOpenMenu(openMenu===p.id?null:p.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical size={14} className="text-gray-400"/>
                      </button>
                      {openMenu===p.id&&(
                        <div className="absolute right-0 top-8 z-10 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36">
                          <button onClick={()=>{ setEditProduct(p); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Eye size={12}/>View</button>
                          <button onClick={()=>{ setEditProduct(p); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Pencil size={12}/>Edit</button>
                          <button onClick={()=>handleDelete(p.id)} className="w-full text-left px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"><Trash2 size={12}/>Delete</button>
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
        <div className="sm:hidden divide-y divide-gray-50">
          {paginated.length===0?<p className="text-center text-sm text-gray-400 py-10">No products found.</p>
          :paginated.map(p=>(
            <div key={p.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 cursor-pointer" onClick={()=>setEditProduct(p)}>
              <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                <ImageIcon size={16} className="text-gray-400"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-400">{p.category}</span>
                  <span className="text-gray-200">·</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STOCK_STYLE[p.stockStatus]}`}>{p.stock}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-bold text-gray-800">{p.price}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600">{Math.min((currentPage-1)*PAGE_SIZE+1,filtered.length)}–{Math.min(currentPage*PAGE_SIZE,filtered.length)}</span> of <span className="font-medium text-gray-600">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={14} className="text-gray-500"/></button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)} className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${currentPage===p?"bg-[#4F46E5] text-white":"border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={14} className="text-gray-500"/></button>
          </div>
        </div>
      </div>

      {editProduct&&<ProductModal product={editProduct} onClose={()=>setEditProduct(null)} onSave={handleSave}/>}
      {showAdd&&<AddModal onClose={()=>setShowAdd(false)} onAdd={handleAdd}/>}
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}