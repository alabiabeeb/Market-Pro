"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Filter, Plus, TrendingUp, AlertTriangle,
  RefreshCw, Clock, ChevronLeft, ChevronRight, MoreVertical,
  X, Check, Eye, Pencil, Trash2, Package, MapPin, CreditCard,
} from "lucide-react";

type Status = "Paid" | "Pending" | "Failed";
interface Order {
  id: string; customer: string; initials: string; color: string;
  date: string; total: string; status: Status; email: string; items: number;
}

const ORDERS: Order[] = [
  { id:"#ORD-0092", customer:"Jane Doe",        initials:"JD", color:"bg-blue-500",   date:"May 25, 2025", total:"$124.50", status:"Paid",    email:"jane@example.com",    items:3 },
  { id:"#ORD-0091", customer:"Alex Smith",      initials:"AS", color:"bg-orange-400", date:"May 23, 2025", total:"$89.00",  status:"Pending", email:"alex@example.com",    items:2 },
  { id:"#ORD-0090", customer:"Michael Johnson", initials:"MJ", color:"bg-purple-500", date:"May 23, 2025", total:"$299.99", status:"Paid",    email:"michael@example.com", items:5 },
  { id:"#ORD-0089", customer:"Emily White",     initials:"EW", color:"bg-teal-500",   date:"May 22, 2025", total:"$45.00",  status:"Failed",  email:"emily@example.com",   items:1 },
  { id:"#ORD-0088", customer:"David Brown",     initials:"DB", color:"bg-pink-500",   date:"May 21, 2025", total:"$210.00", status:"Paid",    email:"david@example.com",   items:4 },
  { id:"#ORD-0087", customer:"Sarah Lee",       initials:"SL", color:"bg-indigo-400", date:"May 20, 2025", total:"$67.50",  status:"Pending", email:"sarah@example.com",   items:2 },
  { id:"#ORD-0086", customer:"Omar Hassan",     initials:"OH", color:"bg-green-500",  date:"May 19, 2025", total:"$340.00", status:"Paid",    email:"omar@example.com",    items:6 },
  { id:"#ORD-0085", customer:"Priya Patel",     initials:"PP", color:"bg-yellow-500", date:"May 18, 2025", total:"$92.00",  status:"Failed",  email:"priya@example.com",   items:2 },
];

const STAT_CARDS = [
  { label:"All Orders",          value:"1,248", sub:"+12% this week",       subColor:"text-green-600",  icon:TrendingUp,    iconBg:"bg-indigo-50", iconColor:"text-indigo-500" },
  { label:"Pending Fulfillment", value:"342",   sub:"46 requiring action",  subColor:"text-orange-500", icon:AlertTriangle, iconBg:"bg-orange-50", iconColor:"text-orange-400" },
  { label:"Open Returns",        value:"18",    sub:"Processing 5 today",   subColor:"text-gray-400",   icon:RefreshCw,     iconBg:"bg-blue-50",   iconColor:"text-blue-400" },
  { label:"Awaiting Payment",    value:"7",     sub:"Overdue checks needed", subColor:"text-red-400",   icon:Clock,         iconBg:"bg-red-50",    iconColor:"text-red-400" },
];

const STATUS_STYLE: Record<Status, string> = {
  Paid:    "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed:  "bg-red-100 text-red-600",
};

// Generate mock line items based on order
function getMockItems(order: Order) {
  const pools = [
    { name:"Ergonomic Office Chair", price:299.00 },
    { name:"Wireless Headphones",    price:149.50 },
    { name:"Desk Lamp",              price:89.00  },
    { name:"USB-C Hub",              price:59.99  },
    { name:"Monitor Stand",          price:45.00  },
    { name:"Keyboard",               price:129.00 },
  ];
  const seed = parseInt(order.id.replace(/\D/g,"")) || 1;
  return Array.from({ length: order.items }, (_, i) => {
    const item = pools[(seed + i) % pools.length];
    return { ...item, qty: (i === 0 ? 1 : Math.max(1, (seed + i) % 3)) };
  });
}

const PAGE_SIZE = 5;

function Shimmer({ className="" }: { className?:string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}/>;
}

function Toast({ message, type="success", onClose }: { message:string; type?:"success"|"error"; onClose:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onClose,3000); return ()=>clearTimeout(t); },[onClose]);
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type==="success"?"bg-gray-900":"bg-red-600"}`}>
      {type==="success"?<Check size={13}/>:<X size={13}/>}{message}
    </div>
  );
}

// ── Full View Order Modal ──────────────────────────────────────────────────
function ViewOrderModal({ order, onClose, onStatusChange, onEdit, onDelete }: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, s: Status) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const lineItems = getMockItems(order);
  const subtotal  = lineItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = 25.00;
  const tax       = +(subtotal * 0.049).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div>
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Order Details</h2>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">{order.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status]}`}>{order.status}</span>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={16}/></button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Customer info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className={`w-11 h-11 rounded-full ${order.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{order.initials}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{order.customer}</p>
              <p className="text-xs text-gray-400">{order.email}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">Order date</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{order.date}</p>
            </div>
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:"Order ID",  value:order.id,             icon:Package },
              { label:"Items",     value:`${order.items} items`,icon:Package },
              { label:"Total",     value:order.total,           icon:CreditCard },
            ].map(({label,value,icon:Icon})=>(
              <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-wide">
                  <Icon size={10}/>{label}
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Line items */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Package size={11}/> Items Ordered
            </p>
            <div className="space-y-2">
              {lineItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                      <Package size={13} className="text-indigo-500"/>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-100">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Order Summary</p>
            {[
              ["Subtotal", `$${subtotal.toFixed(2)}`],
              ["Shipping", `$${shipping.toFixed(2)}`],
              ["Tax (4.9%)", `$${tax.toFixed(2)}`],
            ].map(([k,v])=>(
              <div key={k} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{k}</span><span className="font-medium text-gray-700 dark:text-gray-300">{v}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Total</span>
              <span className="text-sm font-bold text-indigo-600">{order.total}</span>
            </div>
          </div>

          {/* Shipping address (mock) */}
          <div className="flex items-start gap-2.5 p-3.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <MapPin size={14} className="text-indigo-500 mt-0.5 shrink-0"/>
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Shipping Address</p>
              <p className="text-xs text-gray-400 mt-0.5">123 Market Street, Suite 4B<br/>San Francisco, CA 94102, US</p>
            </div>
          </div>

          {/* Update Status */}
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Update Status</p>
            <div className="flex gap-2">
              {(["Paid","Pending","Failed"] as Status[]).map(s=>(
                <button key={s} onClick={()=>{ onStatusChange(order.id,s); onClose(); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${order.status===s ? STATUS_STYLE[s]+" border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900">
          <button onClick={onDelete} className="flex-1 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center gap-1.5 transition-colors">
            <Trash2 size={14}/> Delete
          </button>
          <button onClick={onEdit} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
            <Pencil size={14}/> Edit Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────
function DeleteModal({ orderId, onClose, onConfirm }: { orderId:string; onClose:()=>void; onConfirm:()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4" onClick={e=>e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center mx-auto"><Trash2 size={20} className="text-red-500"/></div>
        <div className="text-center">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Delete Order?</h2>
          <p className="text-xs text-gray-400 mt-1">Are you sure you want to delete <span className="font-semibold text-gray-700 dark:text-gray-200">{orderId}</span>? This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const router = useRouter();

  const [loading, setLoading]             = useState(true);
  const [orders, setOrders]               = useState<Order[]>([]);
  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState("All");
  const [currentPage, setCurrentPage]     = useState(1);
  const [viewOrder, setViewOrder]         = useState<Order|null>(null);
  const [deleteId, setDeleteId]           = useState<string|null>(null);
  const [openMenu, setOpenMenu]           = useState<string|null>(null);
  const [toast, setToast]                 = useState<{msg:string;type:"success"|"error"}|null>(null);

  useEffect(()=>{ setTimeout(()=>{ setOrders(ORDERS); setLoading(false); },1600); },[]);

  // ── FIX: use mousedown + closest check so menu doesn't self-close ──
  useEffect(()=>{
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-order-menu]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return ()=>document.removeEventListener("mousedown", handler);
  },[]);

  const showToast = useCallback((msg:string, type:"success"|"error"="success")=>setToast({msg,type}),[]);

  const filtered = orders.filter(o=>{
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase())||o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter==="All"||o.status===statusFilter;
    return matchSearch&&matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length/PAGE_SIZE));
  const paginated  = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  const handleStatusChange = (id:string, status:Status)=>{
    setOrders(prev=>prev.map(o=>o.id===id?{...o,status}:o));
    showToast(`Order ${id} marked as ${status}`);
  };

  const handleDelete = (id:string)=>{
    setOrders(prev=>prev.filter(o=>o.id!==id));
    setDeleteId(null); setOpenMenu(null); setViewOrder(null);
    showToast(`Order ${id} deleted`,"error");
    if (paginated.length===1&&currentPage>1) setCurrentPage(p=>p-1);
  };

  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><Shimmer className="h-6 w-32"/><Shimmer className="h-9 w-36 rounded-lg"/></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i=>(
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-20"/><Shimmer className="h-7 w-7 rounded-lg"/></div>
            <Shimmer className="h-7 w-24"/><Shimmer className="h-3 w-28"/>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
        <div className="flex gap-3"><Shimmer className="h-9 flex-1 max-w-sm"/><Shimmer className="h-9 w-48 rounded-lg"/></div>
        {[1,2,3,4,5].map(i=>(
          <div key={i} className="flex items-center gap-3 py-2">
            <Shimmer className="w-8 h-8 rounded-full"/><Shimmer className="h-3 flex-1"/>
            <Shimmer className="h-3 w-20"/><Shimmer className="h-3 w-16"/><Shimmer className="h-6 w-14 rounded-full"/>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track all your orders</p>
        </div>
        <button onClick={()=>router.push("/admin/orders/create")}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={14}/>
          <span className="hidden xs:inline">Create Order</span>
          <span className="xs:hidden">New</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map(s=>{ const Icon=s.icon; return (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}><Icon size={14} className={s.iconColor}/></div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-none">{s.value}</p>
            <p className={`text-[10px] sm:text-xs font-medium ${s.subColor}`}>{s.sub}</p>
          </div>
        );})}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search by name or order ID..." value={search}
                onChange={e=>{ setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"/>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 self-start">
              {["All","Paid","Pending","Failed"].map(f=>(
                <button key={f} onClick={()=>{ setStatusFilter(f); setCurrentPage(1); }}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${statusFilter===f?"bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{filtered.length} order{filtered.length!==1?"s":""} found</span>
            <button className="hidden sm:flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
              <Filter size={12}/> Filter
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                {["Order ID","Customer","Date","Total","Status",""].map(h=>(
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {paginated.length===0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><Search size={16} className="text-gray-400"/></div>
                    <p className="text-sm text-gray-400">No orders found.</p>
                    <button onClick={()=>{ setSearch(""); setStatusFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
                  </div>
                </td></tr>
              ) : paginated.map(o=>(
                <tr key={o.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors group cursor-pointer" onClick={()=>setViewOrder(o)}>
                  <td className="px-5 py-3.5 text-indigo-600 font-semibold text-xs">{o.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full ${o.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{o.initials}</div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{o.date}</td>
                  <td className="px-5 py-3.5 text-gray-800 dark:text-gray-100 font-semibold">{o.total}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3.5" onClick={e=>e.stopPropagation()}>
                    <div className="relative" data-order-menu>
                      <button
                        onClick={e=>{ e.stopPropagation(); setOpenMenu(prev=>prev===o.id?null:o.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      >
                        <MoreVertical size={14} className="text-gray-400"/>
                      </button>
                      {openMenu===o.id&&(
                        <div data-order-menu className="absolute right-0 top-8 z-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-1 w-36" onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>{ setViewOrder(o); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
                            <Eye size={12}/> View
                          </button>
                          <button onClick={()=>{ router.push("/admin/orders/create"); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
                            <Pencil size={12}/> Edit
                          </button>
                          <div className="border-t border-gray-100 dark:border-gray-800 my-1"/>
                          <button onClick={()=>{ setDeleteId(o.id); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2">
                            <Trash2 size={12}/> Delete
                          </button>
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
          {paginated.length===0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm text-gray-400">No orders found.</p>
              <button onClick={()=>{ setSearch(""); setStatusFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
            </div>
          ) : paginated.map(o=>(
            <div key={o.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 active:bg-gray-100 cursor-pointer transition-colors" onClick={()=>setViewOrder(o)}>
              <div className={`w-9 h-9 rounded-full ${o.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>{o.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{o.customer}</p>
                <p className="text-[10px] text-indigo-500 font-medium mt-0.5">{o.id}</p>
                <p className="text-[10px] text-gray-400">{o.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{o.total}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 dark:border-gray-800 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length===0?0:(currentPage-1)*PAGE_SIZE+1}–{Math.min(currentPage*PAGE_SIZE,filtered.length)}</span> of <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">
              <ChevronLeft size={14} className="text-gray-500"/>
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setCurrentPage(p)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${currentPage===p?"bg-[#4F46E5] text-white":"border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>{p}</button>
            ))}
            <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40">
              <ChevronRight size={14} className="text-gray-500"/>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {viewOrder && (
        <ViewOrderModal
          order={viewOrder}
          onClose={()=>setViewOrder(null)}
          onStatusChange={handleStatusChange}
          onEdit={()=>{ router.push("/admin/orders/create"); setViewOrder(null); }}
          onDelete={()=>{ setDeleteId(viewOrder.id); setViewOrder(null); }}
        />
      )}
      {deleteId && (
        <DeleteModal orderId={deleteId} onClose={()=>setDeleteId(null)} onConfirm={()=>handleDelete(deleteId)}/>
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}