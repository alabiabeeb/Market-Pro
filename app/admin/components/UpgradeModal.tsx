"use client";

import { X, Crown, Sparkles } from "lucide-react";
import { useTrial } from "./TrialProvider";
import { useRouter } from "next/navigation";

export function UpgradeModal({ onClose }: { onClose: () => void }) {
  const { upgradeToPremium } = useTrial();
  const router = useRouter();

  const handleUpgrade = () => {
    upgradeToPremium();
    onClose();
    router.push('/admin/upgrade');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 text-center relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg hover:bg-gray-100">
          <X size={18} className="text-gray-500" />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#C8F135]/20 flex items-center justify-center mx-auto mb-4">
          <Crown size={32} className="text-[#C8F135]" />
        </div>

        <h2 className="text-xl font-bold text-gray-900">Upgrade to Premium</h2>
        <p className="text-sm text-gray-500 mt-2">
          Unlock all features and take your store to the next level.
        </p>

        <div className="mt-6 space-y-2 text-left">
          {[
            "Custom Domain",
            "Advanced SEO Tools",
            "Unlimited Staff Accounts",
            "API Access",
            "50GB Storage",
            "Dedicated Account Manager"
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles size={14} className="text-[#C8F135]" />
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={handleUpgrade}
          className="w-full mt-6 py-3 rounded-lg text-sm font-semibold bg-[#C8F135] text-[#0A2E1A] hover:opacity-90 transition-all"
        >
          Upgrade Now — ₦30,000/month
        </button>

        <p className="text-[10px] text-gray-400 mt-3">
          14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}