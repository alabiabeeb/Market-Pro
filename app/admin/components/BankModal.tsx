"use client";

import { useState, useEffect } from "react";
import { X, Check, AlertCircle, Loader2, Building2, CreditCard, Search } from "lucide-react";

// ── All Nigerian banks ─────────────────────────────────────────────────────
const BANKS = [
  // Traditional
  { code: "044",   name: "Access Bank",                  type: "traditional" },
  { code: "023",   name: "Citibank Nigeria",              type: "traditional" },
  { code: "050",   name: "EcoBank Nigeria",               type: "traditional" },
  { code: "089",   name: "Fidelity Bank",                 type: "traditional" },
  { code: "011",   name: "First Bank of Nigeria",         type: "traditional" },
  { code: "214",   name: "First City Monument Bank (FCMB)", type: "traditional" },
  { code: "058",   name: "Guaranty Trust Bank (GTB)",     type: "traditional" },
  { code: "069",   name: "Heritage Bank",                 type: "traditional" },
  { code: "082",   name: "Keystone Bank",                 type: "traditional" },
  { code: "014",   name: "Mainstreet Bank",               type: "traditional" },
  { code: "076",   name: "Polaris Bank",                  type: "traditional" },
  { code: "039",   name: "Stanbic IBTC Bank",             type: "traditional" },
  { code: "068",   name: "Standard Chartered Bank",       type: "traditional" },
  { code: "232",   name: "Sterling Bank",                 type: "traditional" },
  { code: "033",   name: "United Bank for Africa (UBA)",  type: "traditional" },
  { code: "032",   name: "Union Bank of Nigeria",         type: "traditional" },
  { code: "035",   name: "Wema Bank",                     type: "traditional" },
  { code: "057",   name: "Zenith Bank",                   type: "traditional" },
  { code: "215",   name: "Unity Bank",                    type: "traditional" },
  { code: "301",   name: "Jaiz Bank",                     type: "traditional" },
  { code: "526",   name: "Parallex Bank",                 type: "traditional" },
  { code: "101",   name: "ProvidusBank",                  type: "traditional" },
  // Online/Fintech
  { code: "50211", name: "OPay",                          type: "fintech" },
  { code: "50926", name: "PalmPay",                       type: "fintech" },
  { code: "50067", name: "Kuda Bank",                     type: "fintech" },
  { code: "50515", name: "Moniepoint MFB",                type: "fintech" },
  { code: "50479", name: "ALAT by WEMA",                  type: "fintech" },
  { code: "50019", name: "VFD Microfinance Bank",         type: "fintech" },
  { code: "090405",name: "Fairmoney Microfinance Bank",   type: "fintech" },
  { code: "50304", name: "Carbon (OneFi)",                type: "fintech" },
  { code: "50563", name: "PocketApp (PocketMoni)",        type: "fintech" },
  { code: "565",   name: "Carbon Zero",                   type: "fintech" },
  { code: "50094", name: "Sparkle Microfinance Bank",     type: "fintech" },
  { code: "50162", name: "Safe Haven MFB",                type: "fintech" },
];

const parseDigits   = (v: string) => v.replace(/\D/g, "");
const maskAccount   = (v: string) => {
  const d = parseDigits(v);
  if (!d) return "";
  return d.slice(0, -4).replace(/\d/g, "•") + d.slice(-4);
};

interface BankDetails {
  bankCode:      string;
  bankName:      string;
  accountNumber: string;
  accountName:   string;
  accountType:   string;
}

interface Props {
  current: BankDetails;
  onClose: () => void;
  onSave:  (b: BankDetails) => void;
}

type VerifyState = "idle" | "loading" | "success" | "error";

export default function BankModal({ current, onClose, onSave }: Props) {
  const [bankSearch, setBankSearch]   = useState("");
  const [form, setForm]               = useState<BankDetails>({ ...current });
  const [rawAccount, setRawAccount]   = useState(parseDigits(current.accountNumber));
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");
  const [verifyMsg, setVerifyMsg]     = useState("");

  const filteredBanks = BANKS.filter(b =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase())
  );
  const traditional = filteredBanks.filter(b => b.type === "traditional");
  const fintech     = filteredBanks.filter(b => b.type === "fintech");

  // Auto-verify when 10 digits entered and bank selected
  useEffect(() => {
    if (rawAccount.length < 10 || !form.bankCode) return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => doVerify(ctrl.signal), 800);
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [rawAccount, form.bankCode]);

  const doVerify = async (signal?: AbortSignal) => {
    if (rawAccount.length < 10 || !form.bankCode) {
      setVerifyMsg("Enter 10+ digits and select a bank.");
      setVerifyState("error");
      return;
    }
    setVerifyState("loading");
    setVerifyMsg("");

    try {
      const res  = await fetch("/api/paystack/resolve", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ accountNumber: rawAccount, bankCode: form.bankCode }),
        signal,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Verification failed");

      setForm(prev => ({
        ...prev,
        accountName:   data.account_name,
        accountNumber: data.account_number || rawAccount,
      }));
      setVerifyState("success");
      setVerifyMsg(`✓ Verified: ${data.account_name}`);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setVerifyState("error");
      setVerifyMsg(err.message || "Could not verify account.");
      setForm(prev => ({ ...prev, accountName: "" }));
    }
  };

  const handleBankSelect = (bank: typeof BANKS[0]) => {
    setForm(prev => ({ ...prev, bankCode: bank.code, bankName: bank.name, accountName: "" }));
    setVerifyState("idle");
    setVerifyMsg("");
    setBankSearch("");
  };

  const handleAccountInput = (v: string) => {
    const digits = parseDigits(v).slice(0, 10);
    setRawAccount(digits);
    setForm(prev => ({ ...prev, accountNumber: digits, accountName: "" }));
    setVerifyState("idle");
    setVerifyMsg("");
  };

  const handleSave = () => {
    if (!form.bankCode)      { setVerifyMsg("Please select a bank."); setVerifyState("error"); return; }
    if (rawAccount.length < 10) { setVerifyMsg("Account number must be 10 digits."); setVerifyState("error"); return; }
    if (!form.accountName)   { setVerifyMsg("Please verify the account first."); setVerifyState("error"); return; }
    onSave({ ...form, accountNumber: rawAccount });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Change Bank Account</h3>
            <p className="text-xs text-gray-400 mt-0.5">Select your bank and enter account number to auto-verify</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto flex-1">

          {/* ── Step 1: Select Bank ── */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Building2 size={12} className="text-indigo-500" /> Select Bank
            </label>

            {/* Bank search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search bank name..." value={bankSearch}
                onChange={e => setBankSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
            </div>

            {/* Currently selected bank chip */}
            {form.bankCode && !bankSearch && (
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                  {form.bankName.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex-1">{form.bankName}</p>
                <Check size={13} className="text-indigo-600" />
              </div>
            )}

            {/* Bank dropdown when searching */}
            {bankSearch && (
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg max-h-48 overflow-y-auto">
                {traditional.length > 0 && (
                  <>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1.5 bg-gray-50 dark:bg-gray-800 sticky top-0">Traditional Banks</p>
                    {traditional.map(b => (
                      <button key={b.code} onClick={() => handleBankSelect(b)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 ${form.bankCode === b.code ? "bg-indigo-50 dark:bg-indigo-950/30" : ""}`}>
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[9px] font-bold shrink-0">
                          {b.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-left">{b.name}</span>
                        {form.bankCode === b.code && <Check size={12} className="text-indigo-600 ml-auto shrink-0" />}
                      </button>
                    ))}
                  </>
                )}
                {fintech.length > 0 && (
                  <>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1.5 bg-gray-50 dark:bg-gray-800 sticky top-0">Online / Fintech Banks</p>
                    {fintech.map(b => (
                      <button key={b.code} onClick={() => handleBankSelect(b)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 ${form.bankCode === b.code ? "bg-violet-50 dark:bg-violet-950/30" : ""}`}>
                        <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-600 dark:text-violet-400 text-[9px] font-bold shrink-0">
                          {b.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-left">{b.name}</span>
                        {form.bankCode === b.code && <Check size={12} className="text-violet-600 ml-auto shrink-0" />}
                      </button>
                    ))}
                  </>
                )}
                {traditional.length === 0 && fintech.length === 0 && (
                  <p className="text-xs text-gray-400 px-4 py-3 text-center">No banks found.</p>
                )}
              </div>
            )}
          </div>

          {/* ── Step 2: Account Number ── */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <CreditCard size={12} className="text-indigo-500" /> Account Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 10-digit account number"
                  value={rawAccount}
                  onChange={e => handleAccountInput(e.target.value)}
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 tracking-widest font-mono"
                />
                {/* digit counter */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono">
                  {rawAccount.length}/10
                </span>
              </div>
              <button
                onClick={() => doVerify()}
                disabled={verifyState === "loading" || rawAccount.length < 10 || !form.bankCode}
                className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                {verifyState === "loading"
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Search size={13} />}
                {verifyState === "loading" ? "..." : "Verify"}
              </button>
            </div>

            {/* Verify status */}
            {verifyState === "loading" && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
                <Loader2 size={12} className="animate-spin" /> Verifying account details...
              </div>
            )}
            {verifyState === "success" && (
              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <Check size={12} /> {verifyMsg}
              </div>
            )}
            {verifyState === "error" && (
              <div className="flex items-center gap-2 text-xs text-red-500">
                <AlertCircle size={12} /> {verifyMsg}
              </div>
            )}
          </div>

          {/* ── Verified Account Card ── */}
          {verifyState === "success" && form.accountName && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5">
                <Check size={13} /> Account Verified
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Bank",           form.bankName],
                  ["Account Name",   form.accountName],
                  ["Account Number", maskAccount(rawAccount)],
                  ["Bank Code",      form.bankCode],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white dark:bg-gray-900 rounded-lg p-2.5 border border-green-100 dark:border-green-900/50">
                    <p className="text-[10px] text-gray-400">{k}</p>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Account Type</label>
            <select value={form.accountType} onChange={e => setForm({ ...form, accountType: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              {["Business Checking", "Business Savings", "Personal Checking", "Personal Savings"].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0">
          <p className="text-[10px] text-gray-400">
            Powered by <span className="font-semibold text-indigo-600">Paystack</span>
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5">
              <Check size={14} /> Save Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}