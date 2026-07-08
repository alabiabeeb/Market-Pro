import Link from "next/link";
import { ArrowRight, Play, Smartphone, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/signup bg.jpg')" }} // replace with your image
      />

      {/* Dark green tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #0A2E1AF2 0%, #0A2E1AD9 35%, #0A2E1A99 65%, #0A2E1A40 100%)",
        }}
      />

      {/* Bottom fade for legibility of stats/app badges */}
      <div
        className="absolute inset-x-0 bottom-0 h-72"
        style={{ background: "linear-gradient(to top, #0A2E1AE6, transparent)" }}
      />


      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 max-w-4xl">
        <h1 className="font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)] text-white">
          Be the next
        </h1>
        <h1
          className="font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)]"
          style={{ color: "#C8F135" }}
        >
          thriving brand
        </h1>

        <div className="mt-6 space-y-1">
          <p className="text-lg sm:text-xl text-white/70">
            Launch your online store in minutes. Sell everywhere.
          </p>
          <p className="text-lg sm:text-xl font-bold text-white">Completely free.</p>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-bold bg-white text-gray-900 transition-opacity hover:opacity-90"
          >
            Start for free <ArrowRight size={18} />
          </Link>

          <button className="flex items-center gap-3 text-white font-semibold text-sm">
            <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center">
              <Play size={14} className="ml-0.5" />
            </span>
            Watch story
          </button>
        </div>
      </div>

      {/* Bottom row: stats + app badges */}
      <div className="relative z-10 px-6 sm:px-10 pb-10">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-white/70 mb-6 justify-end">
          <span className="flex items-center gap-1.5">
            <TrendingUp size={14} style={{ color: "#C8F135" }} />
            10,000+ businesses
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span>₦2B+ processed</span>
        </div>
      </div>
    </section>
  );
}