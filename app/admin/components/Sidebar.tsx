"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useTrial } from "./TrialProvider";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart2,
  Settings, HelpCircle, Store, UserCircle, ChevronRight, Plus, Tag, Percent, Layout,
  Crown, Lock, Sparkles, Globe
} from "lucide-react";

// ── Nav items with feature keys ──
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", feature: "dashboard" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders", feature: "orders" },
  { label: "Products", icon: Package, href: "/admin/product", feature: "products" },
  { label: "Customers", icon: Users, href: "/admin/customer", feature: "customers" },
  { label: "Analytics", icon: BarChart2, href: "/admin/analytics", feature: "analytics" },
  { label: "Categories", icon: Tag, href: "/admin/category", feature: "categories" },
  { label: "Staff", icon: Users, href: "/admin/staff", feature: "staff_management" },
  { label: "Template Builder", icon: Layout, href: "/admin/template-builder", feature: "template_builder" },
  { label: "Cart Recovery", icon: ShoppingCart, href: "/admin/cart-recovery", feature: "cart_recovery" },
];

// ── All nav items for mobile FAB ──
const allNavItems = [
  ...navItems,
  { label: "Support", icon: HelpCircle, href: "/admin/support", feature: "support" },
  { label: "Store Settings", icon: Store, href: "/admin/settings/store", feature: "store_settings" },
  { label: "Profile Settings", icon: UserCircle, href: "/admin/settings/profile", feature: "profile_settings" },
];

const bottomNavItems = navItems.slice(0, 4);

// FAB items - all nav items not shown in bottom bar
const fabItems = allNavItems.filter(
  item => !bottomNavItems.some(bottom => bottom.href === item.href)
);

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { canAccessFeature, isTrial, isPremium, showUpgradePrompt } = useTrial();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);

  const isSettingsActive = pathname.startsWith("/admin/settings");

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setSettingsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node))
        setFabOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => { setFabOpen(false); }, [pathname]);

  const isFeatureLocked = (feature: string) => {
    return !canAccessFeature(feature);
  };

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
          {navItems.map(({ label, icon: Icon, href, feature }) => {
            const isActive = pathname === href;
            const isLocked = isFeatureLocked(feature);

            if (isLocked) {
              return (
                <button
                  key={label}
                  onClick={showUpgradePrompt}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] group relative"
                >
                  <Icon size={16} className="opacity-50" />
                  <span className="flex-1 text-left">{label}</span>
                  <Lock size={12} className="text-gray-400 opacity-50" />
                  <span className="absolute right-8 text-[8px] font-bold text-[#C8F135] bg-[#C8F135]/10 px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    🔒
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={label}
                href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#0A2E1A] text-[#C8F135] shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE]"
                }`}
              >
                <Icon size={16} />{label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Nav */}
        <div className="space-y-0.5 pt-2 border-t border-[#E5E7EB] dark:border-[#153323] mt-2">
          {[
            { label: "Support", icon: HelpCircle, href: "/admin/support", feature: "support" },
          ].map(({ label, icon: Icon, href, feature }) => {
            const isLocked = isFeatureLocked(feature);
            if (isLocked) {
              return (
                <button
                  key={label}
                  onClick={showUpgradePrompt}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-all"
                >
                  <Icon size={16} className="opacity-50" />
                  {label}
                  <Lock size={12} className="text-gray-400 opacity-50 ml-auto" />
                </button>
              );
            }
            return (
              <Link
                key={label}
                href={href}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] hover:text-[#0A2E1A] dark:hover:text-[#F7F4EE] transition-all"
              >
                <Icon size={16} />{label}
              </Link>
            );
          })}
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
          <div
            ref={fabRef}
            className="fixed right-4 bottom-24 z-[9999] flex flex-col items-end gap-3"
          >
            {fabItems.map(({ label, icon: Icon, href, feature }, i) => {
              const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              const isLocked = isFeatureLocked(feature);

              if (isLocked) {
                return (
                  <button
                    key={label}
                    onClick={showUpgradePrompt}
                    className="flex items-center gap-3"
                    style={{
                      animation: "fadeSlideUp .25s ease forwards",
                      animationDelay: `${i * 40}ms`,
                      opacity: 0,
                    }}
                  >
                    <span className="text-white text-sm font-semibold bg-gray-900/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                      {label} 🔒
                    </span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gray-300 dark:bg-gray-700">
                      <Lock size={20} className="text-gray-500" />
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setFabOpen(false)}
                  className="flex items-center gap-3"
                  style={{
                    animation: "fadeSlideUp .25s ease forwards",
                    animationDelay: `${i * 40}ms`,
                    opacity: 0,
                  }}
                >
                  <span className="text-white text-sm font-semibold bg-gray-900/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                    {label}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isActive
                        ? "bg-[#0A2E1A]"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-[#C8F135]"
                          : "text-[#0A2E1A]"
                      }
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Fixed bottom bar ── */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#08120C] border-t border-[#E5E7EB] dark:border-[#153323] shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
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