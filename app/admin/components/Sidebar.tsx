"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart2,
  Settings, HelpCircle, Store, UserCircle, ChevronRight, Plus,Tag
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Orders",    icon: ShoppingCart,    href: "/admin/orders" },
  { label: "Products",  icon: Package,          href: "/admin/product" },
  { label: "Customers", icon: Users,            href: "/admin/customers" },
  { label: "Analytics", icon: BarChart2,        href: "/admin/analytics" },
  {label: "Categories", icon: Tag, href: "/admin/category" },
];

const settingsDropdown = [
  { label: "Store Settings",   icon: Store,      href: "/admin/settings/store" },
  { label: "Profile Settings", icon: UserCircle, href: "/admin/settings/profile" },
];

const bottomItems = [
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
];

// Items that fan out when + is tapped (shown in reverse so last item is closest to button)
const fabItems = [
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
  {label: "Categories", icon: Package, href: "/admin/category" },
  { label: "Analytics", icon: BarChart2, href: "/admin/analytics" },
  { label: "Store Settings",   icon: Store,      href: "/admin/settings/store" },
  { label: "Profile Settings", icon: UserCircle, href: "/admin/settings/profile" },
];

export default function Sidebar() {
  const pathname  = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fabOpen, setFabOpen]           = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const fabRef      = useRef<HTMLDivElement>(null);

  const isSettingsActive = pathname.startsWith("/admin/settings");

  // Close desktop settings dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setSettingsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close FAB menu on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node))
        setFabOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close FAB on route change
  useEffect(() => { setFabOpen(false); }, [pathname]);

  // Which bottom-bar icons to always show (first 4 nav items)
  const bottomNavItems = navItems.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════
          DESKTOP SIDEBAR (md+)
      ════════════════════════════════ */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white dark:bg-[#08120C] border-r border-[#E5E7EB] dark:border-[#153323] flex-col py-6 px-3">
        {/* Logo */}
        <div className="flex items-center px-3 mb-5 border-b border-[#E5E7EB] dark:border-[#153323] pb-4">
          <Link href="/admin">
            <img src="/Container.png" alt="Logo" className="h-9 w-auto" />
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
                    ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
                }`}>
                <Icon size={16} />{label}
              </Link>
            );
          })}

          {/* Settings with dropdown */}
          <div ref={settingsRef} className="relative">
            <button onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isSettingsActive
                  ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
              }`}>
              <Settings size={16} />
              <span className="flex-1 text-left">Settings</span>
              <ChevronRight size={14} className={`transition-transform duration-200 ${settingsOpen ? "rotate-90" : ""}`} />
            </button>
            {settingsOpen && (
              <div className="mt-1 ml-3 pl-3 border-l-2 border-[#C8F135]/30 dark:border-[#C8F135]/20 space-y-0.5">
                {settingsDropdown.map(({ label, icon: Icon, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={label} href={href} onClick={() => setSettingsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#F7F4EE] dark:bg-[#0F1D14] text-[#0A2E1A]"
                          : "text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
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
        <div className="space-y-0.5 pt-2 border-t border-[#E5E7EB] dark:border-[#153323] mt-2">
          {bottomItems.map(({ label, icon: Icon, href }) => (
            <Link key={label} href={href}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE] transition-all">
              <Icon size={16} />{label}
            </Link>
          ))}
        </div>
      </aside>

      {/* ════════════════════════════════
          MOBILE BOTTOM NAV (below md)
      ════════════════════════════════ */}
      <div className="md:hidden">

        {/* ── Backdrop when FAB is open ── */}
        {fabOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setFabOpen(false)}
          />
        )}

        {/* ── FAB fan-out items ── */}
        {fabOpen && (
          <div className="fixed right-4 z-50" style={{ bottom: "80px" }}>
            <div className="flex flex-col items-end gap-3">
              {fabItems.map(({ label, icon: Icon, href }, i) => {
                const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                return (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 group"
                    style={{
                      animation: `fadeSlideUp 0.2s ease forwards`,
                      animationDelay: `${i * 40}ms`,
                      opacity: 0,
                    }}
                  >
                    {/* Label */}
                    <span className="text-white text-sm font-semibold bg-gray-900/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                      {label}
                    </span>
                    {/* Icon circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isActive
                        ? "bg-[#0A2E1A] ring-2 ring-white ring-offset-1"
                        : "bg-white dark:bg-gray-800"
                    }`}>
                      <Icon size={20} className={isActive ? "text-[#C8F135]" : "text-[#0A2E1A]"} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Fixed bottom bar ── */}
        <nav className="fixed bottom-0 left-0  right-0 z-50 bg-white dark:bg-[#08120C] border-t border-[#E5E7EB] dark:border-[#153323] shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around px-2 py-2 relative">

            {/* First 4 nav items */}
            {bottomNavItems.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <Link key={label} href={href}
                  className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all">
                  <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-[#C8F135]/20" : ""}`}>
                    <Icon size={20} className={isActive ? "text-[#0A2E1A]" : "text-gray-400 dark:text-gray-500"} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? "text-[#0A2E1A] dark:text-[#C8F135]" : "text-gray-400 dark:text-gray-500"}`}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* FAB + button — sits above the bar */}
            <div ref={fabRef} className="relative flex flex-col items-center">
              <button
                onClick={() => setFabOpen(prev => !prev)}
                className={`absolute -top-8 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border-4 border-white dark:border-gray-900 ${
                  fabOpen
                    ? "bg-[#060F09] dark:bg-gray-700"
                    : "bg-[#0A2E1A] hover:bg-[#060F09]"
                }`}
                style={{ boxShadow: "0 4px 20px rgba(10,46,26,0.22)" }}
              >
                <Plus
                  size={24}
                  className={`text-white transition-transform duration-300 ${fabOpen ? "rotate-45" : ""}`}
                />
              </button>
              {/* Spacer so the bar layout stays even */}
              <div className="w-14 h-10" />
            </div>

          </div>
        </nav>
      </div>

      {/* ── Animation keyframes ── */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}