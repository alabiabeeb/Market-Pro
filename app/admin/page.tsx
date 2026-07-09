"use client";
import { ChartPieLabelList } from "@/components/PieChart";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Percent } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueDataMap: Record<string, { date: string; revenue: number }[]> = {
  Day: [
    { date: "6AM", revenue: 800 },
    { date: "9AM", revenue: 1200 },
    { date: "12PM", revenue: 2100 },
    { date: "3PM", revenue: 1800 },
    { date: "6PM", revenue: 2600 },
    { date: "9PM", revenue: 1500 },
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
  {
    id: "#ORD-0092",
    customer: "Jane Doe",
    initials: "JD",
    color: "bg-blue-500",
    date: "May 25, 2025",
    total: "$124.50",
    status: "Paid",
    statusStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: "#ORD-0091",
    customer: "Alex Smith",
    initials: "AS",
    color: "bg-orange-400",
    date: "May 23, 2025",
    total: "$89.00",
    status: "Pending",
    statusStyle: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    id: "#ORD-0090",
    customer: "Michael Johnson",
    initials: "MJ",
    color: "bg-purple-500",
    date: "May 23, 2025",
    total: "$299.99",
    status: "Paid",
    statusStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: "#ORD-0089",
    customer: "Emily White",
    initials: "EW",
    color: "bg-teal-500",
    date: "May 22, 2025",
    total: "$45.00",
    status: "Failed",
    statusStyle: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  },
];

// Updated stats without charts
const statsData = [
  {
    label: "Total Sales",
    value: "$24,592.00",
    change: "+5.2%",
    positive: true,
    icon: DollarSign,
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    label: "Orders",
    value: "1,245",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    label: "Customers",
    value: "842",
    change: "+3.4%",
    positive: true,
    icon: Users,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    label: "Conversion Rate",
    value: "3.4%",
    change: "-0.8%",
    positive: false,
    icon: Percent,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
];

const periods = ["Day", "Week", "Month"];

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#E5E7EB] dark:bg-[#153323] rounded-lg ${className}`} />
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Shimmer className="h-3 w-20" />
        <Shimmer className="h-5 w-12 rounded-full" />
      </div>
      <Shimmer className="h-7 w-28" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-48" />
        </div>
        <Shimmer className="h-8 w-32 rounded-lg" />
      </div>
      <div className="h-56 flex items-end gap-2 px-2">
        {[60, 80, 55, 90, 70, 85, 65, 95, 75, 88].map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse bg-gray-200 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-16" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
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
    <div className="fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 bg-[#0A2E1A] text-[#C8F135] text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-in slide-in-from-bottom-4">
      <span className="w-2 h-2 rounded-full bg-[#C8F135] shrink-0" />
      {message}
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState("Week");
  const [toast, setToast] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const revenueData = revenueDataMap[activePeriod];

  const filteredOrders =
    orderFilter === "All"
      ? allOrders
      : allOrders.filter((o) => o.status === orderFilter);

  const handlePeriodChange = (p: string) => {
    setActivePeriod(p);
    setToast(`Showing ${p.toLowerCase()} revenue data`);
  };

  const revenueFormatter = (value: any) => {
    const numValue =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? parseFloat(value)
          : 0;
    return [`$${numValue.toLocaleString()}`, "Revenue"];
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1.5">
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-3 w-64" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <ChartSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── Welcome Header ── */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0A2E1A] dark:text-white">
          Welcome back, Alex
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <Icon size={16} className={stat.iconColor} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                    stat.positive 
                      ? "bg-[#C8F135]/20 text-[#0A2E1A] dark:text-[#C8F135]" 
                      : "bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400"
                  }`}
                >
                  {stat.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-lg sm:text-[22px] font-bold text-[#0A2E1A] dark:text-[#F7F4EE] tracking-tight leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Revenue Trends Chart + Pie Chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart - Updated Colors */}
        <div className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-4 sm:p-6">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#0A2E1A] dark:text-[#F7F4EE]">
                Revenue Trends
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Daily recurring revenue over the last 30 days.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#F7F4EE] dark:bg-[#0F1D14] rounded-lg p-1 self-start xs:self-auto">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriodChange(p)}
                  className={`text-xs font-medium px-2.5 sm:px-3 py-1 rounded-md transition-all ${
                    activePeriod === p 
                      ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm" 
                      : "text-gray-500 dark:text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-44 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8F135" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C8F135" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #C8F135",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    backgroundColor: "white",
                  }}
                  formatter={revenueFormatter}
                  labelStyle={{ color: "#0A2E1A" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C8F135"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={{ r: 4, fill: "#C8F135", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#C8F135" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <ChartPieLabelList />
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-white dark:bg-[#08120C] rounded-2xl border border-[#E5E7EB] dark:border-[#153323] shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-semibold text-[#0A2E1A] dark:text-[#F7F4EE]">
            Recent Orders
          </h2>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-[#F7F4EE] dark:bg-[#0F1D14] rounded-lg p-1">
              {["All", "Paid", "Pending", "Failed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`text-xs font-medium px-2 py-1 rounded-md transition-all ${
                    orderFilter === f 
                      ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm" 
                      : "text-gray-500 dark:text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-[#0A2E1A] dark:text-[#C8F135] hover:underline"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Mobile filter */}
        <div className="flex sm:hidden items-center gap-1 bg-[#F7F4EE] dark:bg-[#0F1D14] rounded-lg p-1 mb-3 self-start">
          {["All", "Paid", "Pending", "Failed"].map((f) => (
            <button
              key={f}
              onClick={() => setOrderFilter(f)}
              className={`text-[10px] font-medium px-2 py-1 rounded-md transition-all ${
                orderFilter === f ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No {orderFilter.toLowerCase()} orders found.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-[#E5E7EB] dark:border-[#153323]">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#153323]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors cursor-pointer"
                      onClick={() => setToast(`Viewing order ${order.id}`)}
                    >
                      <td className="py-3 text-[#0A2E1A] dark:text-[#C8F135] font-medium text-xs">
                        {order.id}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full ${order.color} flex items-center justify-center text-white text-[10px] font-bold`}
                          >
                            {order.initials}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 text-xs">
                        {order.date}
                      </td>
                      <td className="py-3 text-[#0A2E1A] dark:text-[#F7F4EE] font-semibold">
                        {order.total}
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${order.statusStyle}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors cursor-pointer"
                  onClick={() => setToast(`Viewing order ${order.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${order.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}
                    >
                      {order.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0A2E1A] dark:text-[#F7F4EE]">
                        {order.customer}
                      </p>
                      <p className="text-[10px] text-[#0A2E1A] dark:text-[#C8F135] font-medium">
                        {order.id}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="text-sm font-bold text-[#0A2E1A] dark:text-[#F7F4EE]">
                      {order.total}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${order.statusStyle}`}
                    >
                      {order.status}
                    </span>
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