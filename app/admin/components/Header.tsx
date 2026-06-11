"use client";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8">

      {/* Left: logo on mobile / welcome text on desktop */}
      <div className="min-w-0">
        {/* Mobile: logo */}
        <Link href="/admin" className="flex items-center gap-2 md:hidden">
          <img src="/Container.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop: welcome text */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            Welcome back, <span className="text-[#3525CD]">Alex</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <img
          src="/avatar.jpg"
          alt="User avatar"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
        />
      </div>

    </header>
  );
}