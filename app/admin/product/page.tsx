"use client";

import { useState } from "react";
import {
  Search, Filter, Calendar, SlidersHorizontal, Plus,
  TrendingUp, AlertTriangle, RefreshCw, ShoppingBag,
  ChevronLeft, ChevronRight, MoreVertical, ImageIcon,
} from "lucide-react";


const products = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    sku: "SKU-CHAIR-001",
    category: "Furniture",
    stock: 145,
    stockStatus: "high",
    price: "$299.00",
    status: "Active",
    statusStyle: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Wireless Mechanical Keyboard",
    sku: "SKU-KB-002",
    category: "Electronics",
    stock: 12,
    stockStatus: "low",
    price: "$149.50",
    status: "Active",
    statusStyle: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Noise Cancelling Headphones",
    sku: "SKU-HP-003",
    category: "Electronics",
    stock: 0,
    stockStatus: "out",
    price: "$349.00",
    status: "Out of Stock",
    statusStyle: "bg-gray-100 text-gray-500",
  },
  {
    id: 4,
    name: "Minimalist Desk Lamp",
    sku: "SKU-LMP-004",
    category: "Lighting",
    stock: 50,
    stockStatus: "medium",
    price: "$89.00",
    status: "Draft",
    statusStyle: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 5,
    name: "Standing Desk Frame",
    sku: "SKU-DSK-005",
    category: "Furniture",
    stock: 8,
    stockStatus: "low",
    price: "$499.00",
    status: "Active",
    statusStyle: "bg-green-100 text-green-700",
  },
  {
    id: 6,
    name: "USB-C Hub 7-in-1",
    sku: "SKU-HUB-006",
    category: "Electronics",
    stock: 200,
    stockStatus: "high",
    price: "$59.99",
    status: "Active",
    statusStyle: "bg-green-100 text-green-700",
  },
];

const statCards = [
  {
    label: "Total Products",
    value: "3,456",
    sub: "+5% this week",
    subColor: "text-green-600",
    icon: ShoppingBag,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    label: "Active Listings",
    value: "3,120",
    sub: "90% of total",
    subColor: "text-green-500",
    icon: RefreshCw,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Low Stock Alert",
    value: "24",
    sub: "Requires attention",
    subColor: "text-orange-500",
    icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
  },
  {
    label: "Out of Stock",
    value: "12",
    sub: "Action required",
    subColor: "text-red-500",
    icon: TrendingUp,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
  },
];

function StockBadge({ stock, status }: { stock: number; status: string }) {
  const color =
    status === "out"
      ? "bg-red-100 text-red-600"
      : status === "low"
      ? "bg-orange-100 text-orange-600"
      : "bg-indigo-100 text-indigo-600";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {stock}
    </span>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#4338CA]">Products</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and track all your products</p>
        </div>

      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2"
            >
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
            <h2 className="text-sm font-semibold text-gray-800">All Products</h2>
            <button className="text-xs text-indigo-600 font-medium">View All →</button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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
            <button className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={13} /> More Filters
            </button>
                    <button className="flex items-center gap-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={14} />
          <span className="hidden xs:inline">Add Product</span>
          <span className="xs:hidden">Add Product</span>
        </button>
          </div>
        </div>
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50/60 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Image</th>
                <th className="px-5 py-3 font-medium">Product Name</th>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Stock Level</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/60 transition-colors group">
                  {/* Image placeholder */}
                  <td className="px-5 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                      <ImageIcon size={16} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-gray-800 font-medium text-sm">{product.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{product.sku}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{product.category}</td>
                  <td className="px-5 py-3.5">
                    <StockBadge stock={product.stock} status={product.stockStatus} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-800 font-semibold text-sm">{product.price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.statusStyle}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === product.id ? null : product.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-all"
                      >
                        <MoreVertical size={14} className="text-gray-400" />
                      </button>
                      {openMenu === product.id && (
                        <div className="absolute right-0 top-8 z-10 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-32">
                          {["Edit", "Duplicate", "Archive", "Delete"].map((action) => (
                            <button
                              key={action}
                              onClick={() => setOpenMenu(null)}
                              className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors hover:bg-gray-50 ${
                                action === "Delete" ? "text-red-500" : "text-gray-600"
                              }`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sm:hidden divide-y divide-gray-50">
          {filtered.map((product) => (
            <div key={product.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/60 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                <ImageIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{product.name}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{product.sku}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-400">{product.category}</span>
                  <span className="text-gray-200">·</span>
                  <StockBadge stock={product.stock} status={product.stockStatus} />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className="text-sm font-bold text-gray-800">{product.price}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${product.statusStyle}`}>
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col xs:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600">1 to 10</span> of{" "}
            <span className="font-medium text-gray-600">3,456</span> products
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40"
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