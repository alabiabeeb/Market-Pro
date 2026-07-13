"use client";

import Link from "next/link";
import { 
  Shield, 
  CheckCircle, 
  Lock, 
  Users, 
  Building2,
  CreditCard,
  Smartphone,
  Globe,
  ArrowRight
} from "lucide-react";

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      
      {/* Hero */}
      <section className="py-20 bg-[#0A2E1A] text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8F135]/30 text-[#C8F135] text-xs font-semibold mb-6">
            <Shield size={14} />
            YOUR SECURITY IS OUR PRIORITY
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Built Different.
            <br />
            <span className="text-[#C8F135]">Built Trustworthy.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We don't ask for your BVN. Your data stays yours. Your business stays secure.
          </p>
        </div>
      </section>

      {/* No BVN Promise */}
      <section className="py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-[#C8F135]/10 dark:bg-[#C8F135]/5 rounded-2xl p-8 border-2 border-[#C8F135] text-center">
            <div className="w-16 h-16 rounded-full bg-[#C8F135] flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#0A2E1A]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A2E1A] dark:text-white mb-2">
              We NEVER Ask For Your BVN
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Your BVN is private. We use alternative verification methods that protect your identity while keeping your business secure.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl font-bold text-[#0A2E1A] dark:text-white text-center mb-12">
            How We Protect You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Data Encryption",
                desc: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption."
              },
              {
                icon: Users,
                title: "Tiered Verification",
                desc: "Start with just email and phone. Upgrade to NIN or Voter's Card for higher limits. No BVN needed."
              },
              {
                icon: Lock,
                title: "2FA Protection",
                desc: "Two-factor authentication adds an extra layer of security to your account."
              },
              {
                icon: Building2,
                title: "CAC Registered",
                desc: "We're a properly registered Nigerian company. You can verify our legitimacy anytime."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-[#C8F135]/20 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[#0A2E1A] dark:text-[#C8F135]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0A2E1A] dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F4EE] dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-[#0A2E1A] dark:text-white mb-3">
            Ready to build your store?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Join thousands of Nigerian merchants who trust Market Pro.
          </p>
          <Link 
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2E1A] text-[#C8F135] rounded-lg font-semibold hover:bg-[#060F09] transition-colors"
          >
            Start Your Store Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}