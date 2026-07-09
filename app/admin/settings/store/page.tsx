"use client";

import { useEffect, useState } from "react";
import {
  Store, MapPin, Truck, CreditCard, Share2,
  ImageIcon, Plus, Pencil, Check, X, Trash2, Calendar,
  Search, Loader2, AlertCircle, Building2, Globe,
  ExternalLink, Copy, ArrowLeft
} from "lucide-react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface ShippingZone {
  id: number; state: string; lga: string; station: string;
  amount: number; collectionDays: number;
}
interface BankDetails {
  bankCode: string; bankName: string; accountNumber: string;
  accountName: string; accountType: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const INITIAL_ZONES: ShippingZone[] = [
  { id:1, state:"Oyo",   lga:"Ibadan North", station:"Olomi Delivery Station",  amount:1200, collectionDays:3 },
  { id:2, state:"Oyo",   lga:"Lagelu",       station:"Olunde Delivery Station", amount:1000, collectionDays:3 },
  { id:3, state:"Lagos", lga:"Ikeja",        station:"Ikeja Pickup Hub",        amount:1500, collectionDays:5 },
];

// Only traditional banks that support Paystack verification
const BANKS = [
  { code: "044", name: "Access Bank", type: "traditional" },
  { code: "023", name: "Citibank Nigeria", type: "traditional" },
  { code: "050", name: "EcoBank Nigeria", type: "traditional" },
  { code: "089", name: "Fidelity Bank", type: "traditional" },
  { code: "011", name: "First Bank of Nigeria", type: "traditional" },
  { code: "214", name: "First City Monument Bank (FCMB)", type: "traditional" },
  { code: "058", name: "Guaranty Trust Bank (GTB)", type: "traditional" },
  { code: "069", name: "Heritage Bank", type: "traditional" },
  { code: "082", name: "Keystone Bank", type: "traditional" },
  { code: "076", name: "Polaris Bank", type: "traditional" },
  { code: "039", name: "Stanbic IBTC Bank", type: "traditional" },
  { code: "068", name: "Standard Chartered Bank", type: "traditional" },
  { code: "232", name: "Sterling Bank", type: "traditional" },
  { code: "033", name: "United Bank for Africa (UBA)", type: "traditional" },
  { code: "032", name: "Union Bank of Nigeria", type: "traditional" },
  { code: "035", name: "Wema Bank", type: "traditional" },
  { code: "057", name: "Zenith Bank", type: "traditional" },
  { code: "215", name: "Unity Bank", type: "traditional" },
  { code: "301", name: "Jaiz Bank", type: "traditional" },
  { code: "101", name: "Providus Bank", type: "traditional" },
];

const parseDigits  = (v: string) => v.replace(/\D/g, "");
const maskAccount  = (v: string) => {
  const d = parseDigits(v);
  if (!d) return "";
  return d.slice(0, -4).replace(/\d/g, "•") + d.slice(-4);
};

// ── Shared input style ─────────────────────────────────────────────────────
const INPUT = "w-full px-3.5 py-2.5 text-sm border border-[#E5E7EB] dark:border-gray-700 rounded-lg bg-white dark:bg-[#08120C] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600";

// ── Shipping Zone Modal ────────────────────────────────────────────────────
function ShippingModal({ zone, onClose, onSave }: {
  zone: Partial<ShippingZone> | null;
  onClose: () => void;
  onSave: (z: Omit<ShippingZone,"id">) => void;
}) {
  const [form, setForm] = useState<Omit<ShippingZone,"id">>(
    zone
      ? { state:zone.state??"", lga:zone.lga??"", station:zone.station??"", amount:zone.amount??0, collectionDays:zone.collectionDays??3 }
      : { state:"", lga:"", station:"", amount:0, collectionDays:3 }
  );
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!form.state.trim()||!form.lga.trim()||!form.station.trim()) { setError("State, LGA, and delivery station are required."); return; }
    if (form.amount < 0) { setError("Amount cannot be negative."); return; }
    if (form.collectionDays < 1) { setError("Collection days must be at least 1."); return; }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{zone?.id?"Edit":"Add"} Shipping Zone</h3>
            <p className="text-xs text-gray-400 mt-0.5">Set location, delivery station and rate</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={16}/></button>
        </div>
        <div className="p-5 space-y-4">
          {error && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">{error}</p>}
          {/* Location */}
          <div className="bg-[#F7F4EE] dark:bg-[#0F1D14] border border-[#E5E7EB] dark:border-[#153323] rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-[#0A2E1A] dark:text-[#C8F135] flex items-center gap-1.5"><MapPin size={12}/>Location Details</p>
            {[{label:"State",key:"state",placeholder:"e.g. Oyo, Lagos, Abuja"},{label:"Local Government Area (LGA)",key:"lga",placeholder:"e.g. Ibadan North, Ikeja"},{label:"Delivery Station in LGA",key:"station",placeholder:"e.g. Olomi Delivery Station"}].map(({label,key,placeholder})=>(
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
                <input type="text" placeholder={placeholder} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className={INPUT}/>
              </div>
            ))}
          </div>
          {/* Rate */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><Truck size={12}/>Shipping Rate</p>
            <p className="text-xs text-gray-500">Delivery fee in Naira — <span className="text-green-600 font-medium">enter 0 for free delivery</span></p>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">₦</span>
              <input type="number" min={0} placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:Math.max(0,Number(e.target.value))})} className={INPUT+" pl-8"}/>
            </div>
            {form.amount===0&&<p className="text-[11px] text-green-600 font-medium flex items-center gap-1"><Check size={11}/>This zone will have free delivery</p>}
          </div>
          {/* Collection days */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><Calendar size={12}/>Collection / Delivery Days</p>
            <p className="text-xs text-gray-500">How many days after ordering before delivery is available</p>
            <div className="flex items-center gap-3">
              <button onClick={()=>setForm({...form,collectionDays:Math.max(1,form.collectionDays-1)})} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-lg">−</button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{form.collectionDays}</span>
                <p className="text-[10px] text-gray-400">{form.collectionDays===1?"day":"days"} after order</p>
              </div>
              <button onClick={()=>setForm({...form,collectionDays:form.collectionDays+1})} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-lg">+</button>
            </div>
            <div className="flex gap-2 mt-1">
              {[1,2,3,5,7].map(d=>(
                <button key={d} onClick={()=>setForm({...form,collectionDays:d})}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${form.collectionDays===d?"bg-[#0A2E1A] text-[#C8F135] border-[#0A2E1A]":"border-gray-200 dark:border-gray-700 text-gray-500 hover:border-[#C8F135] hover:text-[#0A2E1A]"}`}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-[#0A2E1A] hover:bg-[#060F09] text-[#C8F135] text-sm font-semibold">{zone?.id?"Save Changes":"Add Zone"}</button>
        </div>
      </div>
    </div>
  );
}

// ── Bank Modal ─────────────────────────────────────────────────────────────
function BankModal({ current, onClose, onSave }: {
  current: BankDetails;
  onClose: () => void;
  onSave: (b: BankDetails) => void;
}) {
  const [bankSearch, setBankSearch] = useState("");
  const [form, setForm]             = useState<BankDetails>({...current});
  const [rawAccount, setRawAccount] = useState(parseDigits(current.accountNumber));
  const [verifyState, setVerifyState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [verifyMsg, setVerifyMsg]   = useState("");

  const filtered    = BANKS.filter(b=>b.name.toLowerCase().includes(bankSearch.toLowerCase()));
  const traditional = filtered.filter(b=>b.type==="traditional");
  const fintech     = filtered.filter(b=>b.type==="fintech");

  useEffect(()=>{
    if (rawAccount.length<10||!form.bankCode) return;
    const ctrl = new AbortController();
    const timer = setTimeout(()=>doVerify(ctrl.signal),800);
    return ()=>{ clearTimeout(timer); ctrl.abort(); };
  },[rawAccount,form.bankCode]);

  const doVerify = async (signal?: AbortSignal)=>{
    if (rawAccount.length<10||!form.bankCode){ setVerifyMsg("Enter 10+ digits and select a bank."); setVerifyState("error"); return; }
    setVerifyState("loading"); setVerifyMsg("");
    try {
      const res  = await fetch("/api/paystack/resolve",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({accountNumber:rawAccount,bankCode:form.bankCode}), signal });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message||"Verification failed");
      setForm(p=>({...p,accountName:data.account_name,accountNumber:data.account_number||rawAccount}));
      setVerifyState("success"); setVerifyMsg(`Verified: ${data.account_name}`);
    } catch(err:any){
      if (err?.name==="AbortError") return;
      setVerifyState("error"); setVerifyMsg(err.message||"Could not verify account.");
      setForm(p=>({...p,accountName:""}));
    }
  };

  const handleBankSelect=(bank:typeof BANKS[0])=>{ setForm(p=>({...p,bankCode:bank.code,bankName:bank.name,accountName:""})); setVerifyState("idle"); setVerifyMsg(""); setBankSearch(""); };
  const handleAccountInput=(v:string)=>{ const d=parseDigits(v).slice(0,10); setRawAccount(d); setForm(p=>({...p,accountNumber:d,accountName:""})); setVerifyState("idle"); setVerifyMsg(""); };
  const handleSave=()=>{ if (!form.bankCode){setVerifyMsg("Please select a bank.");setVerifyState("error");return;} if (rawAccount.length<10){setVerifyMsg("Account number must be 10 digits.");setVerifyState("error");return;} if (!form.accountName){setVerifyMsg("Please verify the account first.");setVerifyState("error");return;} onSave({...form,accountNumber:rawAccount}); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Change Bank Account</h3>
            <p className="text-xs text-gray-400 mt-0.5">Select bank and enter account number to auto-verify</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={16} className="text-gray-500"/></button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Select Bank */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"><Building2 size={12} className="text-[#0A2E1A]"/>Select Bank</label>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search bank name..." value={bankSearch} onChange={e=>setBankSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A]"/>
            </div>
            {/* Selected chip */}
            {form.bankCode&&!bankSearch&&(
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F4EE] dark:bg-[#0F1D14] border border-[#E5E7EB] dark:border-[#153323] rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-[#0A2E1A] flex items-center justify-center text-[#C8F135] text-[9px] font-bold shrink-0">{form.bankName.slice(0,2).toUpperCase()}</div>
                <p className="text-xs font-semibold text-[#0A2E1A] dark:text-[#C8F135] flex-1">{form.bankName}</p>
                <Check size={13} className="text-[#0A2E1A]"/>
              </div>
            )}
            {/* Dropdown */}
            {bankSearch&&(
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg max-h-52 overflow-y-auto">
                {traditional.length>0&&(
                  <>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1.5 bg-gray-50 dark:bg-gray-800 sticky top-0">Traditional Banks</p>
                    {traditional.map(b=>(
                      <button key={b.code} onClick={()=>handleBankSelect(b)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 ${form.bankCode===b.code?"bg-[#F7F4EE] dark:bg-[#0F1D14]":""}`}>
                        <div className="w-7 h-7 rounded-lg bg-[#F7F4EE] dark:bg-[#0F1D14] flex items-center justify-center text-[#0A2E1A] dark:text-[#C8F135] text-[9px] font-bold shrink-0">{b.name.slice(0,2).toUpperCase()}</div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-left">{b.name}</span>
                        {form.bankCode===b.code&&<Check size={12} className="text-[#0A2E1A] ml-auto shrink-0"/>}
                      </button>
                    ))}
                  </>
                )}
                {fintech.length>0&&(
                  <>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1.5 bg-gray-50 dark:bg-gray-800 sticky top-0">Online / Fintech Banks</p>
                    {fintech.map(b=>(
                      <button key={b.code} onClick={()=>handleBankSelect(b)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 ${form.bankCode===b.code?"bg-[#F7F4EE] dark:bg-[#0F1D14]":""}`}>
                        <div className="w-7 h-7 rounded-lg bg-[#F7F4EE] dark:bg-[#0F1D14] flex items-center justify-center text-[#0A2E1A] dark:text-[#C8F135] text-[9px] font-bold shrink-0">{b.name.slice(0,2).toUpperCase()}</div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-left">{b.name}</span>
                        {form.bankCode===b.code&&<Check size={12} className="text-[#0A2E1A] ml-auto shrink-0"/>}
                      </button>
                    ))}
                  </>
                )}
                {traditional.length===0&&fintech.length===0&&<p className="text-xs text-gray-400 px-4 py-3 text-center">No banks found.</p>}
              </div>
            )}
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"><CreditCard size={12} className="text-[#0A2E1A]"/>Account Number</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input type="text" inputMode="numeric" placeholder="Enter 10-digit account number"
                  value={rawAccount} onChange={e=>handleAccountInput(e.target.value)} maxLength={10}
                  className="w-full px-3.5 py-2.5 pr-12 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] tracking-widest font-mono"/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-mono">{rawAccount.length}/10</span>
              </div>
              <button onClick={()=>doVerify()} disabled={verifyState==="loading"||rawAccount.length<10||!form.bankCode}
                className="px-3.5 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-[#C8F135] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0">
                {verifyState==="loading"?<Loader2 size={13} className="animate-spin"/>:<Search size={13}/>}
                {verifyState==="loading"?"...":"Verify"}
              </button>
            </div>
            {verifyState==="loading"&&<p className="text-xs text-[#0A2E1A] dark:text-[#C8F135] flex items-center gap-1.5"><Loader2 size={11} className="animate-spin"/>Verifying account details...</p>}
            {verifyState==="success"&&<p className="text-xs text-green-600 font-medium flex items-center gap-1.5"><Check size={11}/>Verified: {form.accountName}</p>}
            {verifyState==="error"&&<p className="text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={11}/>{verifyMsg}</p>}
          </div>

          {/* Verified card */}
          {verifyState==="success"&&form.accountName&&(
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5"><Check size={12}/>Account Verified</p>
              <div className="grid grid-cols-2 gap-2">
                {[["Bank",form.bankName],["Account Name",form.accountName],["Account Number",maskAccount(rawAccount)],["Bank Code",form.bankCode]].map(([k,v])=>(
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
            <select value={form.accountType} onChange={e=>setForm({...form,accountType:e.target.value})}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              {["Business Checking","Business Savings","Personal Checking","Personal Savings"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shrink-0">
          <p className="text-[10px] text-gray-400">Powered by <span className="font-semibold text-[#0A2E1A]">Paystack</span></p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-[#0A2E1A] hover:bg-[#060F09] text-[#C8F135] text-sm font-semibold flex items-center gap-1.5"><Check size={14}/>Save Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Domain Settings Component ──────────────────────────────────────────────
function DomainSettings() {
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ domain?: string; general?: string }>({});
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  const dnsRecords = [
    { type: "A", name: "@", value: "76.76.21.21", ttl: "Auto" },
    { type: "CNAME", name: "www", value: "cname.marketpro.ng", ttl: "Auto" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!domain.trim()) {
      setErrors({ domain: "Domain name is required" });
      return;
    }

    const domainRegex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
    if (!domainRegex.test(domain.trim())) {
      setErrors({ domain: "Please enter a valid domain (e.g., mystore.com)" });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentDomain(domain.trim());
      setSuccess(true);
      setDomain("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setErrors({ general: "Failed to add domain. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveDomain = () => {
    if (confirm("Are you sure you want to remove your custom domain?")) {
      setCurrentDomain(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
        <Globe size={15} className="text-[#0A2E1A]" />
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Custom Domain</h2>
        <span className="ml-auto text-[10px] font-medium text-[#C8F135] bg-[#C8F135]/10 px-2 py-0.5 rounded-full">Growth Plan</span>
      </div>
      <div className="p-5 space-y-4">
        {/* Current Domain */}
        {currentDomain ? (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{currentDomain}</span>
                <span className="text-[10px] bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Active</span>
              </div>
            </div>
            <button onClick={handleRemoveDomain} className="text-xs text-red-600 hover:text-red-700 font-medium">Remove</button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">No custom domain connected</p>
            <p className="text-xs text-gray-400 mt-1">Your store is at: <span className="font-mono">yourstore.marketpro.ng</span></p>
          </div>
        )}

        {/* Add Domain Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g., amakafashion.com"
              value={domain}
              onChange={(e) => { setDomain(e.target.value); setErrors({}); }}
              className={`flex-1 px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all ${
                errors.domain ? "border-red-300 focus:ring-red-100 bg-red-50 dark:bg-red-950/30" : "border-gray-200 dark:border-gray-700 focus:border-[#0A2E1A]"
              }`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 text-[#C8F135] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {isLoading ? "Adding..." : "Add Domain"}
            </button>
          </div>
          {errors.domain && <p className="text-xs text-red-500">{errors.domain}</p>}
          {errors.general && <p className="text-xs text-red-500">{errors.general}</p>}
          {success && (
            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
              <Check size={14} /> Domain added successfully! DNS propagation may take up to 24 hours.
            </div>
          )}
        </form>

        {/* DNS Records */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">DNS Configuration</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-1.5 font-semibold text-gray-500">Type</th>
                  <th className="pb-1.5 font-semibold text-gray-500">Name</th>
                  <th className="pb-1.5 font-semibold text-gray-500">Value</th>
                  <th className="pb-1.5 font-semibold text-gray-500">TTL</th>
                  <th className="pb-1.5 font-semibold text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {dnsRecords.map((record, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <td className="py-1.5 font-mono text-gray-700 dark:text-gray-300">{record.type}</td>
                    <td className="py-1.5 font-mono text-gray-700 dark:text-gray-300">{record.name}</td>
                    <td className="py-1.5 font-mono text-gray-700 dark:text-gray-300 break-all">{record.value}</td>
                    <td className="py-1.5 text-gray-500">{record.ttl}</td>
                    <td className="py-1.5">
                      <button onClick={() => handleCopy(record.value)} className="p-1 text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#C8F135] transition-colors">
                        <Copy size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {copied && <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>}
          <p className="text-[10px] text-gray-400 mt-2">
            <AlertCircle size={11} className="inline mr-1" />
            DNS propagation can take up to 24 hours. Your store remains at <span className="font-mono">yourstore.marketpro.ng</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function StoreSettingsPage() {
  const [saved, setSaved]               = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [shippingModal, setShippingModal] = useState<{open:boolean;zone:Partial<ShippingZone>|null}>({open:false,zone:null});
  const [zones, setZones]               = useState<ShippingZone[]>(INITIAL_ZONES);
  const [deleteZoneId, setDeleteZoneId] = useState<number|null>(null);

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankCode:"044", bankName:"Access Bank", accountNumber:"", accountName:"", accountType:"Business Checking",
  });

  const [store, setStore] = useState({
    name:"Luminary Aesthetics",
    description:"Premium handcrafted home decor and luxury lifestyle accessories for the modern individual.",
    email:"hello@luminary.com", phone:"+1 (800) 012-3456",
    address:"123 Artisan Way, Design District", city:"San Francisco", state:"94102",
    businessType:"Limited Liability Company (LLC)", taxId:"XX-XXXXXXX",
    showTax:true, twitterX:"@luminary_home", twitter:"", pinterest:"", banner:"",
  });

  const handleSave     = ()=>{ setSaved(true); setTimeout(()=>setSaved(false),3000); };
  const handleSaveZone = (data:Omit<ShippingZone,"id">)=>{ if (shippingModal.zone?.id){ setZones(p=>p.map(z=>z.id===shippingModal.zone!.id?{...data,id:z.id}:z)); }else{ setZones(p=>[...p,{...data,id:Date.now()}]); } setShippingModal({open:false,zone:null}); };
  const handleDeleteZone=(id:number)=>{ setZones(p=>p.filter(z=>z.id!==id)); setDeleteZoneId(null); };

  const sectionClass = "bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden";
  const headerClass  = "flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800";

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Store Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your store identity, logistics, and financial information.</p>
        </div>
        {saved&&(
          <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-400 text-xs font-medium px-3 py-1.5 rounded-full">
            <Check size={12}/>Settings saved successfully
          </div>
        )}
      </div>

      {/* ── Basic Info ── */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2"><Store size={15} className="text-[#0A2E1A]"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Basic Info</h2></div>
          <p className="text-xs text-gray-400 hidden sm:block">Your public store name and branding.</p>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Store Logo</label>
              <label htmlFor="store-logo" className="relative w-full h-28 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 cursor-pointer group transition-all">
                <input id="store-logo" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 group-hover:bg-[#F7F4EE] dark:group-hover:bg-[#0F1D14] rounded-lg flex items-center justify-center transition-colors">
                  <ImageIcon size={18} className="text-gray-400 group-hover:text-[#0A2E1A]"/>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG — 1024×1024</p>
              </label>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Store Name</label>
                <input type="text" value={store.name} onChange={e=>setStore({...store,name:e.target.value})} className={INPUT}/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Description</label>
                <textarea rows={3} value={store.description} onChange={e=>setStore({...store,description:e.target.value})} className={INPUT+" resize-none"}/>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Banner Image</label>
            <input type="file" id="banner-upload" accept="image/*" className="hidden"
              onChange={e=>{ const f=e.target.files?.[0]; if(f){const r=new FileReader();r.onload=ev=>setStore({...store,banner:ev.target?.result as string});r.readAsDataURL(f);}}}/>
              <label htmlFor="banner-upload" className="w-full h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-[#C8F135] dark:hover:bg-[#0F1D14] cursor-pointer group transition-all">
              <ImageIcon size={16} className="text-gray-400 group-hover:text-[#0A2E1A]"/>
              <p className="text-[11px] text-gray-400">Upload wide banner (1920×400)</p>
            </label>
            {store.banner&&(
              <div className="mt-3 relative">
                <img src={store.banner} alt="Banner" className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"/>
                <button onClick={()=>setStore({...store,banner:""})} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"><X size={14}/></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact & Business ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className={sectionClass}>
          <div className={headerClass}><MapPin size={15} className="text-[#0A2E1A]"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Contact & Location</h2></div>
          <div className="p-5 space-y-3">
            {[{label:"Public Email",key:"email",type:"email"},{label:"Phone Number",key:"phone",type:"tel"},{label:"Street Address",key:"address",type:"text"}].map(({label,key,type})=>(
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{label}</label>
                <input type={type} value={(store as any)[key]} onChange={e=>setStore({...store,[key]:e.target.value})} className={INPUT}/>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">City</label><input type="text" value={store.city} onChange={e=>setStore({...store,city:e.target.value})} className={INPUT}/></div>
              <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">ZIP / Postal</label><input type="text" value={store.state} onChange={e=>setStore({...store,state:e.target.value})} className={INPUT}/></div>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className={headerClass}><CreditCard size={15} className="text-[#0A2E1A]"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Business Details</h2></div>
          <div className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Business Type</label>
              <select value={store.businessType} onChange={e=>setStore({...store,businessType:e.target.value})} className={INPUT}>
                {["Limited Liability Company (LLC)","Sole Proprietorship","Corporation","Partnership"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Tax ID / EIN</label><input type="text" value={store.taxId} onChange={e=>setStore({...store,taxId:e.target.value})} className={INPUT}/></div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div onClick={()=>setStore({...store,showTax:!store.showTax})} className={`relative w-9 h-5 rounded-full transition-colors ${store.showTax?"bg-[#0A2E1A]":"bg-gray-200 dark:bg-gray-700"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${store.showTax?"translate-x-4":"translate-x-0.5"}`}/>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Show business registration on storefront</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Shipping Settings ── */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2"><Truck size={15} className="text-[#0A2E1A]"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Shipping Settings</h2></div>
          <p className="text-xs text-gray-400 hidden sm:block">Configure delivery zones, rates and collection days.</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3">
            <span className="col-span-3">State</span><span className="col-span-3">LGA</span><span className="col-span-3">Delivery Station</span>
            <span className="col-span-1 text-center">Days</span><span className="col-span-1 text-right">Rate</span><span className="col-span-1"/>
          </div>
          {zones.length===0&&(
            <div className="py-8 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2"><Truck size={16} className="text-gray-400"/></div>
              <p className="text-sm text-gray-400">No shipping zones yet.</p>
            </div>
          )}
          {zones.map(zone=>(
            <div key={zone.id} className="group rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-[#C8F135]/60 dark:hover:border-[#C8F135]/50 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-all">
              <div className="hidden sm:grid grid-cols-12 gap-2 items-center px-3 py-3">
                <div className="col-span-3"><p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{zone.state}</p></div>
                <div className="col-span-3"><p className="text-xs text-gray-600 dark:text-gray-400">{zone.lga}</p></div>
                <div className="col-span-3"><p className="text-xs text-gray-500 dark:text-gray-400 truncate">{zone.station}</p></div>
                <div className="col-span-1 text-center"><span className="text-xs font-semibold text-[#0A2E1A] bg-[#F7F4EE] dark:bg-[#0F1D14] px-1.5 py-0.5 rounded-full">{zone.collectionDays}d</span></div>
                <div className="col-span-1 text-right"><span className={`text-xs font-bold ${zone.amount===0?"text-green-600":"text-gray-800 dark:text-gray-100"}`}>{zone.amount===0?"Free":`₦${zone.amount.toLocaleString()}`}</span></div>
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button onClick={()=>setShippingModal({open:true,zone})} className="p-1.5 rounded-lg hover:bg-[#C8F135]/20 dark:hover:bg-[#153323] opacity-0 group-hover:opacity-100 transition-all"><Pencil size={12} className="text-[#0A2E1A]"/></button>
                  <button onClick={()=>setDeleteZoneId(zone.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12} className="text-red-500"/></button>
                </div>
              </div>
              <div className="sm:hidden p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div><p className="text-xs font-bold text-gray-800 dark:text-gray-100">{zone.station}</p><p className="text-[10px] text-gray-500 mt-0.5">{zone.lga}, {zone.state}</p></div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={()=>setShippingModal({open:true,zone})} className="p-1.5 rounded-lg hover:bg-[#C8F135]/20 dark:hover:bg-[#153323]"><Pencil size={12} className="text-[#0A2E1A]"/></button>
                    <button onClick={()=>setDeleteZoneId(zone.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40"><Trash2 size={12} className="text-red-500"/></button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#0A2E1A] bg-[#F7F4EE] dark:bg-[#0F1D14] px-2 py-0.5 rounded-full flex items-center gap-1"><Calendar size={9}/>{zone.collectionDays} day{zone.collectionDays!==1?"s":""}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${zone.amount===0?"bg-green-50 dark:bg-green-950/30 text-green-600":"bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>{zone.amount===0?"🎉 Free":`₦${zone.amount.toLocaleString()}`}</span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={()=>setShippingModal({open:true,zone:null})} className="flex items-center gap-2 text-xs font-medium text-[#0A2E1A] hover:text-[#060F09] px-1 pt-1"><Plus size={13}/>Add New Shipping Zone</button>
          {zones.length>0&&(
            <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3 text-xs text-gray-400">
              <span>{zones.length} zone{zones.length!==1?"s":""} configured</span><span>·</span>
              <span className="text-green-600 font-medium">{zones.filter(z=>z.amount===0).length} free delivery</span><span>·</span>
              <span>Avg. {(zones.reduce((s,z)=>s+z.collectionDays,0)/zones.length).toFixed(1)} days collection</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Bank & Socials ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className={sectionClass}>
          <div className={headerClass}><CreditCard size={15} className="text-[#0A2E1A]"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Bank & Payouts</h2></div>
          <div className="p-5 space-y-3">
            {bankDetails.accountName ? (
              <div className="p-3 rounded-xl border border-green-100 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#0A2E1A] flex items-center justify-center text-[#C8F135] text-[10px] font-bold shrink-0">{bankDetails.bankName.slice(0,2).toUpperCase()}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{bankDetails.bankName}</p>
                      <p className="text-[10px] text-green-600 font-medium">{bankDetails.accountName}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{"•".repeat(6)+bankDetails.accountNumber.slice(-4)}</p>
                    </div>
                  </div>
                  <button onClick={()=>setShowBankModal(true)} className="text-[10px] font-semibold text-[#0A2E1A] bg-[#F7F4EE] dark:bg-[#0F1D14] px-2 py-0.5 rounded-full hover:bg-[#C8F135]/20 transition-colors">Change</button>
                </div>
              </div>
            ):(
              <button onClick={()=>setShowBankModal(true)} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-[#F7F4EE] dark:group-hover:bg-[#0F1D14] flex items-center justify-center transition-colors shrink-0">
                  <CreditCard size={16} className="text-gray-400 group-hover:text-[#0A2E1A]"/>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Add Bank Account</p>
                  <p className="text-[10px] text-gray-400">Click to set up your payout account</p>
                </div>
              </button>
            )}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-gray-400">Next scheduled: 10/24 2025</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">₦1,620,000</p>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className={headerClass}><Share2 size={15} className="text-indigo-500"/><h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Socials</h2></div>
          <div className="p-5 space-y-3">
            {[{label:"X / Twitter",placeholder:"@handle",key:"twitterX"},{label:"Instagram",placeholder:"@yourstore",key:"twitter"},{label:"Facebook",placeholder:"facebook.com/store",key:"facebook"}].map(s=>(
              <div key={s.key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">{s.label}</label>
                <input type="text" placeholder={s.placeholder} value={(store as any)[s.key]} onChange={e=>setStore({...store,[s.key]:e.target.value})} className={INPUT}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Domain Settings ── */}
      <DomainSettings />

      {/* Footer */}
      <div className="flex flex-col xs:flex-row items-center justify-between gap-3 pt-1 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400">All changes automatically synced to store.</p>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Discard Changes</button>
          <button onClick={handleSave} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">Save Changes</button>
        </div>
      </div>

      {/* ── Modals ── */}
      {shippingModal.open&&<ShippingModal zone={shippingModal.zone} onClose={()=>setShippingModal({open:false,zone:null})} onSave={handleSaveZone}/>}

      {deleteZoneId!==null&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={()=>setDeleteZoneId(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center" onClick={e=>e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center mx-auto"><Trash2 size={20} className="text-red-500"/></div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">Delete Shipping Zone?</h3>
              <p className="text-xs text-gray-400 mt-1">This zone will be permanently removed. This action cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setDeleteZoneId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button onClick={()=>handleDeleteZone(deleteZoneId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showBankModal&&<BankModal current={bankDetails} onClose={()=>setShowBankModal(false)} onSave={b=>{ setBankDetails(b); setShowBankModal(false); }}/>}
    </div>
  );
}