"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store, Mail, Phone, User, Lock, Check, ArrowRight,
  ArrowLeft, Building2, Globe, Shield, Sparkles,
  Crown, Users, Package, CreditCard, Truck, Headphones,
  Server, Database, Zap, ShoppingBag, Percent, Star
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface StoreInfo {
  name: string;
  subdomain: string;
  category: string;
  state: string;
  phone: string;
  email: string;
  address: string;
}

interface AdminAccount {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

const STORE_CATEGORIES = [
  "Fashion & Apparel",
  "Electronics",
  "Home & Living",
  "Beauty & Cosmetics",
  "Food & Beverage",
  "Health & Wellness",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Jewelry & Accessories",
  "Automotive",
  "Pet Supplies",
  "Other"
];

const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory",
  "Other"
];

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦15,000/month",
    features: [
      "Up to 100 products",
      "Basic analytics",
      "Email support",
      "1 staff account",
      "1 GB storage"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    price: "₦30,000/month",
    features: [
      "Up to 500 products",
      "Advanced analytics",
      "Priority support",
      "5 staff accounts",
      "10 GB storage",
      "Custom domain",
      "Email marketing tools"
    ],
    recommended: true,
    badge: "Most Popular"
  },
  {
    id: "business",
    name: "Business",
    price: "₦60,000/month",
    features: [
      "Unlimited products",
      "Enterprise analytics",
      "24/7 phone support",
      "Unlimited staff accounts",
      "50 GB storage",
      "Custom domain",
      "Advanced SEO tools",
      "API access",
      "Dedicated account manager"
    ]
  }
];


function MarketProLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="flex items-center px-3 mb-2 border-b border-gray-100 pb-4">
                        <img src="/Container.jpg" alt="Logo" className="h-9 w-auto" />
                </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Market<span className="text-[#7933DC] dark:text-[#7933DC]">Pro</span>
        </span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5 tracking-wider">
          SELL SMARTER · GROW FASTER
        </span>
      </div>
    </div>
  );
}


function StoreInfoStep({ data, onChange, onNext }: {
  data: StoreInfo;
  onChange: (data: StoreInfo) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof StoreInfo, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof StoreInfo, string>> = {};
    
    if (!data.name.trim()) newErrors.name = "Store name is required";
    if (!data.subdomain.trim()) newErrors.subdomain = "Subdomain is required";
    else if (!/^[a-z0-9-]+$/.test(data.subdomain)) {
      newErrors.subdomain = "Only lowercase letters, numbers, and hyphens allowed";
    }
    if (!data.category) newErrors.category = "Please select a category";
    if (!data.state) newErrors.state = "Please select your state";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(data.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!data.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Store Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tell us about your store. This will appear on your storefront.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Store Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Store size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Lagos Fashion Hub"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Store Subdomain <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="lagos-fashion"
              value={data.subdomain}
              onChange={(e) => onChange({ ...data, subdomain: e.target.value.toLowerCase() })}
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-l-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
            <span className="px-3 py-2.5 text-sm bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
              .marketpro.ng
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Your store will be at: <span className="font-mono">{data.subdomain || "your-store"}.marketpro.ng</span>
          </p>
          {errors.subdomain && <p className="text-xs text-red-500 mt-1">{errors.subdomain}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Store Category <span className="text-red-500">*</span>
            </label>
            <select
              value={data.category}
              onChange={(e) => onChange({ ...data, category: e.target.value })}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            >
              <option value="">Select category</option>
              {STORE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={data.state}
              onChange={(e) => onChange({ ...data, state: e.target.value })}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            >
              <option value="">Select state</option>
              {STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              placeholder="08012345678"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Store Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="info@store.com"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Business Address <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="123 Main Street, City, State"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none"
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}


function AdminAccountStep({ data, onChange, onBack, onNext }: {
  data: AdminAccount;
  onChange: (data: AdminAccount) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof AdminAccount, string>>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof AdminAccount, string>> = {};
    
    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(data.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(data.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create your admin account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This will be the store owner account with full access to your dashboard.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Alhaji Musa Ibrahim"
              value={data.fullName}
              onChange={(e) => onChange({ ...data, fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="owner@store.com"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              className="w-full pl-10 pr-12 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Repeat password"
              value={data.confirmPassword}
              onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Password requirements:</p>
          <ul className="text-xs text-blue-600 dark:text-blue-500 mt-1 space-y-0.5 list-disc list-inside">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

// Step 3: Plan Selection
function PlanStep({ selectedPlan, onSelect, onBack, onComplete }: {
  selectedPlan: string;
  onSelect: (planId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Choose your plan</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Start with a 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-lg"
                : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold rounded-full">
                {plan.badge || "RECOMMENDED"}
              </div>
            )}

            {selectedPlan === plan.id && (
              <Check size={18} className="absolute top-3 right-3 text-indigo-600" />
            )}

            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{plan.price}</p>

            <ul className="mt-3 space-y-1.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Check size={12} className="text-indigo-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={onComplete}
          disabled={!selectedPlan}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-all"
        >
          Start Free Trial <Sparkles size={16} />
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        14-day free trial. No credit card required. Cancel anytime
      </p>
    </div>
  );
}

// Step 4: Welcome / Success
function WelcomeStep({ storeData, adminData, planData }: {
  storeData: StoreInfo;
  adminData: AdminAccount;
  planData: string;
}) {
  const selectedPlan = PLANS.find(p => p.id === planData);

  return (
    <div className="text-center space-y-6 py-4">
      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto">
        <Sparkles size={36} className="text-green-600 dark:text-green-400" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Market Pro! 🎉</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Your store has been created successfully.
        </p>
      </div>

      <div className="max-w-sm mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 text-left space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Your Store Details</h3>
        <div className="space-y-1.5">
          <div>
            <p className="text-xs text-gray-400">Store URL</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {storeData.subdomain}.marketpro.ng
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Store Name</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {storeData.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Admin Email</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {adminData.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Plan</p>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {selectedPlan?.name} — 14-Day Free Trial
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto text-left space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Next steps to launch your store:
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0 mt-0.5">1</div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Add your products</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Upload your inventory</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0 mt-0.5">2</div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Set up payments</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Connect your payment gateway</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0 mt-0.5">3</div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Customize your store</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Make it look like yours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0 mt-0.5">4</div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Launch your store</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Go live and start selling!</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.location.href = '/admin'}
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const [storeData, setStoreData] = useState<StoreInfo>({
    name: "",
    subdomain: "",
    category: "",
    state: "",
    phone: "",
    email: "",
    address: "",
  });

  const [adminData, setAdminData] = useState<AdminAccount>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedPlan, setSelectedPlan] = useState("");

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StoreInfoStep
            data={storeData}
            onChange={setStoreData}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <AdminAccountStep
            data={adminData}
            onChange={setAdminData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <PlanStep
            selectedPlan={selectedPlan}
            onSelect={setSelectedPlan}
            onBack={() => setStep(2)}
            onComplete={() => setStep(4)}
          />
        );
      case 4:
        return (
          <WelcomeStep
            storeData={storeData}
            adminData={adminData}
            planData={selectedPlan}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3.5xl bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
        <div className="flex justify-center mb-8">
          <MarketProLogo />
        </div>

        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i <= step
                    ? "bg-[#7933DC] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {i}
              </div>
              {i < 4 && (
                <div
                  className={`w-55 h-0.5 mx-1 transition-all ${
                    i < step
                      ? "bg-[#7933DC]"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {renderStep()}
      </div>
    </div>
  );
}