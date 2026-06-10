"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Plus, Users, UserCheck, UserX, TrendingUp,
  ChevronLeft, ChevronRight, MoreVertical, Mail, Phone, Star,
  X, Check, Trash2, Eye, Pencil,
} from "lucide-react";

type CStatus = "Active"|"Inactive"|"Blocked";
interface Customer { id:number; name:string; initials:string; color:string; email:string; phone:string; location:string; orders:number; spent:string; status:CStatus; joined:string; rating:number; }

const CUSTOMERS: Customer[] = [
  { id:1, name:"Jane Doe",        initials:"JD", color:"bg-blue-500",   email:"jane@example.com",    phone:"+1 555-001-0001", location:"New York, US",     orders:12, spent:"$1,240.00", status:"Active",   joined:"Jan 12, 2024", rating:5 },
  { id:2, name:"Alex Smith",      initials:"AS", color:"bg-orange-400", email:"alex@example.com",    phone:"+1 555-002-0002", location:"Los Angeles, US",  orders:7,  spent:"$890.50",   status:"Active",   joined:"Mar 4, 2024",  rating:4 },
  { id:3, name:"Michael Johnson", initials:"MJ", color:"bg-purple-500", email:"michael@example.com", phone:"+1 555-003-0003", location:"Chicago, US",      orders:23, spent:"$3,410.00", status:"Active",   joined:"Nov 8, 2023",  rating:5 },
  { id:4, name:"Emily White",     initials:"EW", color:"bg-teal-500",   email:"emily@example.com",   phone:"+1 555-004-0004", location:"Houston, US",      orders:2,  spent:"$145.00",   status:"Inactive", joined:"Jun 22, 2024", rating:3 },
  { id:5, name:"David Brown",     initials:"DB", color:"bg-pink-500",   email:"david@example.com",   phone:"+1 555-005-0005", location:"Phoenix, US",      orders:15, spent:"$2,100.00", status:"Active",   joined:"Feb 14, 2024", rating:4 },
  { id:6, name:"Sarah Lee",       initials:"SL", color:"bg-indigo-400", email:"sarah@example.com",   phone:"+1 555-006-0006", location:"Philadelphia, US", orders:9,  spent:"$670.00",   status:"Blocked",  joined:"Apr 30, 2024", rating:2 },
  { id:7, name:"Omar Hassan",     initials:"OH", color:"bg-green-500",  email:"omar@example.com",    phone:"+1 555-007-0007", location:"San Antonio, US",  orders:31, spent:"$5,820.00", status:"Active",   joined:"Sep 1, 2023",  rating:5 },
  { id:8, name:"Priya Patel",     initials:"PP", color:"bg-yellow-500", email:"priya@example.com",   phone:"+1 555-008-0008", location:"Dallas, US",       orders:4,  spent:"$320.00",   status:"Inactive", joined:"Jul 18, 2024", rating:3 },
];

const STAT_CARDS = [
  { label:"Total Customers",  value:"3,842", sub:"+8.1% this month", subColor:"text-green-600",  icon:Users,     iconBg:"bg-indigo-50", iconColor:"text-indigo-500" },
  { label:"Active Customers", value:"3,102", sub:"80.7% of total",   subColor:"text-green-500",  icon:UserCheck, iconBg:"bg-green-50",  iconColor:"text-green-500" },
  { label:"Inactive",         value:"614",   sub:"Review required",  subColor:"text-orange-500", icon:TrendingUp,iconBg:"bg-orange-50", iconColor:"text-orange-400" },
  { label:"Blocked",          value:"126",   sub:"Action required",  subColor:"text-red-500",    icon:UserX,     iconBg:"bg-red-50",    iconColor:"text-red-400" },
];

const STATUS_STYLE: Record<CStatus,string> = {
  Active:  "bg-green-100 text-green-700",
  Inactive:"bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-600",
};

const PAGE_SIZE = 5;

// ── Shimmer ────────────────────────────────────────────────────────────────
function Shimmer({ className="" }: { className?:string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}/>;
}

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type="success", onClose }: { message:string; type?:"success"|"error"; onClose:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onClose,3000); return ()=>clearTimeout(t); },[onClose]);
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type==="success"?"bg-gray-900":"bg-red-600"}`}>
      {type==="success"?<Check size={13}/>:<X size={13}/>}{message}
    </div>
  );
}

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars({ count }: { count:number }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(s=><Star key={s} size={11} className={s<=count?"text-yellow-400 fill-yellow-400":"text-gray-200 fill-gray-200"}/>)}</div>;
}

// ── Customer View/Edit Modal ───────────────────────────────────────────────
function CustomerModal({ customer, onClose, onSave, onDelete }: {
  customer:Customer; onClose:()=>void; onSave:(c:Customer)=>void; onDelete:(id:number)=>void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({...customer});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">{editing?"Edit Customer":"Customer Profile"}</h2>
          <div className="flex items-center gap-2">
            {!editing && (
              <button onClick={()=>setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                <Pencil size={14}/>
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16}/></button>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className={`w-12 h-12 rounded-full ${customer.color} flex items-center justify-center text-white font-bold`}>{customer.initials}</div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{customer.name}</p>
            <p className="text-xs text-gray-400">{customer.location}</p>
            <Stars count={customer.rating}/>
          </div>
        </div>

        {editing ? (
          <div className="space-y-3">
            {[{label:"Full Name",key:"name"},{label:"Email",key:"email"},{label:"Phone",key:"phone"},{label:"Location",key:"location"}].map(({label,key})=>(
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <input value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value as CStatus})}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option>Active</option><option>Inactive</option><option>Blocked</option>
              </select>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={()=>setEditing(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={()=>{ onSave(form); setEditing(false); }} className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Save</button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[["Orders",String(customer.orders)],["Total Spent",customer.spent],["Email",customer.email],["Phone",customer.phone],["Joined",customer.joined],["Status",customer.status]].map(([k,v])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 mb-0.5">{k}</p>
                  <p className="font-semibold text-gray-800 truncate">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={()=>{ onDelete(customer.id); onClose(); }}
                className="flex-1 py-2.5 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 flex items-center justify-center gap-1.5">
                <Trash2 size={12}/> Delete
              </button>
              <button onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────
function DeleteModal({ customerId, name, onClose, onConfirm }: {
  customerId: number; name: string; onClose:()=>void; onConfirm:()=>void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center" onClick={e=>e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <Trash2 size={20} className="text-red-500"/>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800">Delete Customer?</h3>
          <p className="text-xs text-gray-400 mt-1">
            Are you sure you want to delete <span className="font-semibold text-gray-700">{name}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CustomersPage() {
  const router = useRouter();

  const [loading, setLoading]         = useState(true);
  const [customers, setCustomers]     = useState<Customer[]>([]);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected]       = useState<Customer|null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer|null>(null);
  const [openMenu, setOpenMenu]       = useState<number|null>(null);
  const [toast, setToast]             = useState<{msg:string;type:"success"|"error"}|null>(null);

  useEffect(()=>{ setTimeout(()=>{ setCustomers(CUSTOMERS); setLoading(false); },1600); },[]);

  // Close menu on outside click
  useEffect(()=>{
    const h = ()=>setOpenMenu(null);
    document.addEventListener("click", h);
    return ()=>document.removeEventListener("click", h);
  },[]);

  const showToast = useCallback((msg:string, type:"success"|"error"="success")=>setToast({msg,type}),[]);

  const filtered = customers.filter(c=>{
    const s = c.name.toLowerCase().includes(search.toLowerCase())||c.email.toLowerCase().includes(search.toLowerCase());
    const f = filter==="All"||c.status===filter;
    return s&&f;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length/PAGE_SIZE));
  const paginated  = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  const handleSave = (updated:Customer) => {
    setCustomers(prev=>prev.map(c=>c.id===updated.id?updated:c));
    setSelected(null); showToast("Customer updated!");
  };

  const handleDelete = (id:number) => {
    setCustomers(prev=>prev.filter(c=>c.id!==id));
    setDeleteTarget(null);
    setOpenMenu(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage(p=>p-1);
    showToast("Customer deleted","error");
  };

  // ── Loading skeleton ──
  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between"><Shimmer className="h-6 w-28"/><Shimmer className="h-9 w-32 rounded-lg"/></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i=>(
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-20"/><Shimmer className="h-7 w-7 rounded-lg"/></div>
            <Shimmer className="h-7 w-24"/><Shimmer className="h-3 w-28"/>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
        <div className="flex gap-3"><Shimmer className="h-9 flex-1 max-w-sm"/><Shimmer className="h-9 w-48 rounded-lg"/></div>
        {[1,2,3,4,5].map(i=>(
          <div key={i} className="flex items-center gap-3 py-2">
            <Shimmer className="w-8 h-8 rounded-full"/><Shimmer className="h-3 flex-1"/><Shimmer className="h-3 w-24"/><Shimmer className="h-6 w-14 rounded-full"/>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Customers</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and view all your customers</p>
        </div>
        {/* ← Navigate to full Add Customer page */}
        <button
          onClick={() => router.push("/admin/customer/add")}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={14}/>
          <span className="hidden xs:inline">Add Customer</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>

      {/* ── Stat Cards ── */}
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

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search by name or email..." value={search}
                onChange={e=>{ setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 self-start">
              {["All","Active","Inactive","Blocked"].map(f=>(
                <button key={f} onClick={()=>{ setFilter(f); setCurrentPage(1); }}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${filter===f?"bg-white text-gray-800 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{f}</button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400">{filtered.length} customer{filtered.length!==1?"s":""} found</p>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                {["Customer","Contact","Location","Orders","Total Spent","Rating","Status","Joined",""].map(h=>(
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length===0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search size={16} className="text-gray-400"/>
                      </div>
                      <p className="text-sm text-gray-400">No customers found.</p>
                      <button onClick={()=>{ setSearch(""); setFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
                    </div>
                  </td>
                </tr>
              ) : paginated.map(c=>(
                <tr key={c.id} className="hover:bg-gray-50/60 transition-colors group cursor-pointer" onClick={()=>setSelected(c)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{c.initials}</div>
                      <span className="text-gray-800 font-semibold">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} className="text-gray-400"/>{c.email}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400"><Phone size={11} className="text-gray-400"/>{c.phone}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{c.location}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800">{c.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-800">{c.spent}</td>
                  <td className="px-5 py-3.5"><Stars count={c.rating}/></td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{c.joined}</td>
                  <td className="px-5 py-3.5" onClick={e=>e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={e=>{ e.stopPropagation(); setOpenMenu(openMenu===c.id?null:c.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MoreVertical size={14} className="text-gray-400"/>
                      </button>
                      {openMenu===c.id&&(
                        <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36" onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>{ setSelected(c); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Eye size={12}/>View</button>
                          <button onClick={()=>{ setSelected(c); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2"><Pencil size={12}/>Edit</button>
                          <div className="border-t border-gray-100 my-1"/>
                          <button onClick={()=>{ setDeleteTarget(c); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"><Trash2 size={12}/>Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="sm:hidden divide-y divide-gray-50">
          {paginated.length===0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm text-gray-400">No customers found.</p>
              <button onClick={()=>{ setSearch(""); setFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
            </div>
          ) : paginated.map(c=>(
            <div key={c.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/60 active:bg-gray-100 cursor-pointer transition-colors" onClick={()=>setSelected(c)}>
              <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{c.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{c.email}</p>
                <div className="flex items-center gap-2 mt-1"><Stars count={c.rating}/><span className="text-[10px] text-gray-400">{c.orders} orders</span></div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-xs font-bold text-gray-800">{c.spent}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">{filtered.length===0?0:(currentPage-1)*PAGE_SIZE+1}–{Math.min(currentPage*PAGE_SIZE,filtered.length)}</span>
            {" "}of{" "}
            <span className="font-medium text-gray-600">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <ChevronLeft size={14} className="text-gray-500"/>
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${currentPage===p?"bg-[#4F46E5] text-white":"border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <ChevronRight size={14} className="text-gray-500"/>
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {selected && (
        <CustomerModal
          customer={selected}
          onClose={()=>setSelected(null)}
          onSave={handleSave}
          onDelete={(id)=>{ setDeleteTarget(customers.find(c=>c.id===id)||null); setSelected(null); }}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          customerId={deleteTarget.id}
          name={deleteTarget.name}
          onClose={()=>setDeleteTarget(null)}
          onConfirm={()=>handleDelete(deleteTarget.id)}
        />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}