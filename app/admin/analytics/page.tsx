"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart2, ShoppingBag, Users, DollarSign } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from "recharts";

const REVENUE_DATA: Record<string, { date: string; revenue: number; orders: number }[]> = {
  Week: [
    { date: "Mon", revenue: 3200, orders: 24 },
    { date: "Tue", revenue: 2800, orders: 19 },
    { date: "Wed", revenue: 4100, orders: 31 },
    { date: "Thu", revenue: 3700, orders: 28 },
    { date: "Fri", revenue: 5400, orders: 42 },
    { date: "Sat", revenue: 4800, orders: 36 },
    { date: "Sun", revenue: 3900, orders: 30 },
  ],
  Month: [
    { date: "Week 1", revenue: 18000, orders: 142 },
    { date: "Week 2", revenue: 22000, orders: 175 },
    { date: "Week 3", revenue: 19500, orders: 158 },
    { date: "Week 4", revenue: 26000, orders: 204 },
  ],
  Year: [
    { date: "Jan", revenue: 42000, orders: 320 },
    { date: "Feb", revenue: 38000, orders: 290 },
    { date: "Mar", revenue: 51000, orders: 410 },
    { date: "Apr", revenue: 47000, orders: 375 },
    { date: "May", revenue: 63000, orders: 502 },
    { date: "Jun", revenue: 58000, orders: 465 },
    { date: "Jul", revenue: 71000, orders: 560 },
    { date: "Aug", revenue: 68000, orders: 540 },
    { date: "Sep", revenue: 74000, orders: 590 },
    { date: "Oct", revenue: 69000, orders: 552 },
    { date: "Nov", revenue: 82000, orders: 648 },
    { date: "Dec", revenue: 91000, orders: 724 },
  ],
};

const TOP_PRODUCTS = [
  { id: 1, name: "Aura Wireless Headphones",   sku: "SKU-AWH-001", category: "Electronics", units: 248, revenue: "$74,152", change: "+12%", up: true },
  { id: 2, name: "Chrono Smartwatch v2",        sku: "SKU-SW-002",  category: "Electronics", units: 187, revenue: "$74,426", change: "+8%",  up: true },
  { id: 3, name: "Ergonomic Office Chair",      sku: "SKU-CH-003",  category: "Furniture",   units: 142, revenue: "$42,458", change: "-3%",  up: false },
  { id: 4, name: "Minimalist Desk Lamp",        sku: "SKU-LM-004",  category: "Lighting",    units: 316, revenue: "$28,124", change: "+21%", up: true },
  { id: 5, name: "Robusta Field Pro",           sku: "SKU-RF-005",  category: "Sports",      units: 98,  revenue: "$19,404", change: "+5%",  up: true },
];

const CHANNEL_DATA = [
  { name: "Online Store", value: 54, color: "#0A2E1A", amount: "$142,580" },
  { name: "In-Store",     value: 23, color: "#C8F135", amount: "$60,695"  },
  { name: "Wholesale",    value: 14, color: "#153323", amount: "$36,940"  },
  { name: "Social Media", value: 9,  color: "#5B8C6A", amount: "$23,742"  },
];

const STAT_CARDS = [
  { label: "Average Online Sales", value: "$142.50", change: "+12.5%", positive: true,  icon: DollarSign, iconBg: "bg-[#F7F4EE]",  iconColor: "text-[#0A2E1A]" },
  { label: "Customer Online Sales", value: "$854.00", change: "+8.2%",  positive: true,  icon: Users,      iconBg: "bg-[#C8F135]/20",  iconColor: "text-[#0A2E1A]" },
  { label: "Get Small Sales Rate",  value: "24.8%",   change: "+2.4%",  positive: true,  icon: BarChart2,  iconBg: "bg-[#F7F4EE]",    iconColor: "text-[#0A2E1A]" },
  { label: "Total Gross Sales",     value: "$263,957", change: "-1.2%", positive: false, icon: ShoppingBag,iconBg: "bg-[#C8F135]/20",    iconColor: "text-[#0A2E1A]" },
];

const PERIODS = ["Week", "Month", "Year"];


function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}


function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2.5 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name === "revenue" ? `$${p.value.toLocaleString()}` : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
}


const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.08) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export default function AnalyticsPage() {
  const [loading, setLoading]       = useState(true);
  const [period, setPeriod]         = useState("Week");
  const [chartType, setChartType]   = useState<"revenue" | "orders">("revenue");

  useEffect(() => { setTimeout(() => setLoading(false), 1600); }, []);

  const revenueData = REVENUE_DATA[period];
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = revenueData.reduce((s, d) => s + d.orders, 0);

  if (loading) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Shimmer className="h-6 w-32" /><Shimmer className="h-8 w-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="flex justify-between"><Shimmer className="h-3 w-24" /><Shimmer className="h-7 w-7 rounded-lg" /></div>
            <Shimmer className="h-7 w-28" /><Shimmer className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
        <div className="flex justify-between"><Shimmer className="h-4 w-32" /><Shimmer className="h-8 w-40 rounded-lg" /></div>
        <Shimmer className="h-52 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
          <Shimmer className="h-4 w-36" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-3 py-1">
              <Shimmer className="w-8 h-8 rounded-lg" /><Shimmer className="h-3 flex-1" /><Shimmer className="h-3 w-16" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#0A2E1A]">Analytics</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track your store performance, and customer metrics.</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${period === p ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm" : "text-gray-500 hover:text-[#0A2E1A]"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Sales Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STAT_CARDS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">{s.label}</span>
                  <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={14} className={s.iconColor} />
                  </div>
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-800 leading-none">{s.value}</p>
                <span className={`flex items-center gap-0.5 text-[10px] font-semibold w-fit px-1.5 py-0.5 rounded-full ${s.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {s.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {s.change}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Revenue Trends</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Total: <span className="font-semibold text-[#0A2E1A]">${totalRevenue.toLocaleString()}</span>
              <span className="mx-2 text-gray-200">·</span>
              Orders: <span className="font-semibold text-gray-700">{totalOrders.toLocaleString()}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["revenue","orders"] as const).map(t => (
                <button key={t} onClick={() => setChartType(t)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all capitalize ${chartType === t ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-48 sm:h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={chartType} stroke="#6366f1" strokeWidth={2.5}
                fill="url(#analyticsGrad)" dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Top Selling Products</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">View All →</button>
          </div>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                  {["Product","Category","Units Sold","Revenue","Change"].map(h => (
                    <th key={h} className="px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TOP_PRODUCTS.map((p, i) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-bold text-gray-400 w-4">{i + 1}</span>
                        <div className="w-8 h-8 rounded-lg bg-[#F7F4EE] flex items-center justify-center shrink-0">
                          <ShoppingBag size={13} className="text-[#0A2E1A]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate max-w-[140px]">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">{p.category}</td>
                    <td className="px-5 py-3 text-xs font-semibold text-gray-800">{p.units}</td>
                    <td className="px-5 py-3 text-xs font-bold text-gray-800">{p.revenue}</td>
                    <td className="px-5 py-3">
                      <span className={`flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-fit ${p.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                        {p.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                        {p.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden divide-y divide-gray-50">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-[10px] font-bold text-gray-400 w-4 shrink-0">{i + 1}</span>
                <div className="w-9 h-9 rounded-xl bg-[#F7F4EE] flex items-center justify-center shrink-0">
                  <ShoppingBag size={14} className="text-[#0A2E1A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.category} · {p.units} units</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className="text-xs font-bold text-gray-800">{p.revenue}</p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Sales by Channel</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">View All →</button>
          </div>

          <div className="p-5 space-y-4">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CHANNEL_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                    dataKey="value" labelLine={false} label={renderCustomLabel}>
                    {CHANNEL_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v ?? 0}%`, "Share"]} contentStyle={{ borderRadius: "10px", fontSize: "12px", border: "1px solid #e5e7eb" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {CHANNEL_DATA.map(c => (
                <div key={c.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-gray-600 font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{c.value}%</span>
                      <span className="font-semibold text-gray-800">{c.amount}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.value}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Orders by Period</h2>
          <p className="text-xs text-gray-400 mt-0.5">Number of orders placed during the selected timeframe</p>
        </div>
        <div className="h-40 sm:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 5, right: 4, left: -20, bottom: 0 }} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px", border: "1px solid #e5e7eb" }} formatter={(v) => [v, "Orders"]} />
              <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                {revenueData.map((_, i) => (
                  <Cell key={i} fill={i === revenueData.length - 1 ? "#6366f1" : "#e0e7ff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}