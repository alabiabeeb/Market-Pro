import Link from "next/link";
import { ArrowRight, Play, Smartphone, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full sm:absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero_bg.png')" }} // replace with your image
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
      <div className="relative z-10 mt-14 flex-1 flex flex-col justify-center px-6 sm:px-10 max-w-4xl">
        <h1 className=" text-center font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)] text-white sm:text-start font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)] text-white">
          Be the next
        </h1>
        <h1
          className="text-center font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)] sm:text-start font-black leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,6rem)]"
          style={{ color: "#C8F135" }}
        >
          thriving brand
        </h1>

        <div className="mt-6 space-y-1">
          <p className="text-lg text-center sm:text-xl text-start text-white/70">
            Launch your online store in minutes. Sell everywhere, 
            <span className="text-lg sm:hidden text-xl font-bold text-white"> Completely free.</span>
          </p>
          <p className="text-lg hidden sm:text-xl font-bold text-white">Completely free.</p>
        </div>

        <div className="mt-8 flex flex-col items-start gap-5 w-full sm:flex-row sm:items-center sm:gap-6">
  <Link
    href="/auth/signup"
    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold bg-white text-gray-900 transition-opacity hover:opacity-90"
  >
    Start for free <ArrowRight size={18} />
  </Link>

  <button className="flex items-center gap-3 text-white font-semibold text-sm rounded-full w-full sm:w-auto justify-center sm:justify-start pl-2 pr-5 py-2 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
  <span className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10">
    <Play size={12} className="ml-0.5 sm:hidden" />
    <Play size={14} className="ml-0.5 hidden sm:block" />
  </span>
  Watch story
</button>
</div>
      </div>

      {/* Bottom row: stats + app badges */}
      <div className="relative z-10 px-6 mr-10 sm:px-10 pb-10">
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