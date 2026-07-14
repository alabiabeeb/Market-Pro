"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "/website/features" },
  { label: "Pricing", href: "/website/pricing" },
  { label: "Templates", href: "/marketplace" },
  { label: "Enterprise", href: "/website/enterprise" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set correct state on mount (e.g. if page loads mid-scroll)

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#F3FFCA] backdrop-blur-lg shadow-lg border-[#b5d82f]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20 h-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? scrolled
                      ? "text-[#0A2E1A]"
                      : "text-white"
                    : scrolled
                    ? "text-[#0A2E1A]/60 hover:text-[#0A2E1A]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                  style={{ backgroundColor: scrolled ? "#0A2E1A" : "#C8F135" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/login"
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-[#0A2E1A] hover:text-black"
                : "text-white/90 hover:text-white"
            }`}
          >
            Log in
          </Link>

          {/* Animated Button */}
          <Link
            href="/auth/signup"
            className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-[#0A2E1A] text-[#C8F135]"
                : "bg-[#C8F135] text-[#0A2E1A]"
            }`}
          >
            {/* BEFORE Layer */}
            <span
              className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out ${
                scrolled ? "bg-white" : "bg-[#0A2E1A]"
              }`}
            />

            {/* AFTER Layer */}
            <span
              className={`absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out ${
                scrolled ? "bg-white/20" : "bg-[#C8F135]/20"
              }`}
            />

            {/* Text */}
            <span
              className={`relative z-10 transition-colors duration-500 ${
                scrolled
                  ? "group-hover:text-[#0A2E1A]"
                  : "group-hover:text-[#C8F135]"
              }`}
            >
              Get Started →
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition ${
            scrolled ? "hover:bg-[#0A2E1A]/10" : "hover:bg-white/10"
          }`}
        >
          {menuOpen ? (
            <X size={22} className={scrolled ? "text-[#0A2E1A]" : "text-white"} />
          ) : (
            <Menu size={22} className={scrolled ? "text-[#0A2E1A]" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-5 py-5 border-t transition-all duration-500 ${
            scrolled
              ? "bg-[#F3FFCA] border-[#b5d82f]"
              : "bg-[#0A2E1A]/95 backdrop-blur-lg border-white/10"
          }`}
        >
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? scrolled
                        ? "text-[#0A2E1A] font-semibold"
                        : "text-white font-semibold"
                      : scrolled
                      ? "text-[#0A2E1A]/60 hover:text-[#0A2E1A]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: scrolled ? "#0A2E1A" : "#C8F135" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div
            className={`border-t mt-4 pt-4 space-y-3 ${
              scrolled ? "border-black/10" : "border-white/10"
            }`}
          >
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={`block text-center py-3 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[#0A2E1A] hover:text-black"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Log in
            </Link>

            <Link
              href="/auth/signup"
              onClick={() => setMenuOpen(false)}
              className={`group relative flex justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold ${
                scrolled
                  ? "bg-[#0A2E1A] text-[#C8F135]"
                  : "bg-[#C8F135] text-[#0A2E1A]"
              }`}
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}