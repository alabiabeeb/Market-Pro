"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Enterprise", href: "/enterprise" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#F3FFCA] backdrop-blur-lg shadow-lg"
          : "bg-[#F3FFCA] backdrop-blur-lg shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            // style={{boxShadow:"0 0 20px grey"}}
            alt="Logo"
            className="w-20 h-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[#0A2E1A] hover:text-black"
                  : "text-[#0A2E1A] hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-[#0A2E1A] hover:text-black"
                : "text-[#0A2E1A] hover:text-black"
            }`}
          >
            Log in
          </Link>

          {/* Animated Button */}
          <Link
            href="/get-started"
            className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-[#0A2E1A] text-[#C8F135]"
                : "bg-[#0A2E1A] text-[#C8F135]"
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
            scrolled
              ? "hover:bg-[#0A2E1A]/10"
              : "hover:bg-gray-100"
          }`}
        >
          {menuOpen ? (
            <X
              size={22}
              className={scrolled ? "text-[#0A2E1A]" : "text-black"}
            />
          ) : (
            <Menu
              size={22}
              className={scrolled ? "text-[#0A2E1A]" : "text-black"}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-5 py-5 border-t transition-all duration-500 ${
            scrolled
              ? "bg-[#F3FFCA] border-[#b5d82f]"
              : "bg-[#F3FFCA] border-[#b5d82f]"
          }`}
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#0A2E1A] hover:text-black"
                    : "text-[#0A2E1A] hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-black/10 mt-4 pt-4 space-y-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={`block text-center py-3 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[#0A2E1A] hover:text-black"
                  : "text-[#0A2E1A] hover:text-black"
              }`}
            >
              Log in
            </Link>

            <Link
              href="/get-started"
              onClick={() => setMenuOpen(false)}
              className={`group relative flex justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold ${
                scrolled
                  ? "bg-[#0A2E1A] text-[#C8F135]"
                  : "bg-[#0A2E1A] text-[#C8F135]"
              }`}
            >
              <span
                className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                  scrolled ? "bg-[#0A2E1A] text-[#C8F135]" : "bg-[#0A2E1A]"
                }`}
              />

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
        </div>
      )}
    </header>
  );
}