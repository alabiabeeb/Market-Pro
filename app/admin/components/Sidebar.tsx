"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart2, Tags,
  Settings, HelpCircle, Store, UserCircle, ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Orders",    icon: ShoppingCart,    href: "/admin/orders" },
  { label: "Products",  icon: Package,          href: "/admin/product" },
  { label: "Customers", icon: Users,            href: "/admin/customer" },
  { label: "Analytics", icon: BarChart2,        href: "/admin/analytics" },
  { label: "Category", icon: Tags, href: "/admin/category" }
];

const settingsDropdown = [
  { label: "Store Settings",   icon: Store,       href: "/admin/settings/store" },
  { label: "Profile Settings", icon: UserCircle,  href: "/admin/settings/profile" },
];

const bottomItems = [
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const isSettingsActive = pathname.startsWith("/admin/settings");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* ── Desktop sidebar (md+) ── */}
      <aside className="hidden md:flex w-56 min-h-screen bg-white border-r border-gray-100 flex-col py-6 px-3">
        {/* Logo */}
        <div className="flex items-center px-3 mb-5 border-b border-gray-100 pb-4">
          <Link href="/admin">
            <img src="/Container.jpg" alt="Logo" className="h-9 w-auto" />
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#4F46E5] text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}

          {/* Settings with dropdown */}
          <div ref={settingsRef} className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isSettingsActive
                  ? "bg-[#4F46E5] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings size={16} />
              <span className="flex-1 text-left">Settings</span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-200 ${settingsOpen ? "rotate-90" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {settingsOpen && (
              <div className="mt-1 ml-3 pl-3 border-l-2 border-indigo-100 space-y-0.5">
                {settingsDropdown.map(({ label, icon: Icon, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setSettingsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-indigo-50 text-[#4F46E5]"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Nav */}
        <div className="space-y-0.5 pt-2 border-t border-gray-100 mt-2">
          {bottomItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </aside>

      {/* ── Mobile bottom nav bar (below md) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all"
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-[#4F46E5]/10" : ""}`}>
                  <Icon size={20} className={isActive ? "text-[#4F46E5]" : "text-gray-400"} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-[#4F46E5]" : "text-gray-400"}`}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Settings in mobile bottom nav — opens a small popup */}
          <MobileSettingsMenu pathname={pathname} />
        </div>
      </nav>
    </>
  );
}

// Separate component for mobile settings popup
function MobileSettingsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.startsWith("/admin/settings");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all"
      >
        <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-[#4F46E5]/10" : ""}`}>
          <Settings size={20} className={isActive ? "text-[#4F46E5]" : "text-gray-400"} />
        </div>
        <span className={`text-[10px] font-medium ${isActive ? "text-[#4F46E5]" : "text-gray-400"}`}>
          Settings
        </span>
      </button>

      {/* Popup above the nav bar */}
      {open && (
        <div className="absolute bottom-14 right-0 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 w-44 z-50">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 pb-1.5">
            Settings
          </p>
          {settingsDropdown.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                pathname === href
                  ? "text-[#4F46E5] bg-indigo-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}