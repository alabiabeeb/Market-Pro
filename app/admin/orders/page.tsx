"use client";

import { useState } from "react";
import {
  Search, Filter, Calendar, SlidersHorizontal, Plus,
  TrendingUp, AlertTriangle, RefreshCw, Clock, ChevronLeft,
  ChevronRight, MoreHorizontal,
} from "lucide-react";

// --- Data ---
const orders = [
  { id: "#ORD-0092", customer: "Jane Doe",       initials: "JD", color: "bg-blue-500",   date: "May 25, 2025", total: "$124.50", status: "Paid",    statusStyle: "bg-green-100 text-green-700" },
  { id: "#ORD-0091", customer: "Alex Smith",     initials: "AS", color: "bg-orange-400", date: "May 23, 2025", total: "$89.00",  status: "Pending", statusStyle: "bg-yellow-100 text-yellow-700" },
  { id: "#ORD-0090", customer: "Michael Johnson",initials: "MJ", color: "bg-purple-500", date: "May 23, 2025", total: "$299.99", status: "Paid",    statusStyle: "bg-green-100 text-green-700" },
  { id: "#ORD-0089", customer: "Emily White",    initials: "EW", color: "bg-teal-500",   date: "May 22, 2025", total: "$45.00",  status: "Failed",  statusStyle: "bg-red-100 text-red-600" },
  { id: "#ORD-0088", customer: "David Brown",    initials: "DB", color: "bg-pink-500",   date: "May 21, 2025", total: "$210.00", status: "Paid",    statusStyle: "bg-green-100 text-green-700" },
  { id: "#ORD-0087", customer: "Sarah Lee",      initials: "SL", color: "bg-indigo-400", date: "May 20, 2025", total: "$67.50",  status: "Pending", statusStyle: "bg-yellow-100 text-yellow-700" },
];

const statCards = [
  { label: "All Orders",           value: "1,248", sub: "+12% this week",       subColor: "text-green-600", icon: TrendingUp,     iconBg: "bg-indigo-50",  iconColor: "text-indigo-500" },
  { label: "Pending Fulfillment",  value: "342",   sub: "46 requiring action",  subColor: "text-orange-500",icon: AlertTriangle,  iconBg: "bg-orange-50",  iconColor: "text-orange-400" },
  { label: "Open Returns",         value: "18",    sub: "Processing 5 today",   subColor: "text-gray-400",  icon: RefreshCw,      iconBg: "bg-blue-50",    iconColor: "text-blue-400" },
  { label: "Awaiting Payment",     value: "7",     sub: "Overdue checks needed",subColor: "text-red-400",   icon: Clock,          iconBg: "bg-red-50",     iconColor: "text-red-400" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track all your orders</p>
        </div>
        <button className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={14} />
          <span className="hidden xs:inline">Create Order</span>
          <span className="xs:hidden">New Order</span>
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">
                  {s.label}
                </span>
                <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={14} className={s.iconColor} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 leading-none">{s.value}</p>
              <p className={`text-[10px] sm:text-xs font-medium ${s.subColor}`}>{s.sub}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center justify-between sm:hidden">
            <h2 className="text-sm font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-xs text-indigo-600 font-medium">View All →</button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={13} /> Filter
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar size={13} />
              <span className="hidden sm:inline">Date Range</span>
              <span className="sm:hidden">Date</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors hidden sm:flex">
              <SlidersHorizontal size={13} /> More Filters
            </button>
            <div className="hidden sm:flex items-center gap-3 ml-2">
              <span className="text-xs font-semibold text-gray-700">Recent Orders</span>
              <button className="text-xs text-indigo-600 font-medium hover:underline">View All →</button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-3.5 text-indigo-600 font-semibold text-xs">{order.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full ${order.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {order.initials}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{order.date}</td>
                  <td className="px-5 py-3.5 text-gray-800 font-semibold">{order.total}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusStyle}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                      <MoreHorizontal size={14} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden divide-y divide-gray-50">
          {filtered.map((order) => (
            <div key={order.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${order.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>
                  {order.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{order.customer}</p>
                  <p className="text-[10px] text-indigo-500 font-medium mt-0.5">{order.id}</p>
                  <p className="text-[10px] text-gray-400">{order.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <p className="text-sm font-bold text-gray-800">{order.total}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${order.statusStyle}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600">1 to 10</span> of <span className="font-medium text-gray-600">1,248</span> orders
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40"
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} className="text-gray-500" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${
                  currentPage === p
                    ? "bg-[#4F46E5] text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-gray-400 text-xs px-1">...</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={14} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}