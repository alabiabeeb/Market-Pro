"use client";

import { useState } from "react";
import { User, Lock, AlertTriangle, Camera, Eye, EyeOff } from "lucide-react";

export default function ProfileSettingsPage() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profile, setProfile] = useState({
    name: "Fashion Hub Admin",
    email: "admin@fashionhubpro.com",
    phone: "+1 (555) 000-1234",
    bio: "Managing the digital storefront and growth strategy for Fashion Hub Pro.",
  });

  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">

      {/* Page title */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage your personal account information</p>
      </div>

      {/* ── Personal Information ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <User size={15} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800">Personal Information</h2>
        </div>

        <div className="p-5 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-indigo-100 overflow-hidden border-2 border-indigo-200">
                <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-indigo-700 transition-colors">
                <Camera size={11} className="text-white" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
              <button className="text-xs text-indigo-600 font-medium mt-1 hover:underline">
                <input type="file" name="" id="" />
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Lock size={15} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800">Change Password</h2>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Old Password</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                value={passwords.old}
                onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
              />
              <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100 bg-red-50/60">
          <AlertTriangle size={15} className="text-red-500" />
          <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 mb-4">
            Permanently remove your account and all associated data. This action cannot be undone.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
          Save Changes
        </button>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">© 2024 Market Pro SaaS. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {["Privacy Policy", "Terms of Service", "API Status", "Contact Support"].map((l) => (
            <a key={l} href="#" className="text-[11px] text-gray-400 hover:text-indigo-600 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}