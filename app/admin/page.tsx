"use client";

import { useState, useEffect } from "react";
import Link from "next/link"
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";


const revenueDataMap: Record<string, { date: string; revenue: number }[]> = {
  Day: [
    { date: "6AM",  revenue: 800 },
    { date: "9AM",  revenue: 1200 },
    { date: "12PM", revenue: 2100 },
    { date: "3PM",  revenue: 1800 },
    { date: "6PM",  revenue: 2600 },
    { date: "9PM",  revenue: 1500 },
  ],
  Week: [
    { date: "MAY 01", revenue: 3200 },
    { date: "MAY 08", revenue: 2800 },
    { date: "MAY 15", revenue: 4100 },
    { date: "MAY 22", revenue: 3700 },
    { date: "MAY 30", revenue: 5400 },
  ],
  Month: [
    { date: "JAN", revenue: 12000 },
    { date: "FEB", revenue: 9500 },
    { date: "MAR", revenue: 14200 },
    { date: "APR", revenue: 11800 },
    { date: "MAY", revenue: 18400 },
    { date: "JUN", revenue: 16200 },
  ],
};

const allOrders = [
  { id: "#ORD-0092", customer: "Jane Doe",        initials: "JD", color: "bg-blue-500",   date: "May 25, 2025", total: "$124.50", status: "Paid",    statusStyle: "bg-green-100 text-green-700" },
  { id: "#ORD-0091", customer: "Alex Smith",      initials: "AS", color: "bg-orange-400", date: "May 23, 2025", total: "$89.00",  status: "Pending", statusStyle: "bg-yellow-100 text-yellow-700" },
  { id: "#ORD-0090", customer: "Michael Johnson", initials: "MJ", color: "bg-purple-500", date: "May 23, 2025", total: "$299.99", status: "Paid",    statusStyle: "bg-green-100 text-green-700" },
  { id: "#ORD-0089", customer: "Emily White",     initials: "EW", color: "bg-teal-500",   date: "May 22, 2025", total: "$45.00",  status: "Failed",  statusStyle: "bg-red-100 text-red-600" },
];

const statsData = [
  { label: "Total Sales",      value: "$24,592.00", change: "+5.2%", positive: true,  type: "bars",     bars: [145,260,140,175,255,385,170], barColors: ["#c7d2fe","#a5b4fc","#c7d2fe","#818cf8","#a5b4fc","#6366f1","#818cf8"] },
  { label: "Orders",           value: "1,245",      change: "+8.2%", positive: true,  type: "bars",     bars: [145,260,140,175,255,385,170], barColors: ["#99f6e4","#5eead4","#99f6e4","#2dd4bf","#5eead4","#14b8a6","#2dd4bf"] },
  { label: "Customers",        value: "842",        change: "+3.4%", positive: true,  type: "avatars",  avatars: [{ initials:"JD", color:"bg-indigo-500" },{ initials:"AS", color:"bg-orange-400" },{ initials:"MJ", color:"bg-violet-500" },{ initials:"EW", color:"bg-teal-500" }] },
  { label: "Conversion Rate",  value: "3.4%",       change: "-0.8%", positive: false, type: "progress", progress: 34 },
];

const periods = ["Day", "Week", "Month"];


function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Shimmer className="h-3 w-20" />
        <Shimmer className="h-5 w-12 rounded-full" />
      </div>
      <Shimmer className="h-7 w-28" />
      <Shimmer className="h-7 w-full" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-48" />
        </div>
        <Shimmer className="h-8 w-32 rounded-lg" />
      </div>
      <div className="h-56 flex items-end gap-2 px-2">
        {[60,80,55,90,70,85,65,95,75,88].map((h, i) => (
          <div key={i} className="flex-1 animate-pulse bg-gray-200 rounded-t-md" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-16" />
      </div>
      <div className="space-y-3">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Shimmer className="w-7 h-7 rounded-full" />
            <Shimmer className="h-3 flex-1" />
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-6 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-in slide-in-from-bottom-4">
      <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
      {message}
    </div>
  );
}


export default function DashboardPage() {
  const [loading, setLoading]       = useState(true);
  const [activePeriod, setActivePeriod] = useState("Week");
  const [toast, setToast]           = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState("All");


  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const revenueData = revenueDataMap[activePeriod];

  const filteredOrders = orderFilter === "All"
    ? allOrders
    : allOrders.filter((o) => o.status === orderFilter);

  const handlePeriodChange = (p: string) => {
    setActivePeriod(p);
    setToast(`Showing ${p.toLowerCase()} revenue data`);
  };

  // Fixed formatter function that handles undefined values
  const revenueFormatter = (value: any) => {
    const numValue = typeof value === 'number' ? value : 
                     typeof value === 'string' ? parseFloat(value) : 0;
    return [`$${numValue.toLocaleString()}`, "Revenue"];
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Skeleton header */}
        <div className="space-y-1.5">
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-3 w-64" />
        </div>
        {/* Stat card skeletons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1,2,3,4].map((i) => <StatCardSkeleton key={i} />)}
        </div>
        <ChartSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsData.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-1">
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wide leading-tight">
                {stat.label}
              </span>
              <span className={`flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                {stat.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {stat.change}
              </span>
            </div>
            <p className="text-lg sm:text-[22px] font-bold text-gray-800 tracking-tight leading-none">{stat.value}</p>

            {stat.type === "bars" && (
              <div className="flex items-end gap-0.5 h-6 sm:h-7 mt-19">
                {stat.bars!.map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all hover:opacity-100 opacity-80"
                    style={{ height: `${h}%`, backgroundColor: stat.barColors![i] }} />
                ))}
              </div>
            )}

            {stat.type === "avatars" && (
              <div className="flex items-center mt-1">
                {stat.avatars!.map((a, i) => (
                  <div key={i} className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white ${a.color} flex items-center justify-center text-white text-[8px] sm:text-[9px] font-bold ${i > 0 ? "-ml-1.5" : ""}`}>
                    {a.initials}
                  </div>
                ))}
                <div className="-ml-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-500 text-[8px] sm:text-[9px] font-semibold">+8k</div>
              </div>
            )}

            {stat.type === "progress" && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${stat.progress}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Revenue Trends ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Revenue Trends</h2>
            <p className="text-xs text-gray-400 mt-0.5">Daily recurring revenue over the last 30 days.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 self-start xs:self-auto">
            {periods.map((p) => (
              <button key={p} onClick={() => handlePeriodChange(p)}
                className={`text-xs font-medium px-2.5 sm:px-3 py-1 rounded-md transition-all ${activePeriod === p ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-44 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                formatter={revenueFormatter}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5}
                fill="url(#revenueGrad)" dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">Recent Orders</h2>
          <div className="flex items-center gap-2">
            {/* Status filter */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {["All", "Paid", "Pending", "Failed"].map((f) => (
                <button key={f} onClick={() => setOrderFilter(f)}
                  className={`text-xs font-medium px-2 py-1 rounded-md transition-all ${orderFilter === f ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {f}
                </button>
              ))}
            </div>
            <Link  href="/admin/orders" className="text-xs font-medium text-indigo-600 hover:underline">View All →</Link>
          </div>
        </div>

        {/* Mobile filter */}
        <div className="flex sm:hidden items-center gap-1 bg-gray-100 rounded-lg p-1 mb-3 self-start">
          {["All", "Paid", "Pending", "Failed"].map((f) => (
            <button key={f} onClick={() => setOrderFilter(f)}
              className={`text-[10px] font-medium px-2 py-1 rounded-md transition-all ${orderFilter === f ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}>
              {f}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-400">No {orderFilter.toLowerCase()} orders found.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                      onClick={() => setToast(`Viewing order ${order.id}`)}>
                      <td className="py-3 text-indigo-600 font-medium text-xs">{order.id}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full ${order.color} flex items-center justify-center text-white text-[10px] font-bold`}>{order.initials}</div>
                          <span className="text-gray-700 font-medium">{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-400 text-xs">{order.date}</td>
                      <td className="py-3 text-gray-800 font-semibold">{order.total}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${order.statusStyle}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 hover:bg-gray-50/60 transition-colors cursor-pointer"
                  onClick={() => setToast(`Viewing order ${order.id}`)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${order.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>{order.initials}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{order.customer}</p>
                      <p className="text-[10px] text-indigo-500 font-medium">{order.id}</p>
                      <p className="text-[10px] text-gray-400">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="text-sm font-bold text-gray-800">{order.total}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${order.statusStyle}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}