"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, 
  Lock, 
  AlertTriangle, 
  Camera, 
  Eye, 
  EyeOff, 
  Moon, 
  Sun, 
  Monitor, 
  Check, 
  X, 
  Loader2 
} from "lucide-react";
import { useTheme } from "@/app/admin/components/ThemeProvider";
// ─── IMPORTS ──────────────────────────────────────────────────────────────
import { 
  changePassword, 
  getCurrentUser, 
  logout,
  updateProfile,
  type User 
} from "@/lib/auth";
// ──────────────────────────────────────────────────────────────────────────

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  
  return (
    <div className={`fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl transition-all duration-300 ${
      type === "success" ? "bg-[#0A2E1A] border border-[#C8F135]/30" : "bg-red-600"
    }`}>
      {type === "success" ? <Check size={13} className="text-[#C8F135]" /> : <X size={13} />}
      {message}
    </div>
  );
}

// ── Delete Account Modal ───────────────────────────────────────────────────
function DeleteModal({ onClose, onConfirm, isLoading }: { onClose: () => void; onConfirm: () => void; isLoading: boolean }) {
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
          <button onClick={onConfirm} disabled={isLoading} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-semibold flex items-center justify-center gap-2">
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // ── State ──
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("/avatar.jpg");
  const [isLoading, setIsLoading] = useState(false);

  // ── Profile Data ──
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "+234 800 000 0000",
    bio: "",
  });

  // ── Password Data ──
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // ── Load Current User ──
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setProfile({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "Managing the digital storefront.",
        phone: user.phone || "+234 800 000 0000",
      });
      if (user.avatar) setAvatarUrl(user.avatar);
    }
  }, []);

  // ── Avatar ──
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ── Save Profile ──
  const handleSaveProfile = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      setToast({ msg: "Name and email are required.", type: "error" });
      return;
    }

    if (!currentUser) {
      setToast({ msg: "You must be logged in.", type: "error" });
      return;
    }

    setIsLoading(true);
    
    const result = await updateProfile(currentUser.id, {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      phone: profile.phone,
    });

    setIsLoading(false);

    if (result.success && result.user) {
      setCurrentUser(result.user as User);
      setToast({ msg: "Profile saved successfully!", type: "success" });
    } else {
      setToast({ msg: result.error || "Failed to save profile.", type: "error" });
    }
  };

  // ── Change Password ──
  const handleSavePassword = async () => {
    setPasswordError("");
    setPasswordSuccess(false);

    // 1. Validate
    if (!passwords.old) {
      setPasswordError("Current password is required.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!currentUser) {
      setPasswordError("You must be logged in to change your password.");
      return;
    }

    setIsLoading(true);

    const result = await changePassword(
      currentUser.id,
      passwords.old,
      passwords.new
    );

    setIsLoading(false);

    if (result.success) {
      setPasswordSuccess(true);
      setPasswords({ old: "", new: "", confirm: "" });
      setToast({ msg: "Password updated successfully! Please login again.", type: "success" });
      
      setTimeout(async () => {
        await logout();
        router.push("/auth/login");
      }, 3000);
    } else {
      setPasswordError(result.error || "Failed to update password.");
    }
  };

  // ── Delete Account ──
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowDeleteModal(false);
    setToast({ msg: "Account deleted successfully.", type: "success" });
    setTimeout(async () => {
      await logout();
      router.push("/auth/login");
    }, 2000);
  };

  // ── Styles ──
  const INPUT = "w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] dark:border-gray-700 rounded-lg bg-white dark:bg-[#08120C] text-gray-800 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] transition-all";

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
          <UserIcon size={15} className="text-[#0A2E1A]" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Personal Information</h2>
        </div>
        <div className="p-5 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-[#F7F4EE] overflow-hidden border-2 border-[#E5E7EB]">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"; }} />
              </div>
              <button onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-[#0A2E1A] rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm hover:bg-[#060F09] transition-colors">
                <Camera size={11} className="text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
              <button onClick={() => avatarInputRef.current?.click()} className="text-xs text-[#0A2E1A] font-medium mt-1 hover:underline">Change photo</button>
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
            <button 
              onClick={handleSaveProfile} 
              disabled={isLoading}
              className="bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 text-[#C8F135] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Appearance / Theme ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          {theme === "dark" ? <Moon size={15} className="text-[#0A2E1A]" /> : <Sun size={15} className="text-[#0A2E1A]" />}
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
                        ? "border-[#0A2E1A] bg-[#F7F4EE] dark:bg-[#0F1D14]"
                        : "border-gray-100 dark:border-gray-800 hover:border-[#C8F135] dark:hover:border-[#C8F135] hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}>
                    <div className={`w-full h-12 rounded-lg border flex items-center justify-center gap-1 ${
                      id === "dark"
                        ? "bg-gray-900 border-gray-700"
                        : id === "light"
                        ? "bg-white border-gray-200"
                        : "bg-linear-to-r from-white to-gray-900 border-gray-300"
                    }`}>
                      <div className={`w-2 h-6 rounded-sm ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                      <div className="flex-1 mx-1 space-y-1">
                        <div className={`h-1.5 rounded-full ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                        <div className={`h-1.5 rounded-full w-2/3 ${id === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Icon size={12} className={isActive ? "text-[#0A2E1A]" : "text-gray-400"} />
                        <span className={`text-xs font-semibold ${isActive ? "text-[#0A2E1A]" : "text-gray-600 dark:text-gray-400"}`}>{label}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{desc}</p>
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-[#0A2E1A] rounded-full flex items-center justify-center">
                        <Check size={9} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-[#F7F4EE]"}`}>
                {theme === "dark" ? <Moon size={15} className="text-[#C8F135]" /> : <Sun size={15} className="text-[#0A2E1A]" />}
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
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-[#0A2E1A]" : "bg-gray-300"}`}
              >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${theme === "dark" ? "translate-x-5" : "translate-x-0.5"}`}>
                <div className="w-full h-full flex items-center justify-center">
                  {theme === "dark" ? <Moon size={10} className="text-[#C8F135]" /> : <Sun size={10} className="text-yellow-500" />}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <Lock size={15} className="text-[#0A2E1A]" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Change Password</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Error Message */}
          {passwordError && (
            <div className="flex items-start gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span>{passwordError}</span>
            </div>
          )}

          {/* Success Message */}
          {passwordSuccess && (
            <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 dark:bg-green-950/40 px-3 py-2 rounded-lg border border-green-100 dark:border-green-900">
              <Check size={14} className="shrink-0 mt-0.5" />
              <span>Password updated successfully! Redirecting to login...</span>
            </div>
          )}

          {/* Old Password */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Current Password</label>
            <div className="relative">
              <input 
                type={showOld ? "text" : "password"} 
                value={passwords.old} 
                onChange={e => setPasswords({ ...passwords, old: e.target.value })}
                placeholder="Enter your current password" 
                className={INPUT + " pr-10"} 
                disabled={passwordSuccess}
              />
              <button 
                type="button" 
                onClick={() => setShowOld(!showOld)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">New Password</label>
              <div className="relative">
                <input 
                  type={showNew ? "text" : "password"} 
                  value={passwords.new}
                  onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Min. 8 characters" 
                  className={INPUT + " pr-10"} 
                  disabled={passwordSuccess}
                />
                <button 
                  type="button" 
                  onClick={() => setShowNew(!showNew)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input 
                  type={showConfirm ? "text" : "password"} 
                  value={passwords.confirm}
                  onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Repeat new password" 
                  className={INPUT + " pr-10"} 
                  disabled={passwordSuccess}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirm(!showConfirm)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {passwords.new && passwords.new.length > 0 && !passwordSuccess && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    passwords.new.length < 6 ? "bg-red-500 w-1/3" :
                    passwords.new.length < 8 ? "bg-yellow-500 w-2/3" :
                    "bg-green-500 w-full"
                  }`} 
                />
              </div>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">
                {passwords.new.length < 6 ? "Weak" :
                 passwords.new.length < 8 ? "Medium" :
                 "Strong"}
              </span>
            </div>
          )}

          <div className="flex justify-end">
            <button 
              onClick={handleSavePassword} 
              disabled={isLoading || passwordSuccess}
              className="bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 text-[#C8F135] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
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
          <button 
            onClick={() => setShowDeleteModal(true)} 
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <p className="text-[11px] text-gray-400">© 2024 Market Pro SaaS. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {["Privacy Policy", "Terms of Service", "API Status", "Contact Support"].map(l => (
            <a key={l} href="#" className="text-[11px] text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#C8F135] transition-colors">{l}</a>
          ))}
        </div>
      </div>

      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteAccount} isLoading={isLoading} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}