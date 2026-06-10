"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Check, X, User, MapPin, Settings, FileText,
  ChevronDown,
} from "lucide-react";

const INPUT = "w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all";
const SELECT = INPUT + " bg-white appearance-none";

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <span className="text-indigo-500">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function AddCustomerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Personal Info
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [phone, setPhone]             = useState("");

  // Settings
  const [customerGroup, setCustomerGroup] = useState("VIP");
  const [taxExempt, setTaxExempt]     = useState(false);
  const [doSavings, setDoSavings]     = useState(false);
  const [savingsNote, setSavingsNote] = useState("You can add profile to get promotion for promotion");

  // Address
  const [street, setStreet]           = useState("");
  const [city, setCity]               = useState("");
  const [postalCode, setPostalCode]   = useState("");
  const [country, setCountry]         = useState("United States");

  // Internal Notes
  const [additionalContact, setAdditionalContact] = useState("");
  const [notes, setNotes]             = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (isDraft = false) => {
    if (!isDraft && !validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/admin/customer");
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/admin/customer")}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Add New Customer Profile</h1>
          <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
            Register a new customer profile to manage their purchase history, personalised offers, and communication preferences within the commerce ecosystem.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button onClick={() => router.push("/admin/customers")}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Discard
          </button>
          <button onClick={() => handleSave(true)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold transition-colors">
            {saving
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <Check size={14} />}
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT (2/3) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Personal Information */}
          <Section icon={<User size={15} />} title="Personal Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" required error={errors.firstName}>
                  <input type="text" placeholder="e.g. James" value={firstName}
                    onChange={e => { setFirstName(e.target.value); setErrors(p => ({ ...p, firstName: "" })); }}
                    className={INPUT + (errors.firstName ? " border-red-300 focus:border-red-400" : "")} />
                </Field>
                <Field label="Last Name">
                  <input type="text" placeholder="e.g. Anderson" value={lastName}
                    onChange={e => setLastName(e.target.value)} className={INPUT} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address" required error={errors.email}>
                  <input type="email" placeholder="julia.a@email.com" value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                    className={INPUT + (errors.email ? " border-red-300 focus:border-red-400" : "")} />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" placeholder="+1 (555) 000-0000" value={phone}
                    onChange={e => setPhone(e.target.value)} className={INPUT} />
                </Field>
              </div>
            </div>
          </Section>

          {/* Address Details */}
          <Section icon={<MapPin size={15} />} title="Address Details">
            <div className="space-y-4">
              <Field label="Street Address">
                <input type="text" placeholder="123 Kennedy Ave, Suite 400" value={street}
                  onChange={e => setStreet(e.target.value)} className={INPUT} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City">
                  <input type="text" placeholder="San Francisco" value={city}
                    onChange={e => setCity(e.target.value)} className={INPUT} />
                </Field>
                <Field label="Postal Code">
                  <input type="text" placeholder="94103" value={postalCode}
                    onChange={e => setPostalCode(e.target.value)} className={INPUT} />
                </Field>
              </div>
              <Field label="Country">
                <div className="relative">
                  <select value={country} onChange={e => setCountry(e.target.value)}
                    className={SELECT + " pr-8"}>
                    {["United States", "United Kingdom", "Canada", "Australia", "Nigeria", "Germany", "France", "India"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </Field>
            </div>
          </Section>

        </div>

        {/* ── RIGHT (1/3) ── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Settings */}
          <Section icon={<Settings size={15} />} title="Settings">
            <div className="space-y-4">
              <Field label="Customer Group">
                <div className="flex gap-2">
                  {["VIP", "Wholesale", "Retail"].map(g => (
                    <button key={g} onClick={() => setCustomerGroup(g)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        customerGroup === g
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
                      }`}>
                      {g}
                    </button>
                  ))}
                </div>
              </Field>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="text-xs font-medium text-gray-700">Tax Exempt</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">No tax applied to purchases</p>
                </div>
                <div onClick={() => setTaxExempt(!taxExempt)}
                  className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${taxExempt ? "bg-indigo-600" : "bg-gray-200"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${taxExempt ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </label>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <p className="text-xs font-semibold text-indigo-700">Do Savings</p>
                  <div onClick={() => setDoSavings(!doSavings)}
                    className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${doSavings ? "bg-indigo-600" : "bg-indigo-200"}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${doSavings ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                </label>
                <p className="text-[10px] text-indigo-600 leading-relaxed">{savingsNote}</p>
              </div>
            </div>
          </Section>

          {/* Internal Notes */}
          <Section icon={<FileText size={15} />} title="Internal Notes">
            <div className="space-y-3">
              <Field label="Additional Contact">
                <input type="text" placeholder="e.g. Manager or spouse name" value={additionalContact}
                  onChange={e => setAdditionalContact(e.target.value)} className={INPUT} />
              </Field>
              <Field label="Notes">
                <textarea rows={4} placeholder="Enter private notes about customer, preferred serving areas, or special requests..."
                  value={notes} onChange={e => setNotes(e.target.value)}
                  className={INPUT + " resize-none"} />
              </Field>
            </div>
          </Section>

          {/* Pro tip card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-4 text-white space-y-1.5">
            <p className="text-xs font-bold">✨ Enriching the Experience</p>
            <p className="text-[11px] leading-relaxed opacity-90">
              All new profiles are automatically available for mass customisation within 24 hours of creation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky footer ── */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-4 py-3 flex gap-2 shadow-lg">
        <button onClick={() => router.push("/admin/customers")}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
          Discard
        </button>
        <button onClick={() => handleSave(true)}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
          Draft
        </button>
        <button onClick={() => handleSave(false)} disabled={saving}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-1.5">
          {saving
            ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            : <Check size={14} />}
          {saving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}