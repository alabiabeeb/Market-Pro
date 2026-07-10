"use client";

import { useTrial } from "../components/TrialProvider";
import { Crown, Sparkles, Check, X, Zap, Rocket, Gift,Users,Server,Database,Shield,Mail,BarChart2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PREMIUM_FEATURES = [
  { icon: Crown, label: "Custom Domain", desc: "Connect your own domain" },
  { icon: Rocket, label: "Advanced SEO Tools", desc: "Rank higher in search" },
  { icon: Users, label: "Unlimited Staff", desc: "Add unlimited team members" },
  { icon: Server, label: "API Access", desc: "Connect third-party apps" },
  { icon: Database, label: "50GB Storage", desc: "Store more products & images" },
  { icon: Shield, label: "Dedicated Manager", desc: "Personal support" },
  { icon: Mail, label: "Email Marketing", desc: "Send campaigns to customers" },
  { icon: BarChart2, label: "Advanced Analytics", desc: "Deep insights & reports" },
];

export default function UpgradePage() {
  const { upgradeToPremium, isPremium, isTrial, trialDaysRemaining } = useTrial();

  if (isPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">You're Already Premium! 🎉</h2>
        <p className="text-gray-500 mt-2">You have full access to all features.</p>
        <Link href="/admin" className="mt-4 px-6 py-2 rounded-lg text-white bg-[#0A2E1A] hover:bg-[#060F09]">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* Back button */}
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A2E1A] transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8F135]/30 text-[#C8F135] text-xs font-semibold">
          <Sparkles size={14} /> Upgrade to Premium
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Unlock Full Access
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Get all the features you need to grow your business
        </p>
        {isTrial && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
            ⏳ Your trial ends in {trialDaysRemaining} days
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PREMIUM_FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center hover:border-[#C8F135]/50 transition-all">
              <div className="w-10 h-10 rounded-full bg-[#C8F135]/20 flex items-center justify-center mx-auto mb-2">
                <Icon size={18} className="text-[#C8F135]" />
              </div>
              <p className="text-xs font-semibold text-gray-700">{item.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          {
            name: "Starter",
            price: "₦15,000",
            period: "/month",
            features: ["Up to 100 products", "Basic analytics", "Email support", "1 staff account", "1 GB storage"],
            cta: "Start Trial",
            popular: false
          },
          {
            name: "Professional",
            price: "₦30,000",
            period: "/month",
            features: ["Up to 500 products", "Advanced analytics", "Priority support", "5 staff accounts", "10 GB storage", "Custom domain", "Email marketing tools"],
            cta: "Start Free Trial",
            popular: true
          },
          {
            name: "Business",
            price: "₦60,000",
            period: "/month",
            features: ["Unlimited products", "Enterprise analytics", "24/7 phone support", "Unlimited staff accounts", "50 GB storage", "Custom domain", "Advanced SEO tools", "API access", "Dedicated account manager"],
            cta: "Contact Sales",
            popular: false
          }
        ].map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border-2 p-6 transition-all ${
              plan.popular
                ? "border-[#C8F135] shadow-lg bg-white"
                : "border-gray-200 hover:border-[#C8F135]/50 bg-white"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#C8F135] text-[#0A2E1A]">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-black text-[#0A2E1A]">{plan.price}</span>
              <span className="text-sm text-gray-400">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-[#C8F135] shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={upgradeToPremium}
              className={`w-full mt-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                plan.popular
                  ? "bg-[#C8F135] text-[#0A2E1A] hover:opacity-90"
                  : "bg-[#0A2E1A] text-[#C8F135] hover:bg-[#060F09]"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        14-day free trial. No credit card required. Cancel anytime.
      </p>
    </div>
  );
}