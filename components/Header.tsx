import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 px-8 lg:px-16 flex items-center justify-between bg-white border-b border-gray-200">
      <Link href="/">
        <img src = "/logo.png" alt ="logo" className="w-20" />
      </Link>
      <nav className="hidden md:flex items-center gap-10">
        <Link href="/solutions"className="text-[17px] font-[700] text-gray-600 hover:text-indigo-600 transition">
          Solutions
        </Link>

        <Link href="/pricing"className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
          Pricing
        </Link>

        <Link href="/marketplace"
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
        >
          Marketplace
        </Link>

        <Link
          href="/enterprise"
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
        >
          Enterprise
        </Link>
      </nav>
      <Link
        href="/get-started"
        className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm font-semibold"
      >
        Get Started
      </Link>
    </header>
  );
}