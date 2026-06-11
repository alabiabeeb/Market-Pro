"use client";

import { useState, useRef } from "react";
import { User, Lock, AlertTriangle, Camera, Eye, EyeOff, Moon, Sun, Monitor, Check, X } from "lucide-react";
import  {useTheme} from "@/./app/admin/components/ThemeProvider";


// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useState(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); });
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl ${type === "success" ? "bg-gray-900 dark:bg-gray-700" : "bg-red-600"}`}>
      {type === "success" ? <Check size={13} /> : <X size={13} />}
      {message}
    </div>
  );
}

// ── Delete Account Modal ───────────────────────────────────────────────────
function DeleteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Delete Account?</h3>
          <p className="text-xs text-gray-400 mt-1">This will permanently remove your account and all associated data. This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
          <button className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileSettingsPage() {
  const { theme, setTheme } = useTheme();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [showOld, setShowOld]       = useState(false);
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast]           = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [avatarUrl, setAvatarUrl]   = useState("/avatar.jpg");
  const [passwordError, setPasswordError] = useState("");

  const [profile, setProfile] = useState({
    name: "Fashion Hub Admin",
    email: "admin@fashionhubpro.com",
    phone: "+1 (555) 000-1234",
    bio: "Managing the digital storefront and growth strategy for Fashion Hub Pro.",
  });

  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      setToast({ msg: "Name and email are required.", type: "error" });
      return;
    }
    setToast({ msg: "Profile saved successfully!", type: "success" });
  };

  const handleSavePassword = () => {
    setPasswordError("");
    if (!passwords.old) { setPasswordError("Current password is required."); return; }
    if (passwords.new.length < 8) { setPasswordError("New password must be at least 8 characters."); return; }
    if (passwords.new !== passwords.confirm) { setPasswordError("Passwords do not match."); return; }
    setPasswords({ old: "", new: "", confirm: "" });
    setToast({ msg: "Password updated!", type: "success" });
  };

  const INPUT = "w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all";

  const themeOptions = [
    { id: "light" as const,  label: "Light",  icon: Sun,     desc: "Clean and bright interface" },
    { id: "dark"  as const,  label: "Dark",   icon: Moon,    desc: "Easy on the eyes at night" },
    { id: "system" as const, label: "System", icon: Monitor, desc: "Follows your device setting" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">

      {/* Page title */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Profile Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage your personal account information</p>
      </div>

      {/* ── Personal Information ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <User size={15} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Personal Information</h2>
        </div>
        <div className="p-5 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-indigo-100 overflow-hidden border-2 border-indigo-200">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"; }} />
              </div>
              <button onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm hover:bg-indigo-700 transition-colors">
                <Camera size={11} className="text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
              <button onClick={() => avatarInputRef.current?.click()} className="text-xs text-indigo-600 font-medium mt-1 hover:underline">Change photo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Full Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email Address</label>
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={INPUT} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Phone Number</label>
            <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={INPUT} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Bio</label>
            <textarea rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
              className={INPUT + " resize-none"} />
          </div>

          <div className="flex justify-end">
            <button onClick={handleSaveProfile} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Appearance / Theme ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {theme === "dark" ? <Moon size={15} className="text-indigo-500" /> : <Sun size={15} className="text-indigo-500" />}
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Appearance</h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3">Choose your preferred theme</p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map(({ id, label, icon: Icon, desc }) => {
                const isActive = theme === id || (id === "system" && !["light","dark"].includes(theme));
                return (
                  <button key={id} onClick={() => {
                    if (id === "system") {
                      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                      setTheme(sys);
                    } else {
                      setTheme(id);
                    }
                  }}
                    className={`relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      isActive
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                        : "border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}>
                    {/* Preview box */}
                    <div className={`w-full h-12 rounded-lg border flex items-center justify-center gap-1 ${
                      id === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : id === "light"
                        ? "bg-white border-gray-200"
                        : "bg-gradient-to-r from-white to-gray-900 border-gray-300"
                    }`}>
                      <div className={`w-2 h-6 rounded-sm ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                      <div className="flex-1 mx-1 space-y-1">
                        <div className={`h-1.5 rounded-full ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                        <div className={`h-1.5 rounded-full w-2/3 ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Icon size={12} className={isActive ? "text-indigo-600" : "text-gray-400"} />
                        <span className={`text-xs font-semibold ${isActive ? "text-indigo-600" : "text-gray-600 dark:text-gray-400"}`}>{label}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{desc}</p>
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                        <Check size={9} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live toggle switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-indigo-50"}`}>
                {theme === "dark" ? <Moon size={15} className="text-indigo-400" /> : <Sun size={15} className="text-indigo-500" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {theme === "dark" ? "Dark Mode Active" : "Light Mode Active"}
                </p>
                <p className="text-[10px] text-gray-400">Click to toggle</p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${theme === "dark" ? "translate-x-5" : "translate-x-0.5"}`}>
                <div className="w-full h-full flex items-center justify-center">
                  {theme === "dark" ? <Moon size={10} className="text-indigo-600" /> : <Sun size={10} className="text-yellow-500" />}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <Lock size={15} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Change Password</h2>
        </div>
        <div className="p-5 space-y-4">
          {passwordError && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900">{passwordError}</p>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Old Password</label>
            <div className="relative">
              <input type={showOld ? "text" : "password"} value={passwords.old} onChange={e => setPasswords({ ...passwords, old: e.target.value })}
                placeholder="••••••••" className={INPUT + " pr-10"} />
              <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "New Password", key: "new", show: showNew, setShow: setShowNew },
              { label: "Confirm New Password", key: "confirm", show: showConfirm, setShow: setShowConfirm },
            ].map(({ label, key, show, setShow }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
                <div className="relative">
                  <input type={show ? "text" : "password"} value={(passwords as any)[key]}
                    onChange={e => setPasswords({ ...passwords, [key]: e.target.value })}
                    placeholder="••••••••" className={INPUT + " pr-10"} />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={handleSavePassword} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/20">
          <AlertTriangle size={15} className="text-red-500" />
          <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Permanently remove your account and all associated data. This action cannot be undone.
          </p>
          <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <p className="text-[11px] text-gray-400">© 2024 Market Pro SaaS. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {["Privacy Policy", "Terms of Service", "API Status", "Contact Support"].map(l => (
            <a key={l} href="#" className="text-[11px] text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{l}</a>
          ))}
        </div>
      </div>

      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}