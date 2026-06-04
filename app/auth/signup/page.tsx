
"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen w-full flex overflow-hidden">

      {/* ── Left panel: branding (hidden on mobile) ── */}
<div 
  className="hidden lg:flex lg:w-[40%] xl:w-1/2 relative  flex-col justify-between p-8 xl:p-14"
  style={{ 
    backgroundImage: "[#F0F3FF], url('/signup bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
  }}
>
  {/* Animated blobs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#f0f3ffb2] blur-[100px] animate-pulse" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#f0f3ffb2] blur-[120px] animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px]" />
  </div>

  {/* Logo */}
  <div className="relative z-10">
    <span className="text-black text-[20px] font-bold tracking-tight">
      Market <span className="text-indigo-700">Pro</span>
    </span>
  </div>

  {/* Center illustration mock */}
  

  {/* Bottom text */}
  <div className="relative z-10">
    <div className="inline-block bg-[#3525CD1A] border border-indigo-400/30 text-[#3525CD] text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
      MarketPro Elite
    </div>
    <h2 className="text-[#111C2D] text-[90px] xl:text-5xl font-bold leading-tight mb-3">
      Build Your Store<br />Today
    </h2>
    <p className="text-[#464554] text-[14px] leading-relaxed max-w-xs">
      Launch a professional e-commerce website with powerful tools and beautiful themes.
    </p>
  </div>
</div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-5 sm:px-8 py-10 min-h-screen">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Market <span className="text-indigo-600">Pro</span>
          </span>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
              Market <span className="text-indigo-600">Pro</span>
            </h1>
            <p className="text-sm text-gray-400">Create your premium account.</p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 mt-0.5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                  agreed ? "bg-indigo-600 border-indigo-600" : "border-gray-300 group-hover:border-indigo-400"
                }`}
              >
                {agreed && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#4648D4] hover:underline font-medium">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[#4648D4] hover:underline font-medium">Privacy Policy</a>.
              </span>
            </label>

            {/* Submit */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm py-2.5 rounded-lg transition-all shadow-md shadow-indigo-200 mt-1"
            >
              Create Account
              <ArrowRight size={15} />
            </button>

            {/* Divider */}
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium py-2.5 rounded-lg transition-colors">
                {/* Google icon */}
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium py-2.5 rounded-lg transition-colors">
                {/* Apple icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Login link */}
            <p className="text-center text-xs text-gray-400 mt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#4648D4] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
