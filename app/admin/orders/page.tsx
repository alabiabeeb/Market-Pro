"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Filter, Plus, TrendingUp, AlertTriangle,
  RefreshCw, Clock, ChevronLeft, ChevronRight, MoreVertical,
  X, Check, Eye, Pencil, Trash2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Status = "Paid" | "Pending" | "Failed";
interface Order {
  id: string; customer: string; initials: string; color: string;
  date: string; total: string; status: Status; email: string; items: number;
}

// ── Mock data ──────────────────────────────────────────────────────────────
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

const PAGE_SIZE = 5;

// ── Shimmer ────────────────────────────────────────────────────────────────
function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type === "success" ? "bg-gray-900" : "bg-red-600"}`}>
      {type === "success" ? <Check size={13} /> : <X size={13} />}
      {message}
    </div>
  );
}

// ── Order Detail Modal ─────────────────────────────────────────────────────
function OrderModal({ order, onClose, onStatusChange }: { order: Order; onClose: () => void; onStatusChange: (id: string, s: Status) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Order Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className={`w-10 h-10 rounded-full ${order.color} flex items-center justify-center text-white text-sm font-bold`}>{order.initials}</div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{order.customer}</p>
            <p className="text-xs text-gray-400">{order.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[["Order ID", order.id], ["Date", order.date], ["Items", `${order.items} items`], ["Total", order.total]].map(([k, v]) => (
            <div key={k} className="bg-gray-50 rounded-xl p-3">
              <p className="text-gray-400 mb-0.5">{k}</p>
              <p className="font-semibold text-gray-800">{v}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">Update Status</p>
          <div className="flex gap-2">
            {(["Paid", "Pending", "Failed"] as Status[]).map((s) => (
              <button key={s} onClick={() => { onStatusChange(order.id, s); onClose(); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${order.status === s ? STATUS_STYLE[s] + " border-transparent" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Close</button>
          <button className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors">Edit Order</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────
function DeleteModal({ orderId, onClose, onConfirm }: { orderId: string; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <div className="text-center">
          <h2 className="text-base font-bold text-gray-800">Delete Order?</h2>
          <p className="text-xs text-gray-400 mt-1">Are you sure you want to delete <span className="font-semibold text-gray-700">{orderId}</span>? This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const router = useRouter();

  const [loading, setLoading]           = useState(true);
  const [orders, setOrders]             = useState<Order[]>([]);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage]   = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteId, setDeleteId]         = useState<string | null>(null);
  const [openMenu, setOpenMenu]         = useState<string | null>(null);
  const [toast, setToast]               = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => { setTimeout(() => { setOrders(ORDERS); setLoading(false); }, 1600); }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
  }, []);

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleStatusChange = (id: string, status: Status) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    showToast(`Order ${id} marked as ${status}`);
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setDeleteId(null);
    setOpenMenu(null);
    showToast(`Order ${id} deleted`, "error");
    if (paginated.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // ── Loading skeleton ──
  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Shimmer className="h-6 w-32" /><Shimmer className="h-9 w-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-20" /><Shimmer className="h-7 w-7 rounded-lg" /></div>
            <Shimmer className="h-7 w-24" /><Shimmer className="h-3 w-28" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
        <div className="flex gap-3"><Shimmer className="h-9 flex-1 max-w-sm" /><Shimmer className="h-9 w-48 rounded-lg" /></div>
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Shimmer className="w-8 h-8 rounded-full" /><Shimmer className="h-3 flex-1" />
            <Shimmer className="h-3 w-20" /><Shimmer className="h-3 w-16" /><Shimmer className="h-6 w-14 rounded-full" />
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
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track all your orders</p>
        </div>
        <button
          onClick={() => router.push("/admin/orders/create")}
          className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={14} />
          <span className="hidden xs:inline">Create Order</span>
          <span className="xs:hidden">New</span>
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">{s.label}</span>
                <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}><Icon size={14} className={s.iconColor} /></div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 leading-none">{s.value}</p>
              <p className={`text-[10px] sm:text-xs font-medium ${s.subColor}`}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or order ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 self-start">
              {["All", "Paid", "Pending", "Failed"].map((f) => (
                <button key={f} onClick={() => { setStatusFilter(f); setCurrentPage(1); }}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${statusFilter === f ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{filtered.length} order{filtered.length !== 1 ? "s" : ""} found</span>
            <button className="hidden sm:flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-600 transition-colors">
              <Filter size={12} /> Filter
            </button>
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                {["Order ID", "Customer", "Date", "Total", "Status", ""].map(h => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search size={16} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">No orders found.</p>
                      <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
                    </div>
                  </td>
                </tr>
              ) : paginated.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(o)}>
                  <td className="px-5 py-3.5 text-indigo-600 font-semibold text-xs">{o.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full ${o.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{o.initials}</div>
                      <span className="text-gray-700 font-medium">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{o.date}</td>
                  <td className="px-5 py-3.5 text-gray-800 font-semibold">{o.total}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === o.id ? null : o.id); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MoreVertical size={14} className="text-gray-400" />
                      </button>
                      {openMenu === o.id && (
                        <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-36" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => { setSelectedOrder(o); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                            <Eye size={12} /> View
                          </button>
                          <button onClick={() => { router.push("/admin/orders/create"); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                            <Pencil size={12} /> Edit
                          </button>
                          <div className="border-t border-gray-100 my-1" />
                          <button onClick={() => { setDeleteId(o.id); setOpenMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 size={12} /> Delete
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

        {/* ── Mobile Cards ── */}
        <div className="sm:hidden divide-y divide-gray-50">
          {paginated.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm text-gray-400">No orders found.</p>
              <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-xs text-indigo-600 hover:underline">Clear filters</button>
            </div>
          ) : paginated.map((o) => (
            <div key={o.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/60 active:bg-gray-100 cursor-pointer transition-colors" onClick={() => setSelectedOrder(o)}>
              <div className={`w-9 h-9 rounded-full ${o.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>{o.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{o.customer}</p>
                <p className="text-[10px] text-indigo-500 font-medium mt-0.5">{o.id}</p>
                <p className="text-[10px] text-gray-400">{o.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-bold text-gray-800">{o.total}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">{filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span>
            {" "}of{" "}
            <span className="font-medium text-gray-600">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={14} className="text-gray-500" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${currentPage === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={14} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
      {deleteId && (
        <DeleteModal
          orderId={deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}