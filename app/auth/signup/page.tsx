"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Store, Mail, Phone, User, Lock, Check, ArrowRight,
  ArrowLeft, Building2, Globe, Shield, Sparkles,
  Crown, Users, Package, CreditCard, Truck, Headphones,
  Server, Database, Zap, ShoppingBag, Percent, Star,
  Eye, EyeOff, Rocket, Gift, Clock, Lock as LockIcon,
  Infinity, Smartphone, BarChart2
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

// ── Data ──────────────────────────────────────────────────────────────────
const STORE_CATEGORIES = [
  "Fashion & Apparel", "Electronics", "Home & Living", "Beauty & Cosmetics",
  "Food & Beverage", "Health & Wellness", "Sports & Outdoors", "Books & Media",
  "Toys & Games", "Jewelry & Accessories", "Automotive", "Pet Supplies", "Other"
];

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
  "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun",
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara", "Federal Capital Territory", "Other"
];

// ── Free Features ──
const FREE_FEATURES = [
  { icon: Infinity, label: "Unlimited Products", color: "#C8F135" },
  { icon: ShoppingBag, label: "Unlimited Orders", color: "#4F46E5" },
  { icon: Smartphone, label: "Online Store + POS", color: "#10b981" },
  { icon: CreditCard, label: "PayStack Payments", color: "#f97316" },
  { icon: Users, label: "Staff Accounts", color: "#8b5cf6" },
  { icon: Package, label: "Inventory Management", color: "#06b6d4" },
  { icon: BarChart2, label: "Analytics Dashboard", color: "#ec4899" },
  { icon: Headphones, label: "24/7 Support", color: "#14b8a6" },
];

// ── Locked Features (Pro/Business) ──
const LOCKED_FEATURES = [
  { icon: Crown, label: "Custom Domain", color: "#C8F135" },
  { icon: Rocket, label: "Advanced SEO Tools", color: "#4F46E5" },
  { icon: Users, label: "Unlimited Staff Accounts", color: "#10b981" },
  { icon: Server, label: "API Access", color: "#f97316" },
  { icon: Database, label: "50GB Storage", color: "#8b5cf6" },
  { icon: Shield, label: "Dedicated Account Manager", color: "#ec4899" },
];

// ── Step 1: Free Plan / Pricing Selection ──────────────────────────────
function FreePlanStep({ onStartTrial }: { onStartTrial: () => void }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8F135]/30 text-[#C8F135] text-xs font-semibold mb-4">
          <Gift size={14} /> Completely Free
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
          No monthly fees. <br />
          <span style={{ color: "#C8F135" }}>No setup costs.</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          21 days free trial 
        </p>
      </div>

      {/* Free Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FREE_FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center hover:border-[#C8F135]/50 transition-all">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5" style={{ backgroundColor: item.color + "20" }}>
                <Icon size={14} style={{ color: item.color }} />
              </div>
              <p className="text-[10px] font-medium text-gray-600">{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Locked Features Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon size={14} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-500">Upgrade to unlock:</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {LOCKED_FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1">
                <Icon size={11} className="text-gray-400" />
                <span className="text-[10px] text-gray-500">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStartTrial}
        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}
      >
        Start Free Trial → <Sparkles size={16} className="inline ml-1" />
      </button>

      <p className="text-center text-[10px] text-gray-400">
        14-day free trial · No credit card required · Cancel anytime
      </p>
    </div>
  );
}

// ── Step 2: Store Information ────────────────────────────────────────────
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
        <div className="flex items-center gap-2 mb-1">
          <Store size={18} className="text-[#0A2E1A]" />
          <h2 className="text-xl font-bold text-gray-900">Store Information</h2>
        </div>
        <p className="text-sm text-gray-500">Tell us about your store</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Store Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Store size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Lagos Fashion Hub"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Store Subdomain <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="lagos-fashion"
              value={data.subdomain}
              onChange={(e) => onChange({ ...data, subdomain: e.target.value.toLowerCase() })}
              className={`flex-1 px-4 py-2.5 text-sm rounded-l-lg border transition-all outline-none focus:ring-2 ${
                errors.subdomain
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
            <span className="px-3 py-2.5 text-sm bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg text-gray-600 whitespace-nowrap">
              .marketpro.ng
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your store will be at: <span className="font-mono">{data.subdomain || "your-store"}.marketpro.ng</span>
          </p>
          {errors.subdomain && <p className="text-xs text-red-500 mt-1">{errors.subdomain}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={data.category}
              onChange={(e) => onChange({ ...data, category: e.target.value })}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            >
              <option value="">Select category</option>
              {STORE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={data.state}
              onChange={(e) => onChange({ ...data, state: e.target.value })}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.state
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
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
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              placeholder="08012345678"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Store Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="info@store.com"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Business Address <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="123 Main Street, City, State"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            rows={2}
            className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 resize-none ${
              errors.address
                ? "border-red-300 focus:ring-red-100 bg-red-50"
                : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
            }`}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

// ── Step 3: Admin Account ───────────────────────────────────────────────
function AdminAccountStep({ data, onChange, onBack, onNext }: {
  data: AdminAccount;
  onChange: (data: AdminAccount) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof AdminAccount, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="flex items-center gap-2 mb-1">
          <User size={18} className="text-[#0A2E1A]" />
          <h2 className="text-xl font-bold text-gray-900">Admin Account</h2>
        </div>
        <p className="text-sm text-gray-500">Create your store owner account</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Alhaji Musa Ibrahim"
              value={data.fullName}
              onChange={(e) => onChange({ ...data, fullName: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="owner@store.com"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              className={`w-full pl-10 pr-12 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat password"
              value={data.confirmPassword}
              onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
              className={`w-full pl-10 pr-12 py-2.5 text-sm rounded-lg border transition-all outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-100 bg-red-50"
                  : "border-gray-200 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-xs font-medium text-blue-700">Password requirements:</p>
          <ul className="text-xs text-blue-600 mt-1 space-y-0.5 list-disc list-inside">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}
        >
          Create Account <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

// ── Step 4: Welcome / Success with Trial Status ─────────────────────────
function WelcomeStep({ storeData, adminData, onDashboard }: {
  storeData: StoreInfo;
  adminData: AdminAccount;
  onDashboard: () => void;
}) {
  return (
    <div className="text-center space-y-6 py-4">
      <div className="w-20 h-20 rounded-full bg-[#C8F135]/20 flex items-center justify-center mx-auto">
        <Rocket size={36} style={{ color: "#C8F135" }} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Market Pro! 🎉</h2>
        <p className="text-gray-500 mt-1">
          Your store has been created successfully.
        </p>
      </div>

      {/* Trial Status Banner */}
      <div className="max-w-sm mx-auto bg-gradient-to-r from-[#0A2E1A] to-[#153323] rounded-xl p-4 text-white border border-[#C8F135]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#C8F135]" />
            <div className="text-left">
              <p className="text-xs font-medium">14-Day Free Trial</p>
              <p className="text-[10px] text-white/60">Unlock full features anytime</p>
            </div>
          </div>
          <button className="px-3 py-1 rounded-lg text-[10px] font-semibold" style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}>
            Upgrade Now
          </button>
        </div>
      </div>

      <div className="max-w-sm mx-auto bg-gray-50 rounded-xl p-5 text-left space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Store Details</h3>
        <div className="space-y-1.5">
          <div>
            <p className="text-xs text-gray-400">Store URL</p>
            <p className="text-sm font-semibold text-gray-900">
              {storeData.subdomain}.marketpro.ng
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Store Name</p>
            <p className="text-sm font-semibold text-gray-900">
              {storeData.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Admin Email</p>
            <p className="text-sm font-semibold text-gray-900">
              {adminData.email}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto text-left space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Next steps:
        </h3>
        <div className="space-y-2.5">
          {[
            "Add your products",
            "Set up payments",
            "Customize your store",
            "Launch your store"
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}>
                {i + 1}
              </div>
              <p className="text-sm font-medium text-gray-800">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onDashboard}
        className="px-8 py-3 rounded-lg text-sm font-semibold transition-all"
        style={{ backgroundColor: "#C8F135", color: "#0A2E1A" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

// ── Main Signup Page ─────────────────────────────────────────────────────
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

  const handleGoToDashboard = () => {
    window.location.href = '/admin';
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FreePlanStep onStartTrial={() => setStep(2)} />;
      case 2:
        return (
          <StoreInfoStep
            data={storeData}
            onChange={setStoreData}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <AdminAccountStep
            data={adminData}
            onChange={setAdminData}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <WelcomeStep
            storeData={storeData}
            adminData={adminData}
            onDashboard={handleGoToDashboard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── LEFT — Branding ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden"
        style={{ backgroundColor: "#0A2E1A" }}>

        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #C8F135 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "#C8F135" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-15" style={{ backgroundColor: "#C8F135" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <img src="/logo.png" alt="MarketPro" className="h-20 w-30" />
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#C8F135" }}>
              Start your journey
            </p>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1]">
              Launch your store<br />
              <span style={{ color: "#C8F135" }}>in minutes.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-xs">
              Join thousands of Nigerian entrepreneurs already selling on Market Pro.
            </p>
          </div>

          {/* Stats Card */}
          <div className="rounded-2xl border border-white/10 p-5 space-y-4" style={{ backgroundColor: "#0F3D22" }}>
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/40">Live activity</p>
              <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "#C8F135" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#C8F135" }} />
                LIVE
              </span>
            </div>
            {[
              { name: "Emeka T.",  event: "New store launched",   time: "2s ago" },
              { name: "Ngozi A.",  event: "Payment confirmed",     time: "1m ago" },
              { name: "Hauwa M.",  event: "First order received ✓", time: "4m ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                  style={{ backgroundColor: ["#4F46E5","#10b981","#f97316"][i] }}>
                  {a.name.slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 font-medium truncate">{a.name}</p>
                  <p className="text-[10px] text-white/40 truncate">{a.event}</p>
                </div>
                <span className="text-[10px] text-white/25 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-xs text-white/25">© 2026 MarketPro · Made in Nigeria 🇳🇬</p>
        </div>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-5 sm:px-8 py-10">

        {/* Mobile logo */}
        <div className="lg:hidden mb-6">
          <Link href="/">
            <img src="/logo.png" alt="MarketPro" className="h-30 w-40" />
          </Link>
        </div>

        <div className="w-full max-w-xl space-y-6">

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= step
                      ? "bg-[#0A2E1A] text-[#C8F135]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-16 sm:w-20 h-0.5 mx-1 transition-all ${
                      i < step
                        ? "bg-[#0A2E1A]"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            {renderStep()}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {["No BVN required", "Free to start", "CAC verified"].map(b => (
              <div key={b} className="flex items-center gap-1">
                <Check size={11} className="text-green-500" />
                <span className="text-[10px] text-gray-400">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}