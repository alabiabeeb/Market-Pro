"use client";

import { useState } from "react";
import { 
  Percent, 
  Plus, 
  Clock, 
  Tag, 
  Zap,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Promotion {
  id: string;
  name: string;
  type: "flash_sale" | "bogo" | "discount";
  discount: string;
  products: number;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "ended";
}

export default function PromotionsPage() {
  const [promotions] = useState<Promotion[]>([
    {
      id: "1",
      name: "Summer Flash Sale",
      type: "flash_sale",
      discount: "30% OFF",
      products: 45,
      startDate: "2026-07-01",
      endDate: "2026-07-07",
      status: "active"
    },
    {
      id: "2",
      name: "Buy 1 Get 1 Free",
      type: "bogo",
      discount: "BOGO",
      products: 12,
      startDate: "2026-07-15",
      endDate: "2026-07-31",
      status: "scheduled"
    },
    {
      id: "3",
      name: "Weekend Special",
      type: "discount",
      discount: "15% OFF",
      products: 28,
      startDate: "2026-06-20",
      endDate: "2026-06-25",
      status: "ended"
    }
  ]);

  const getTypeBadge = (type: string) => {
    switch(type) {
      case "flash_sale": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "bogo": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "discount": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default: return "";
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "scheduled": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "ended": return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
      default: return "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Promotions & Flash Sales
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Create campaigns to boost sales and attract customers
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2E1A] hover:bg-[#060F09] text-[#C8F135] text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Campaigns", value: "1", icon: Zap },
          { label: "Scheduled", value: "1", icon: Calendar },
          { label: "Total Promotions", value: "3", icon: Tag },
          { label: "Products on Sale", value: "57", icon: Percent },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-[#0A2E1A] dark:text-[#C8F135]" />
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Promotions List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Campaign Name
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Discount
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Products
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Date Range
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      {promo.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getTypeBadge(promo.type)}`}>
                      {promo.type === "flash_sale" ? "Flash Sale" :
                       promo.type === "bogo" ? "BOGO" : "Discount"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold text-[#0A2E1A] dark:text-[#C8F135]">
                      {promo.discount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                    {promo.products} products
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {promo.startDate} → {promo.endDate}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadge(promo.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        promo.status === "active" ? "bg-green-500" :
                        promo.status === "scheduled" ? "bg-yellow-500" : "bg-gray-400"
                      }`} />
                      {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}