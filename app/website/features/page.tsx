"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Shield,
  MessageCircle,
  CreditCard,
  Truck,
  Check,
  ChevronRight,
  Zap,
  Globe,
  Users,
  ShoppingBag,
} from "lucide-react";

export default function FeaturesPage() {
  const colors = {
    primary: "#0A2E1A",
    primaryLight: "#C8F135",
    cardBg: "#0F3D22",
    darkBg: "#0A2E1A",
    white: "#FFFFFF",
  };

  const features = [
    {
      icon: Shield,
      title: "Buyer Protection",
      tag: "FIRST IN NIGERIA",
      desc: "Funds are held in escrow and only released when your buyer confirms delivery. Zero disputes, zero chargebacks.",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Store Link",
      tag: "SELL WHERE NIGERIANS BUY",
      desc: "One link turns your WhatsApp into a full checkout. Share in any chat — buyers pay without leaving the app.",
    },
    {
      icon: CreditCard,
      title: "Every Payment Method",
      tag: "YOUR CHOICE",
      desc: "Paystack, Flutterwave, OPay, PalmPay, Moniepoint, USSD, bank transfer. We don't lock you into one gateway.",
    },
    {
      icon: Truck,
      title: "Built-in Logistics",
      tag: "SHIP FROM THE DASHBOARD",
      desc: "Book GIG Logistics, Kwik Delivery or Sendbox without leaving MarketPro. One click — done.",
    },
    {
      icon: ShoppingBag,
      title: "Multi-Channel Selling",
      tag: "EVERYWHERE",
      desc: "Sell on WhatsApp, Instagram, Facebook, your website, and MarketPro marketplace — all from one inventory.",
    },
    {
      icon: Zap,
      title: "Powerful Dashboard",
      tag: "MANAGE EVERYTHING",
      desc: "Real-time analytics, inventory sync, customer insights, and order management all in one beautiful interface.",
    },
  ];
  const dashboardImages = [
    "/Dashboard.png",
    "/Dashboard.png",
    "/Dashboard.png",
    "/Dashboard.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % dashboardImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: "01",
      title: "Create your store",
      desc: "Pick a template, add your products, set your prices. Takes less than 10 minutes.",
    },
    {
      step: "02",
      title: "Share your link",
      desc: "Share on WhatsApp, Instagram, Facebook or anywhere. Your store works on every device.",
    },
    {
      step: "03",
      title: "Get paid, ship fast",
      desc: "Funds hit your account the same day. Book delivery straight from your dashboard.",
    },
  ];
  const stats = [
    {
      number: "₦2B+",
      label: "Processed last month",
    },
    {
      number: "10,000+",
      label: "Active sellers",
    },
    {
      number: "100%",
      label: "Commission-free forever",
    },
  ];

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[#081F12]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
      `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C8F135]/20 blur-[140px]" />

        <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-[#C8F135]/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#C8F135]/10 blur-[140px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">
            {/* Heading */}
            <h1 className="font-black leading-[0.95] tracking-tight text-[clamp(3rem,8vw,4rem)] text-white mb-8">
              Sell anywhere,
              <br />
              <span className="text-[#C8F135] relative">
                grow everywhere
                <span className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#C8F135]/20" />
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed mb-10">
              The all-in-one platform built for Nigerian sellers. Multi-channel
              selling, buyer protection, analytics, and logistics — all in one
              dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/auth/signup"
                className="group px-8 py-4 rounded-full font-semibold bg-[#C8F135] text-[#081F12] inline-flex items-center justify-center gap-3 hover:scale-105 transition duration-300 shadow-[0_0_50px_rgba(200,241,53,0.3)]"
              >
                Start Selling Free
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <button className="px-8 py-4 rounded-full border border-[#C8F13544] bg-white/[0.03] backdrop-blur-xl text-white hover:bg-white/10 transition">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5"
                >
                  <h3 className="text-2xl font-bold text-[#C8F135]">
                    {item.number}
                  </h3>

                  <p className="text-sm text-white/60 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[620px]">
              <div
                className="relative"
                style={{
                  perspective: "2000px",
                }}
              >
                <img
                  src={dashboardImages[currentImage]}
                  alt="Dashboard"
                  className="rounded-2xl transition-all duration-700 ease-in-out"
                  style={{
                    transform:
                      "rotateX(7deg) rotateY(15deg) rotateZ(-1deg) scale(1.05)",
                    transformStyle: "preserve-3d",
                    //   boxShadow: "0 40px 100px rgba(200, 241, 53, 0.15)",
                  }}
                />

                <div className="absolute inset-0 rounded-2xl to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section
        className="px-6 sm:px-8 py-20 sm:py-32 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-24">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: colors.primaryLight }}
            >
              Powerful Features
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white">
              Everything a seller needs
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-white/60">
              MarketPro gives you all the tools to build, sell, and grow your
              business without the complexity.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 sm:p-8 border-2 transition-all hover:border-opacity-100"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: "#ffffff1A",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(200, 241, 53, 0.1)",
                        borderWidth: "2px",
                        borderColor: colors.primaryLight,
                      }}
                    >
                      <IconComponent
                        size={24}
                        style={{ color: colors.primaryLight }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold tracking-widest uppercase mb-2 text-white/40">
                        {feature.tag}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section
        className="px-6 sm:px-8 py-20 sm:py-32 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: colors.primaryLight }}
            >
              Get Started
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white">
              Just 3 simple steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector line (hidden on mobile) */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-[calc(100%+16px)] w-[calc(100%-32px)] h-1"
                    style={{ backgroundColor: "rgba(200, 241, 53, 0.2)" }}
                  />
                )}

                <div
                  className="relative z-10 rounded-2xl p-6 sm:p-8 border"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: "#ffffff1A",
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg mb-4"
                    style={{
                      backgroundColor: "rgba(200, 241, 53, 0.15)",
                      color: colors.primaryLight,
                      border: "2px solid" + colors.primaryLight,
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: colors.primaryLight,
                color: colors.primary,
              }}
            >
              Get Started Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        className="px-6 sm:px-8 py-20 sm:py-32 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.05] blur-3xl"
          style={{ backgroundColor: colors.primaryLight }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
          style={{ backgroundColor: colors.primaryLight }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Join thousands of vendors already selling smarter with MarketPro. No
            credit card required. Start selling today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: colors.primaryLight,
                color: colors.primary,
              }}
            >
              Start Free Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold border-2 text-white transition-colors hover:bg-white/10"
              style={{ borderColor: colors.primaryLight }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
      <footer className="bg-[#060F09] py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <img src="/logo.png" alt="MarketPro" className="h-7 w-auto mb-4" />
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              The commerce platform built for Nigeria. Sell more, get paid
              faster, protect every order.
            </p>
          </div>
          {[
            {
              heading: "Product",
              links: ["Features", "Pricing", "Marketplace", "Enterprise"],
            },
            {
              heading: "Resources",
              links: ["Blog", "Help Center", "API Docs", "Status"],
            },
            {
              heading: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 MarketPro. Made with ❤️ in Nigeria.
          </p>
          <p className="text-xs text-white/20">No BVN required.</p>
        </div>
      </footer>
    </div>
  );
}
