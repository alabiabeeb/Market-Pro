"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, Shield, Zap, Globe, Users, TrendingUp,
  ShoppingBag, MessageCircle, Truck, CreditCard, Star, Menu, X,
  ChevronRight, Play,
} from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// ── Animated counter ───────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Brand Colors - Original
  const colors = {
    primary: "#0A2E1A",      // Dark green - primary
    primaryDark: "#060F09",  // Darker variant
    primaryLight: "#C8F135", // Lime green - accent
    secondary: "#C8F135",    // Lime green accent
    lightBg: "#F7F4EE",      // Light background
    white: "#FFFFFF",
    textDark: "#0A2E1A",
    textLight: "#FFFFFF",
    textMuted: "#6B7280",
    border: "#E5E7EB",
  };

  const features = [
    {
      icon: Shield,
      title: "Buyer Protection",
      tag: "FIRST IN NIGERIA",
      desc: "Funds are held in escrow and only released when your buyer confirms delivery. Zero disputes, zero chargebacks.",
      bg: colors.secondary,
      textColor: colors.textDark,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Store Link",
      tag: "SELL WHERE NIGERIANS BUY",
      desc: "One link turns your WhatsApp into a full checkout. Share in any chat — buyers pay without leaving the app.",
      bg: colors.primary,
      textColor: colors.textLight,
    },
    {
      icon: CreditCard,
      title: "Every Payment Method",
      tag: "YOUR CHOICE",
      desc: "Paystack, Flutterwave, OPay, PalmPay, Moniepoint, USSD, bank transfer. We don't lock you into one gateway.",
      bg: colors.primary,
      textColor: colors.textLight,
    },
    {
      icon: Truck,
      title: "Built-in Logistics",
      tag: "SHIP FROM THE DASHBOARD",
      desc: "Book GIG Logistics, Kwik Delivery or Sendbox without leaving MarketPro. One click — done.",
      bg: colors.secondary,
      textColor: colors.textDark,
    },
  ];

  const steps = [
    { step: "01", title: "Create your store", desc: "Pick a template, add your products, set your prices. Takes less than 10 minutes." },
    { step: "02", title: "Share your link", desc: "Share on WhatsApp, Instagram, Facebook or anywhere. Your store works on every device." },
    { step: "03", title: "Get paid, ship fast", desc: "Funds hit your account the same day. Book delivery straight from your dashboard." },
  ];

  const testimonials = [
    { name: "Amaka O.", biz: "Fashion Vendor, Lagos", text: "I was on FinStore before. MarketPro's buyer protection alone brought me 3× more buyers. People trust the platform.", stars: 5 },
    { name: "Emeka T.", biz: "Electronics, Aba", text: "The WhatsApp store link changed everything. My customers pay from WhatsApp — I don't lose them anymore.", stars: 5 },
    { name: "Hauwa M.", biz: "Abaya & Hijab, Kano", text: "No BVN required. That was the first thing that made me sign up. Setup was fast and my first order came the same day.", stars: 5 },
  ];

  const compareRows = [
    { feature: "Buyer Protection / Escrow",  us: true,  them: false },
    { feature: "WhatsApp Store Link",        us: true,  them: false },
    { feature: "Multiple Payment Gateways",  us: true,  them: false },
    { feature: "Built-in Logistics Booking", us: true,  them: false },
    { feature: "No BVN Required",            us: true,  them: false },
    { feature: "USSD Checkout for Buyers",   us: true,  them: false },
    { feature: "Group / Cooperative Orders", us: true,  them: false },
    { feature: "Free to Start",              us: true,  them: true  },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Header />
      {/* ── HERO ── */}
      <Hero />
     <section className="pt-16 min-h-screen flex flex-col justify-center relative overflow-hidden"
  style={{ backgroundColor: "#F7F4EE" }}>
  {/* Background texture */}
  <div className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: "radial-gradient(circle, #0A2E1A 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }} />
  <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
    style={{ backgroundColor: "#0A2E1A" }} />
  <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl"
    style={{ backgroundColor: "#0A2E1A" }} />

  <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Left */}
    <div className="space-y-8 ">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
        style={{ borderColor: "#0A2E1A", color: "#0A2E1A" }}>
        {/* <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#0A2E1A" }} /> */}
        POWERFUL DASHBOARD
      </div>

      <h1 className="text-[clamp(2.4rem,6vw,4.2rem)] font-black leading-[1.05] tracking-tight"
        style={{ color: "#0A2E1A" }}>
        Everything at<br />
        <span style={{ color: "#C8F135", WebkitTextStroke: "0.5px #0A2E1A" }}>
          your fingertips
        </span>
      </h1>

      <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#0A2E1A99" }}>
        Manage orders, track inventory, view analytics, and grow your business from one beautiful dashboard.
      </p>

      {/* Checklist */}
      <div className="space-y-3">
        {[
          "Real-time sales notifications",
          "Inventory sync across all channels",
          "Customer insights & analytics",
          "Staff performance tracking",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#0A2E1A1A" }}>
              <Check size={12} style={{ color: "#0A2E1A" }} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium" style={{ color: "#0A2E1ACC" }}>{item}</span>
          </div>
        ))}
      </div>
      <p className="text-sm" style={{ color: "#0A2E1A66" }}>No BVN required · Free to start · Setup in 10 minutes</p>
    </div>

    {/* Right — dashboard mockup */}
    <div className="relative">
      <div className="rounded-2xl overflow-hidden shadow-2xl border"
        style={{ backgroundColor: "#0A2E1A", borderColor: "#0A2E1A1A" }}>
        {/* Mock browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4 h-6 rounded-full bg-white/10 text-[10px] text-white/40 flex items-center px-3">
            marketpro.ng/yourstore
          </div>
        </div>

        {/* Mock dashboard content */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Today's Sales", "₦245,000", "+12%"],
              ["Orders", "28", "+8%"],
              ["Customers", "156", "+23%"],
            ].map(([k, v, delta]) => (
              <div key={k} className="rounded-xl p-3 space-y-1 bg-white/[0.04]">
                <p className="text-[10px] text-white/40">{k}</p>
                <p className="text-lg font-bold text-white">{v}</p>
                <p className="text-[10px] font-semibold text-emerald-400">{delta}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-32 bg-white/[0.03] rounded-xl p-4">
            {[40, 55, 35, 70, 50, 85, 60, 78, 65, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-t"
                style={{ height: `${h}%`, backgroundColor: "#C8F135", opacity: 0.5 + (h / 200) }} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100">
          <TrendingUp size={15} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">New Order!</p>
          <p className="text-[10px] text-gray-400">₦45,000 · Just now</p>
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <div className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl px-4 py-3"
        style={{ backgroundColor: "#0A2E1A" }}>
        <p className="text-[10px] text-white/50">Monthly Revenue</p>
        <p className="text-base font-black text-white">₦2.5M</p>
        <p className="text-[10px] font-semibold" style={{ color: "#C8F135" }}>↑ 34% from last month</p>
      </div>
    </div>
  </div>

  {/* Stats strip */}
  <div className="relative border-t" style={{ borderColor: "#0A2E1A14" }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
      {[
        { n: 50000, s: "+", label: "Merchants" },
        { n: 2, s: "B+", label: "₦ Processed" },
        { n: 99, s: "%", label: "Uptime" },
        { n: 10, s: "min", label: "Setup time" },
      ].map(({ n, s, label }) => (
        <div key={label} className="text-center">
          <p className="text-3xl font-black" style={{ color: "#0A2E1A" }}>
            <Counter end={n} suffix={s} />
          </p>
          <p className="text-sm mt-1" style={{ color: "#0A2E1A66" }}>{label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="py-4 bg-[#F7F4EE] border-y border-gray-200 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {["Paystack", "Flutterwave", "OPay", "PalmPay", "Moniepoint", "GIG Logistics", "Kwik Delivery", "Sendbox", "Paystack", "Flutterwave", "OPay", "PalmPay"].map((p, i) => (
            <span key={i} className="text-sm font-semibold text-gray-400 shrink-0">{p}</span>
          ))}
        </div>
      </section>

      {/* ── WHY MARKETPRO ── */}
      <section className="py-20 sm:py-28 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Why merchants switch</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A2E1A] leading-tight">
              Built for how Nigeria<br />actually does business
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Not a copy of Shopify. Not a copy of FinStore. Built from the ground up for Nigerian merchants, Nigerian buyers, and Nigerian logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isLightBg = f.bg === "#C8F135";
              return (
                <div key={i} onClick={() => setActiveFeature(i)}
                  className={`rounded-2xl p-7 cursor-pointer transition-all ${i === activeFeature ? "scale-[1.02] shadow-xl" : "hover:scale-[1.01]"}`}
                  style={{ backgroundColor: f.bg }}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${isLightBg ? "bg-[#0A2E1A]/10" : "bg-white/10"}`}>
                    <Icon size={22} className={isLightBg ? "text-[#0A2E1A]" : "text-white"} />
                  </div>
                  <p className={`text-[10px] font-bold tracking-widest mb-2 opacity-60 ${isLightBg ? "text-[#0A2E1A]" : "text-white"}`}>{f.tag}</p>
                  <h3 className={`text-xl font-black mb-3 ${isLightBg ? "text-[#0A2E1A]" : "text-white"}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed opacity-80 ${isLightBg ? "text-[#0A2E1A]" : "text-white"}`}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A2E1A]">Open, sell, repeat.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative group">
                <div className="text-6xl font-black mb-6 transition-colors" style={{ color: "#C8F135" }}>{step}</div>
                <h3 className="text-xl font-bold text-[#0A2E1A] mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#0A2E1A" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#C8F135" }}>The honest comparison</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">MarketPro vs the rest</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="grid grid-cols-3 text-sm font-bold px-6 py-4 border-b border-white/10"
              style={{ backgroundColor: "#0F3D22" }}>
              <span className="text-white/40">Feature</span>
              <span className="text-center" style={{ color: "#C8F135" }}>MarketPro</span>
              <span className="text-center text-white/40">Others</span>
            </div>
            {compareRows.map(({ feature, us, them }, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 items-center text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <span className="text-white/70">{feature}</span>
                <div className="flex justify-center">
                  {us
                    ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#C8F135" }}><Check size={13} style={{ color: "#0A2E1A" }} /></div>
                    : <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><X size={13} className="text-white/30" /></div>}
                </div>
                <div className="flex justify-center">
                  {them
                    ? <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check size={13} className="text-white/50" /></div>
                    : <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><X size={13} className="text-white/30" /></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-28 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Merchants speak</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A2E1A]">Real businesses,<br />real results.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#C8F135" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">"{t.text}"</p>
                <div>
                  <p className="font-bold text-[#0A2E1A] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.biz}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A2E1A]">Simple. No surprises.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter", price: "Free", period: "forever",
                features: ["1 store", "50 products", "WhatsApp link", "All payment gateways", "Basic analytics"],
                cta: "Start free", highlight: false,
              },
              {
                name: "Growth", price: "₦9,999", period: "/month",
                features: ["3 stores", "Unlimited products", "Buyer protection", "Logistics booking", "Priority support", "Advanced analytics"],
                cta: "Start Growth", highlight: true,
              },
              {
                name: "Enterprise", price: "Custom", period: "",
                features: ["Unlimited stores", "Multi-vendor marketplace", "Dedicated account manager", "Custom integrations", "SLA guarantee"],
                cta: "Talk to us", highlight: false,
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-7 space-y-6 border-2 transition-all ${plan.highlight ? "border-transparent shadow-xl" : "border-gray-100 hover:border-gray-200"}`}
                style={plan.highlight ? { backgroundColor: "#0A2E1A" } : {}}>
                <div>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${plan.highlight ? "text-white/40" : "text-gray-400"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-[#0A2E1A]"}`}>{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-white/40" : "text-gray-400"}`}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: plan.highlight ? "#C8F135" : "#0A2E1A" }}>
                        <Check size={11} style={{ color: plan.highlight ? "#0A2E1A" : "#C8F135" }} />
                      </div>
                      <span className={plan.highlight ? "text-white/70" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup"
                  className="block w-full text-center py-3 rounded-full text-sm font-bold transition-all"
                  style={plan.highlight
                    ? { backgroundColor: "#C8F135", color: "#0A2E1A" }
                    : { backgroundColor: "#0A2E1A", color: "#C8F135" }}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 sm:py-32 relative overflow-hidden" style={{ backgroundColor: "#0A2E1A" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #C8F135 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center space-y-8">
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-[1.05]">
            Your store.<br />
            <span style={{ color: "#C8F135" }}>Open now.</span>
          </h2>
          <p className="text-lg text-white/50">No BVN. No setup fee. No wahala.</p>
          <Link href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}>
            Create your store free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060F09] py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <img src="/logo.png" alt="MarketPro" className="h-7 w-auto mb-4" />
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              The commerce platform built for Nigeria. Sell more, get paid faster, protect every order.
            </p>
          </div>
          {[
            { heading: "Product", links: ["Features", "Pricing", "Marketplace", "Enterprise"] },
            { heading: "Resources", links: ["Blog", "Help Center", "API Docs", "Status"] },
            { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}><Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2025 MarketPro. Made with ❤️ in Nigeria.</p>
          <p className="text-xs text-white/20">No BVN required.</p>
        </div>
      </footer>

      {/* Marquee + reduced-motion styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}