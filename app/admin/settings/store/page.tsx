"use client";

import { useState } from "react";
import {
  Store, MapPin, Truck, CreditCard, Share2,
  ImageIcon, Plus, Pencil, Check, X,
} from "lucide-react";

const shippingZones = [
  { id: 1, name: "International Express", carrier: "DHL / FedEx / UPS", rate: "$19.00", active: true },
  { id: 2, name: "Standard Domestic", carrier: "USPS / First Class", rate: "Free", active: true },
];

export default function StoreSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    name: "Chase Business Checking",
    accountNumber: "•••• •••• •••• 4521",
    routingNumber: "011000138",
    accountType: "Business Checking",
  });
  const [store, setStore] = useState({
    name: "Luminary Aesthetics",
    description: "Premium handcrafted home decor and luxury lifestyle accessories for the modern individual.",
    email: "hello@luminary.com",
    phone: "+1 (800) 012-3456",
    address: "123 Artisan Way, Design District",
    city: "San Francisco",
    state: "94102",
    businessType: "Limited Liability Company (LLC)",
    taxId: "XX-XXXXXXX",
    showTax: true,
    twitterX: "@luminary_home",
    twitter: "",
    pinterest: "",
    banner: "", // Added banner field
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your store identity, logistics, and financial information.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full animate-pulse">
            <Check size={12} /> Settings saved successfully
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Store size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Basic Info</h2>
          </div>
          <p className="text-xs text-gray-400">Your public store name and branding.</p>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-2">Store Logo</label>
              <label htmlFor="store-logo" className="relative w-full h-29 border-2 border-dashed p-1 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <input
                  id="store-logo"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Upload store logo"
                />
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center transition-colors">
                  <ImageIcon size={18} className="text-gray-400 group-hover:text-indigo-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Upload logo</p>
                  <p className="text-[11px] text-gray-400">PNG, JPG — 1024×1024 recommended</p>
                </div>
              </label>
            </div>


            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Store Name</label>
                <input
                  type="text"
                  value={store.name}
                  onChange={(e) => setStore({ ...store, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={store.description}
                  onChange={(e) => setStore({ ...store, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Banner Image</label>
            <input
              type="file"
              id="banner-upload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setStore({ ...store, banner: event.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="banner-upload"
              className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
            >
              <ImageIcon size={16} className="text-gray-400 group-hover:text-indigo-500" />
              <p className="text-[11px] text-gray-400">Upload wide banner (1920×400)</p>
            </label>
            {/* Optional: Show preview if banner exists */}
            {store.banner && (
              <div className="mt-3 relative">
                <img 
                  src={store.banner} 
                  alt="Banner preview" 
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => setStore({ ...store, banner: "" })}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact & Location + Business Details ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Contact & Location */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <MapPin size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Contact & Location</h2>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Public Email</label>
              <input type="email" value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
              <input type="tel" value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Street Address</label>
              <input type="text" value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">City / Province</label>
                <input type="text" value={store.city} onChange={(e) => setStore({ ...store, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ZIP / Postal</label>
                <input type="text" value={store.state} onChange={(e) => setStore({ ...store, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <CreditCard size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Business Details</h2>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Business Type</label>
              <select value={store.businessType} onChange={(e) => setStore({ ...store, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white">
                <option>Limited Liability Company (LLC)</option>
                <option>Sole Proprietorship</option>
                <option>Corporation</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Tax ID / EIN</label>
              <input type="text" value={store.taxId} onChange={(e) => setStore({ ...store, taxId: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer mt-1">
              <div
                onClick={() => setStore({ ...store, showTax: !store.showTax })}
                className={`relative w-9 h-5 rounded-full transition-colors ${store.showTax ? "bg-indigo-600" : "bg-gray-200"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${store.showTax ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
              <span className="text-xs text-gray-600 font-medium">Show business registration on storefront</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Shipping Settings ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Shipping Settings</h2>
          </div>
          <p className="text-xs text-gray-400 hidden sm:block">Configure delivery zones and flat rate maps.</p>
        </div>
        <div className="p-5 space-y-3">
          {shippingZones.map((zone) => (
            <div key={zone.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Truck size={14} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{zone.name}</p>
                  <p className="text-[10px] text-gray-400">{zone.carrier}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${zone.rate === "Free" ? "text-green-600" : "text-gray-800"}`}>{zone.rate}</span>
                <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                  <Pencil size={12} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
          <button className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-1 pt-1">
            <Plus size={13} /> Add New Shipping Zone
          </button>
        </div>
      </div>

      {/* ── Bank & Payouts + Socials ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Bank */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <CreditCard size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Bank & Payouts</h2>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                CH
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700">{bankDetails.name}</p>
                <p className="text-[10px] text-gray-400">{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={() => setShowBankModal(true)}
                className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition-colors"
              >
                Change
              </button>
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-gray-400">Next scheduled: 10/24 2025</p>
              <p className="text-sm font-bold text-gray-800">$1,620.00</p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Share2 size={15} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-gray-800">Socials</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: "X / Twitter", placeholder: "@handle", value: store.twitterX, key: "twitterX" },
              { label: "Instagram", placeholder: "@yourstore", value: store.twitter, key: "twitter" },
              { label: "Pinterest", placeholder: "pinterest.com/store", value: store.pinterest, key: "pinterest" },
            ].map((s) => (
              <div key={s.key}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{s.label}</label>
                <input
                  type="text"
                  placeholder={s.placeholder}
                  value={s.value}
                  onChange={(e) => setStore({ ...store, [s.key]: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Change Bank Account</h3>
                <p className="text-xs text-gray-500">Update your payout details securely.</p>
              </div>
              <button onClick={() => setShowBankModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Name</label>
                <input
                  type="text"
                  value={bankDetails.name}
                  onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Routing Number</label>
                  <input
                    type="text"
                    value={bankDetails.routingNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Account Type</label>
                <input
                  type="text"
                  value={bankDetails.accountType}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
              <button onClick={() => setShowBankModal(false)} className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowBankModal(false)} className="bg-[#4F46E5] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-[#4338CA]">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-col xs:flex-row items-center justify-between gap-3 pt-1 border-t border-gray-100">
        <p className="text-xs text-gray-400">All changes automatically synced to store.</p>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}