"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart2, Settings, HelpCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
  { label: "Analytics", icon: BarChart2, href: "/admin/analytics" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, href: "/admin/settings" },
  { label: "Support", icon: HelpCircle, href: "/admin/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

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
          {navItems.slice(0, 5).map(({ label, icon: Icon, href }) => {
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
        </nav>

        {/* Bottom Nav */}
        <div className="space-y-0.5">
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
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive ? "bg-[#4F46E5]/10" : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-[#4F46E5]" : "text-gray-400"}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-[#4F46E5]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}