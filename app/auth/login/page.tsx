"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Check, AlertCircle, X } from "lucide-react";
import { login, User } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  
  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"error" | "success">("error");
  const [showLoader, setShowLoader] = useState(false);

  const set = (k: string, v: string | boolean) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const showNotification = (message: string, type: "error" | "success" = "error") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  const handleSubmit = async () => {
    // Validate
    const e: Record<string, string> = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password.trim()) e.password = "Password is required";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Show loader
    setShowLoader(true);
    setLoading(true);

    // ─── CALL THE AUTH SERVICE ───
    const result = await login(form.email, form.password);

    if (result.success && result.user) {
      // Store user in localStorage if "Remember me" is checked
      if (form.remember) {
        localStorage.setItem('user', JSON.stringify(result.user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(result.user));
      }

      // Success - redirect to dashboard
      setTimeout(() => {
        setShowLoader(false);
        setLoading(false);
        router.push("/admin");
      }, 500);

    } else {
      // Show error
      setShowLoader(false);
      setLoading(false);
      showNotification(
        `❌ ${result.error || "Invalid email or password. Please try again."}`,
        "error"
      );
    }
  };

  const handleForgotPassword = () => {
    setShowPopup(false);
    router.push("/forgot-password");
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Full Screen Loader with Blur ── */}
      {showLoader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-[#C8F135] animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#C8F135]/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Logging you in...
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please wait while we prepare your dashboard
                </p>
              </div>

              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#C8F135] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Error Popup Notification ── */}
      {showPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9998] w-full max-w-md px-4 animate-in slide-in-from-top-5 duration-300">
          <div className={`rounded-2xl p-4 shadow-2xl border flex items-start gap-3 ${
            popupType === "error"
              ? "bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800"
              : "bg-green-50 dark:bg-green-950/80 border-green-200 dark:border-green-800"
          }`}>
            <div className="shrink-0 mt-0.5">
              {popupType === "error" ? (
                <AlertCircle size={20} className="text-red-500" />
              ) : (
                <Check size={20} className="text-green-500" />
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                popupType === "error"
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
              }`}>
                {popupMessage}
              </p>
              {popupType === "error" && (
                <button
                  onClick={handleForgotPassword}
                  className="mt-2 text-xs font-semibold text-[#C8F135] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* ── LEFT — branding ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden"
        style={{ backgroundColor: "#0A2E1A" }}>

        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #C8F135 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "#C8F135" }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-15" style={{ backgroundColor: "#C8F135" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <img src="/logo.png" alt="MarketPro" className="h-9 w-auto" />
          </Link>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#C8F135" }}>
              Welcome back
            </p>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1]">
              Your store<br />
              <span style={{ color: "#C8F135" }}>never sleeps.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-xs">
              Orders, payments, and customers — all waiting for you inside.
            </p>
          </div>

          {/* Live stats card */}
          <div className="rounded-2xl border border-white/10 p-5 space-y-4" style={{ backgroundColor: "#0F3D22" }}>
            <div className="flex items-center justify-between">
              <p className="text-xs text-white/40">Live activity</p>
              <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "#C8F135" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#C8F135" }} />
                LIVE
              </span>
            </div>
            {[
              { name: "Emeka T.",  event: "New order — ₦45,000",   time: "2s ago" },
              { name: "Ngozi A.",  event: "Payment confirmed",       time: "1m ago" },
              { name: "Hauwa M.", event: "Order delivered ✓",        time: "4m ago" },
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

      {/* ── RIGHT — form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-5 sm:px-8 py-10">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/"><img src="/logo.png" alt="MarketPro" className="h-8 w-auto" /></Link>
        </div>

        <div className="w-full max-w-sm space-y-6">

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100">Log in to your store</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">Enter your details to continue</p>
          </div>

          {/* Form card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4">

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-100 bg-red-50 dark:bg-red-950/30"
                    : "border-gray-200 dark:border-gray-700 focus:ring-indigo-100 focus:border-indigo-400"
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">Password</label>
                <button
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-[#C8F135] hover:underline font-medium"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all outline-none focus:ring-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pr-10 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-100 bg-red-50 dark:bg-red-950/30"
                      : "border-gray-200 dark:border-gray-700 focus:ring-indigo-100 focus:border-indigo-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div onClick={() => set("remember", !form.remember)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  form.remember ? "bg-[#C8F135] border-[#C8F135]" : "border-gray-300 dark:border-gray-600 group-hover:border-[#C8F135]"
                }`}>
                {form.remember && <Check size={9} className="text-[#0A2E1A]" />}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Keep me logged in</span>
            </label>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C8F135] hover:bg-[#B8E025] disabled:bg-[#A8D015] text-[#0A2E1A] text-sm font-bold transition-all shadow-md shadow-[#C8F135]/30 active:scale-[0.98]"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-[#0A2E1A]/40 border-t-[#0A2E1A] rounded-full animate-spin" />
                : <>Log in <ArrowRight size={15} /></>}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800" /></div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-400 dark:text-gray-500">OR</span>
              </div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            New to MarketPro?{" "}
            <Link href="/auth/signup" className="text-[#C8F135] font-semibold hover:underline">Create a free account</Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 pt-2">
            {["No BVN required", "Free to start", "CAC verified"].map(b => (
              <div key={b} className="flex items-center gap-1">
                <Check size={11} className="text-green-500" />
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{b}</span>
              </div>
            ))}
          </div>

          {/* Demo credentials hint */}
          <div className="text-center text-[10px] text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-3">
            <p>Demo: demo@marketpro.ng / any password (min 6 chars)</p>
          </div>
        </div>
      </div>
    </div>
  );
}