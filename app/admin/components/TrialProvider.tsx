"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TrialContextType {
  isTrial: boolean;
  trialDaysRemaining: number;
  isPremium: boolean;
  upgradeToPremium: () => void;
  canAccessFeature: (feature: string) => boolean;
  showUpgradePrompt: () => void;
  loading: boolean;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

// Features that are locked during trial
const LOCKED_FEATURES = [
  "custom_domain",
  "advanced_seo",
  "unlimited_staff",
  "api_access",
  "50gb_storage",
  "dedicated_manager",
  "email_marketing",
  "advanced_analytics",
  "cart_recovery",
  "promotions",
  "template_builder",
  "staff_management",
  "analytics",
];

// Features available during trial
const TRIAL_FEATURES = [
  "basic_store",
  "dashboard",
  "orders",
  "products",
  "customers",
  "categories",
  "basic_analytics",
  "email_support",
  "1_staff",
  "up_to_100_products",
  "whatsapp_link",
  "payment_gateways",
  "profile_settings",
  "store_settings",
  "support",
];

export function TrialProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTrial, setIsTrial] = useState(true);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(14);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTrialStatus = () => {
      try {
        const trialData = localStorage.getItem('marketpro_trial');
        
        if (trialData) {
          const data = JSON.parse(trialData);
          const startDate = new Date(data.startDate);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - startDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const remaining = Math.max(0, 14 - diffDays);
          
          setTrialDaysRemaining(remaining);
          setIsTrial(remaining > 0 && !data.isPremium);
          setIsPremium(data.isPremium || false);
        } else {
          // New trial - set start date
          const newTrial = {
            startDate: new Date().toISOString(),
            isPremium: false
          };
          localStorage.setItem('marketpro_trial', JSON.stringify(newTrial));
          setTrialDaysRemaining(14);
          setIsTrial(true);
          setIsPremium(false);
        }
      } catch (error) {
        console.error("Error checking trial status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkTrialStatus();
  }, []);

  const upgradeToPremium = () => {
    try {
      const trialData = {
        startDate: new Date().toISOString(),
        isPremium: true
      };
      localStorage.setItem('marketpro_trial', JSON.stringify(trialData));
      setIsPremium(true);
      setIsTrial(false);
      setTrialDaysRemaining(0);
      router.push('/admin');
    } catch (error) {
      console.error("Error upgrading:", error);
    }
  };

  const canAccessFeature = (feature: string) => {
    if (isPremium) return true;
    if (TRIAL_FEATURES.includes(feature)) return true;
    return false;
  };

  const showUpgradePrompt = () => {
    router.push('/admin/upgrade');
  };

  return (
    <TrialContext.Provider value={{
      isTrial,
      trialDaysRemaining,
      isPremium,
      upgradeToPremium,
      canAccessFeature,
      showUpgradePrompt,
      loading
    }}>
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
}