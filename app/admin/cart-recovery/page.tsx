"use client";

import { useState } from "react";
import { 
  ShoppingCart, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Mail,
  Smartphone,
  ArrowRight
} from "lucide-react";

interface AbandonedCart {
  id: string;
  customer: string;
  items: number;
  total: string;
  timeAgo: string;
  status: "pending" | "sent" | "recovered";
  channel: "whatsapp" | "sms" | "email";
}

export default function CartRecoveryPage() {
  const [carts, setCarts] = useState<AbandonedCart[]>([
    {
      id: "#CART-001",
      customer: "Chioma O.",
      items: 3,
      total: "₦45,000",
      timeAgo: "2 hours ago",
      status: "pending",
      channel: "whatsapp"
    },
    {
      id: "#CART-002",
      customer: "Emeka N.",
      items: 1,
      total: "₦12,500",
      timeAgo: "1 day ago",
      status: "sent",
      channel: "sms"
    },
    {
      id: "#CART-003",
      customer: "Aisha B.",
      items: 5,
      total: "₦78,000",
      timeAgo: "3 days ago",
      status: "recovered",
      channel: "email"
    }
  ]);

  const [selectedChannel, setSelectedChannel] = useState("all");

  const stats = {
    total: carts.length,
    recovered: carts.filter(c => c.status === "recovered").length,
    rate: "33%",
    revenue: "₦78,000"
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "sent": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "recovered": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default: return "";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case "whatsapp": return <MessageCircle size={14} className="text-green-500" />;
      case "sms": return <Smartphone size={14} className="text-blue-500" />;
      case "email": return <Mail size={14} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Abandoned Cart Recovery
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Recover lost sales by automatically reminding customers to complete their purchase
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Abandoned", value: stats.total, icon: ShoppingCart },
          { label: "Recovered", value: stats.recovered, icon: CheckCircle },
          { label: "Recovery Rate", value: stats.rate, icon: ArrowRight },
          { label: "Revenue Recovered", value: stats.revenue, icon: AlertCircle },
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

      {/* Channel Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "whatsapp", "sms", "email"].map((channel) => (
          <button
            key={channel}
            onClick={() => setSelectedChannel(channel)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedChannel === channel
                ? "bg-[#0A2E1A] text-[#C8F135]"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {channel === "all" ? "All Channels" : channel.charAt(0).toUpperCase() + channel.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Cart
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Channel
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                    {cart.id}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                    {cart.customer}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                    {cart.items} items
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-900 dark:text-white">
                    {cart.total}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(cart.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        cart.status === "pending" ? "bg-yellow-500" :
                        cart.status === "sent" ? "bg-blue-500" : "bg-green-500"
                      }`} />
                      {cart.status.charAt(0).toUpperCase() + cart.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      {getChannelIcon(cart.channel)}
                      {cart.channel.charAt(0).toUpperCase() + cart.channel.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {cart.status === "pending" ? (
                      <button className="text-xs font-medium text-[#0A2E1A] dark:text-[#C8F135] hover:underline flex items-center gap-1 ml-auto">
                        <Send size={12} />
                        Send Reminder
                      </button>
                    ) : cart.status === "sent" ? (
                      <span className="text-xs text-gray-400">Awaiting response</span>
                    ) : (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Recovered ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automation Settings */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Automation Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "First Reminder", value: "1 hour after abandonment", channel: "WhatsApp" },
            { label: "Second Reminder", value: "24 hours after abandonment", channel: "SMS" },
            { label: "Final Reminder", value: "48 hours after abandonment", channel: "Email" },
          ].map((setting) => (
            <div key={setting.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{setting.label}</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-1">{setting.value}</p>
              <p className="text-[10px] text-gray-400">via {setting.channel}</p>
            </div>
          ))}
        </div>
        <button className="mt-3 text-xs font-medium text-[#0A2E1A] dark:text-[#C8F135] hover:underline">
          Configure Automation →
        </button>
      </div>
    </div>
  );
}