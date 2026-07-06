"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart2,
  Settings, HelpCircle, Store, UserCircle, ChevronRight, Plus, ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Orders",    icon: ShoppingCart,    href: "/admin/orders" },
  { label: "Products",  icon: Package,          href: "/admin/product" },
  { label: "Customers", icon: Users,            href: "/admin/customers" },
];

const settingsDropdown = [
  { label: "Store Settings",   icon: Store,      href: "/admin/settings/store" },
  { label: "Profile Settings", icon: UserCircle, href: "/admin/settings/profile" },
];

const bottomItems = [
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
];

export default function Sidebar() {
  const pathname  = usePathname();
  const [settingsOpen, setSettingsOpen]       = useState(false); // desktop
  const [fabOpen, setFabOpen]                 = useState(false); // mobile FAB
  const [fabSettingsOpen, setFabSettingsOpen] = useState(false); // mobile settings sub-expand
  const settingsRef = useRef<HTMLDivElement>(null);
  const fabRef      = useRef<HTMLDivElement>(null);

  const isSettingsActive = pathname.startsWith("/admin/settings");
  const isAnalyticsActive = pathname === "/admin/analytics";

  // Close desktop settings dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setSettingsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close FAB on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setFabOpen(false);
        setFabSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close FAB on route change
  useEffect(() => {
    setFabOpen(false);
    setFabSettingsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ══════════════════════════════
          DESKTOP SIDEBAR (md+)
      ══════════════════════════════ */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-col py-6 px-3">
        {/* Logo */}
        <div className="flex items-center px-3 mb-5 border-b border-gray-100 dark:border-gray-800 pb-4">
          <Link href="/admin">
            <img src="/Container.jpg" alt="Logo" className="h-9 w-auto" />
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link key={label} href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#4F46E5] text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}>
                <Icon size={16} />{label}
              </Link>
            );
          })}

          {/* Analytics */}
          <Link href="/admin/analytics"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isAnalyticsActive
                ? "bg-[#4F46E5] text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            }`}>
            <BarChart2 size={16} />Analytics
          </Link>

          {/* Settings with dropdown */}
          <div ref={settingsRef} className="relative">
            <button onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isSettingsActive
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              }`}>
              <Settings size={16} />
              <span className="flex-1 text-left">Settings</span>
              <ChevronRight size={14} className={`transition-transform duration-200 ${settingsOpen ? "rotate-90" : ""}`} />
            </button>
            {settingsOpen && (
              <div className="mt-1 ml-3 pl-3 border-l-2 border-indigo-100 dark:border-indigo-900 space-y-0.5">
                {settingsDropdown.map(({ label, icon: Icon, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={label} href={href} onClick={() => setSettingsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-[#4F46E5]"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}>
                      <Icon size={14} />{label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Nav */}
        <div className="space-y-0.5 pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          {bottomItems.map(({ label, icon: Icon, href }) => (
            <Link key={label} href={href}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all">
              <Icon size={16} />{label}
            </Link>
          ))}
        </div>
      </aside>

      {/* ══════════════════════════════
          MOBILE BOTTOM NAV (below md)
      ══════════════════════════════ */}
      <div className="md:hidden">

        {/* Backdrop */}
        {fabOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => { setFabOpen(false); setFabSettingsOpen(false); }}
          />
        )}

        {/* FAB fan-out panel — only Analytics + Settings */}
        {fabOpen && (
          <div
            ref={fabRef}
            className="fixed right-4 z-50 flex flex-col items-end gap-3"
            style={{ bottom: "88px" }}
          >
            {/* Settings (with sub-items) */}
            <div
              className="flex flex-col items-end gap-2"
              style={{ animation: "fadeSlideUp 0.18s ease forwards", animationDelay: "0ms", opacity: 0 }}
            >
              {/* Settings row */}
              <button
                onClick={() => setFabSettingsOpen(prev => !prev)}
                className="flex items-center gap-3"
              >
                <span className="text-white text-sm font-semibold bg-gray-900/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm flex items-center gap-1.5">
                  Settings
                  <ChevronDown size={13} className={`transition-transform duration-200 ${fabSettingsOpen ? "rotate-180" : ""}`} />
                </span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isSettingsActive ? "bg-[#4F46E5] ring-2 ring-white ring-offset-1" : "bg-white dark:bg-gray-800"
                }`}>
                  <Settings size={20} className={isSettingsActive ? "text-white" : "text-[#4F46E5]"} />
                </div>
              </button>

              {/* Settings sub-items */}
              {fabSettingsOpen && (
                <div className="flex flex-col items-end gap-2 mr-0">
                  {settingsDropdown.map(({ label, icon: Icon, href }, i) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={label}
                        href={href}
                        className="flex items-center gap-3"
                        style={{
                          animation: "fadeSlideUp 0.15s ease forwards",
                          animationDelay: `${i * 30}ms`,
                          opacity: 0,
                        }}
                      >
                        <span className="text-white text-xs font-semibold bg-indigo-700/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                          {label}
                        </span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                          isActive ? "bg-[#4F46E5] ring-2 ring-white ring-offset-1" : "bg-white dark:bg-gray-800"
                        }`}>
                          <Icon size={17} className={isActive ? "text-white" : "text-[#4F46E5]"} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Analytics row */}
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3"
              style={{ animation: "fadeSlideUp 0.18s ease forwards", animationDelay: "60ms", opacity: 0 }}
            >
              <span className="text-white text-sm font-semibold bg-gray-900/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                Analytics
              </span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isAnalyticsActive ? "bg-[#4F46E5] ring-2 ring-white ring-offset-1" : "bg-white dark:bg-gray-800"
              }`}>
                <BarChart2 size={20} className={isAnalyticsActive ? "text-white" : "text-[#4F46E5]"} />
              </div>
            </Link>
          </div>
        )}

        {/* Bottom bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around px-2 py-2">

            {/* 4 main nav items */}
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link key={label} href={href}
                  className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all">
                  <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-[#4F46E5]/10" : ""}`}>
                    <Icon size={20} className={isActive ? "text-[#4F46E5]" : "text-gray-400 dark:text-gray-500"} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? "text-[#4F46E5]" : "text-gray-400 dark:text-gray-500"}`}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* FAB + button */}
            <div className="relative flex flex-col items-center justify-center">
              <button
                onClick={() => { setFabOpen(prev => !prev); if (fabOpen) setFabSettingsOpen(false); }}
                className={`absolute -top-8 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-900 transition-all duration-300 ${
                  fabOpen ? "bg-gray-800 dark:bg-gray-700" : "bg-[#4F46E5] hover:bg-[#4338CA]"
                }`}
                style={{ boxShadow: "0 4px 20px rgba(79,70,229,0.45)" }}
              >
                <Plus
                  size={24}
                  className={`text-white transition-transform duration-300 ${fabOpen ? "rotate-45" : ""}`}
                />
              </button>
              {/* spacer */}
              <div className="w-14 h-10" />
            </div>

          </div>
        </nav>
      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}