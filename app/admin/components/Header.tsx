"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, ShoppingCart, AlertTriangle, UserPlus, CreditCard, Check, X } from "lucide-react";

// ── Notification data ──────────────────────────────────────────────────────
interface Notification {
  id: number;
  type: "order" | "alert" | "customer" | "payment";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "order",    title: "New order received",     message: "#ORD-0092 from Jane Doe — $124.50",      time: "2m ago",  read: false },
  { id: 2, type: "alert",    title: "Low stock alert",         message: "Wireless Mechanical Keyboard — 12 left",  time: "1h ago",  read: false },
  { id: 3, type: "customer", title: "New customer signed up",  message: "Omar Hassan joined your store",           time: "3h ago",  read: false },
  { id: 4, type: "payment",  title: "Payout processed",        message: "₦1,620,000 sent to Access Bank",          time: "5h ago",  read: true  },
  { id: 5, type: "order",    title: "Order delivered",         message: "#ORD-0089 marked as delivered",           time: "1d ago",  read: true  },
];

const TYPE_CONFIG = {
  order:    { icon: ShoppingCart, bg: "bg-indigo-50 dark:bg-indigo-950/40", color: "text-indigo-500" },
  alert:    { icon: AlertTriangle, bg: "bg-orange-50 dark:bg-orange-950/40", color: "text-orange-500" },
  customer: { icon: UserPlus,      bg: "bg-green-50 dark:bg-green-950/40",  color: "text-green-500" },
  payment:  { icon: CreditCard,    bg: "bg-violet-50 dark:bg-violet-950/40", color: "text-violet-500" },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sm:px-8 relative">

      {/* Left: logo on mobile / welcome text on desktop */}
      <div className="min-w-0">
        <Link href="/admin" className="flex items-center gap-2 md:hidden">
          <img src="/Container.png" alt="Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            Welcome back, <span className="text-[#3525CD] dark:text-indigo-400">Alex</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* ── Notification bell + dropdown ── */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setOpen(!open)}
            className="relative p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell size={18} className="text-gray-500 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown panel */}
          {open && (
            <div className="absolute right-0 sm:right-0 -right-4 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold bg-red-50 dark:bg-red-950/40 text-red-500 px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-indigo-600 font-medium hover:underline">
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                      <Bell size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">No notifications</p>
                  </div>
                ) : notifications.map(n => {
                  const { icon: Icon, bg, color } = TYPE_CONFIG[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors relative group ${
                        !n.read ? "bg-indigo-50/40 dark:bg-indigo-950/20" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                        <Icon size={14} className={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{n.title}</p>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                      </div>
                      <button
                        onClick={(e) => removeNotification(n.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shrink-0"
                      >
                        <X size={12} className="text-gray-400" />
                      </button>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
                  <button className="w-full text-xs font-medium text-indigo-600 hover:underline text-center">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <img
          src="/avatar.jpg"
          alt="User avatar"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
        />
      </div>

    </header>
  );
}