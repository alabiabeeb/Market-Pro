"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Check } from "lucide-react";
import Link from "next/link";
const plans = [
  {
    name: "Essentials",
    monthlyPrice: 69000,
    yearlyPrice: 55000, // effective per-month price when billed yearly
    highlight: false,
    description: "The basics for automating your design tokens and assets syncing",
    features: ["1 user", "1 repository", "Unlimited sources", "Unlimited destinations"],
  },
  {
    name: "Teams",
    monthlyPrice: 134000,
    yearlyPrice: 107000,
    highlight: true,
    badge: "Most popular",
    description: "Built for teams looking to streamline their workflows",
    features: ["4 users", "2 repositories", "Unlimited sources", "Unlimited destinations"],
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    highlight: false,
    isCustom: true,
    description: "For organizations looking for more security and customization",
    features: ["Unlimited users", "Unlimited repositories", "SSO", "CDN"],
  },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div style={{ backgroundColor: "#0A2E1A" }}>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6 sm:px-10">
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0A2E1AF2, #0A2E1A)" }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#C8F135" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-black leading-[1.05] tracking-tight text-[clamp(2.2rem,6vw,3.8rem)] text-white">
            Find a plan to streamline
            <br />
            your workflows
          </h1>

          <p className="mt-5 text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Specify helps you to automate the distribution of your design tokens and assets.
            Empowering both designers and developers in their day-to-day work.
          </p>

          {/* Monthly / Yearly toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className="text-sm font-medium transition-colors"
              style={{ color: !yearly ? "#C8F135" : "#ffffff66" }}
            >
              Monthly
            </span>

            <button
              onClick={() => setYearly(!yearly)}
              className="w-11 h-6 rounded-full relative transition-colors"
              style={{ backgroundColor: yearly ? "#7e9b15" : "#ffffff33" }}
              aria-label="Toggle yearly billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  yearly ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className="text-sm font-medium transition-colors flex items-center gap-2"
              style={{ color: yearly ? "#C8F135" : "#ffffff66" }}
            >
              Yearly
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-opacity duration-300"
                style={{
                  backgroundColor: "#C8F13522",
                  color: "#C8F135",
                  opacity: yearly ? 1 : 0,
                }}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="relative z-10 max-w-5xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight ? "border-2" : "border"
                }`}
                style={{
                  backgroundColor: "#0F3D22",
                  borderColor: plan.highlight ? "#C8F135" : "#ffffff1A",
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}
                  >
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-white font-semibold text-base">{plan.name}</h3>

                <div className="mt-3 flex items-baseline gap-1 min-h-[44px]">
                  {plan.isCustom ? (
                    <span className="text-3xl font-black text-white">Let&apos;s Talk</span>
                  ) : (
                    <>
                      <span className="text-4xl font-black" style={{ color: "#C8F135" }}>
                        {formatNaira(price as number)}
                      </span>
                      <span className="text-white/40 text-sm">/month</span>
                    </>
                  )}
                </div>

                {!plan.isCustom && (
                  <p className="text-xs text-white/35 -mt-1">
                    {yearly
                      ? `Billed as ${formatNaira((price as number) * 12)}/year`
                      : "Billed monthly"}
                  </p>
                )}

                <p className="mt-3 text-sm text-white/50 leading-relaxed">{plan.description}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#C8F135" }}
                      >
                        <Check size={10} style={{ color: "#0A2E1A" }} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-6 w-full py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                  style={
                    plan.highlight
                      ? { backgroundColor: "#C8F135", color: "#0A2E1A" }
                      : { backgroundColor: "#ffffff14", color: "white", border: "1px solid #ffffff33" }
                  }
                >
                  {plan.isCustom ? "Contact us" : "Get started"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-6 sm:px-10 pb-24">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b" style={{ borderColor: "#ffffff14" }}>
                <th className="text-left py-4 font-normal"></th>
                <th className="text-left py-4">
                  <p className="font-semibold" style={{ color: "#C8F135" }}>
                    Essentials
                  </p>
                  <p className="text-white/40 font-normal text-xs mt-0.5">
                    {formatNaira(yearly ? plans[0].yearlyPrice! : plans[0].monthlyPrice!)}/month
                  </p>
                </th>
                <th className="text-left py-4">
                  <p className="font-semibold text-white">Teams</p>
                  <p className="text-white/40 font-normal text-xs mt-0.5">
                    {formatNaira(yearly ? plans[1].yearlyPrice! : plans[1].monthlyPrice!)}/month
                  </p>
                </th>
                <th className="text-left py-4">
                  <p className="font-semibold text-white">Enterprise</p>
                  <p className="text-white/40 font-normal text-xs mt-0.5">Let&apos;s talk</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Users", "1", "4", "Unlimited"],
                ["Repositories", "1", "2", "Unlimited"],
                ["Number of sources", "Unlimited", "Unlimited", "Unlimited"],
                ["Number of destinations", "Unlimited", "Unlimited", "Unlimited"],
                ["Figma as a source (Styles & Variables)", true, true, true],
                ["Tokens Studio as a source", true, true, true],
                ["GitHub as a destination", true, true, true],
                ["SDK", true, true, true],
                ["Specify CLI", true, true, true],
                ["Templates", true, true, true],
                ["Open source parsers", true, true, true],
                ["Private parsers", false, false, true],
                ["SSO", false, false, "Add-on"],
                ["CDN", false, false, "Add-on"],
                ["Support", "Chat", "Chat", "Account Manager"],
                ["Priority onboarding", false, false, true],
              ].map(([label, ess, team, ent]) => (
                <tr key={label as string} className="border-b" style={{ borderColor: "#ffffff0D" }}>
                  <td className="py-4 font-medium text-white">{label}</td>
                  <td className="py-4">
                    <Cell value={ess} accent="#C8F135" />
                  </td>
                  <td className="py-4">
                    <Cell value={team} accent="#C8F135" />
                  </td>
                  <td className="py-4">
                    <Cell value={ent} accent="white" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
    </div>
  );
}

function Cell({ value, accent }: { value: string | boolean; accent: string }) {
  if (value === true) {
    return (
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accent }}
      >
        <Check size={11} style={{ color: "#0A2E1A" }} strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-white/25">–</span>;
  }
  return <span className="text-white/70 text-sm">{value}</span>;
}