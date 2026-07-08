"use client";

import { useState } from "react";
import {
  MessageCircle, Mail, Phone, Book, ChevronDown, ChevronRight,
  Check, Search, X, Zap, Shield, CreditCard, Truck, Store,
} from "lucide-react";

const faqs = [
  { q: "How do I receive payments from buyers?",       cat: "Payments", a: "MarketPro supports Paystack, Flutterwave, OPay, PalmPay, Moniepoint, bank transfer and USSD. You choose which gateways to activate in your store settings. Funds are settled to your account within 24 hours." },
  { q: "Is BVN required to sign up?",                  cat: "Account",  a: "No. MarketPro does not require BVN at any point. We use NIN verification (optional) or CAC registration for business accounts. Personal stores can start without any identity document." },
  { q: "How does buyer protection work?",              cat: "Orders",   a: "When a buyer pays, the funds are held in escrow. Once the buyer confirms delivery (or after 48 hours with no dispute), the funds are released to your account. This protects both sides." },
  { q: "How do I set up my WhatsApp store link?",      cat: "Store",    a: "Go to Store Settings → Channels → WhatsApp. Copy your unique store link and share it in any WhatsApp chat. When a customer clicks it, they land on your checkout directly inside their browser." },
  { q: "Can I use my own domain name?",                cat: "Store",    a: "Yes. On the Growth plan and above, you can connect a custom domain (e.g. amakafashion.com) to your MarketPro store. Go to Settings → Domain → Add Custom Domain." },
  { q: "How do I book logistics / delivery?",          cat: "Shipping", a: "In your Orders dashboard, open any order and click 'Arrange Pickup'. You can book GIG Logistics, Kwik Delivery, or Sendbox. Pricing and estimated delivery time is shown before you confirm." },
  { q: "What happens if a buyer opens a dispute?",     cat: "Orders",   a: "You'll receive a notification immediately. Log in to your dashboard, go to Orders → Disputes, and respond within 48 hours with proof of delivery (photos, waybill, tracking number). Our team reviews and resolves within 72 hours." },
  { q: "Can I have multiple stores?",                  cat: "Account",  a: "Starter plan supports 1 store. Growth plan supports up to 3 stores. Enterprise has unlimited stores. You can switch between stores from your dashboard header." },
];

const categories = ["All", "Payments", "Orders", "Store", "Account", "Shipping"];

const resources = [
  { icon: Book,    title: "Getting Started Guide",      desc: "Set up your store in 10 minutes",         href: "#" },
  { icon: Shield,  title: "Buyer Protection Explained", desc: "How escrow works for merchants",          href: "#" },
  { icon: CreditCard, title: "Payment Gateway Setup",   desc: "Connect Paystack, OPay and more",         href: "#" },
  { icon: Truck,   title: "Shipping & Logistics",       desc: "Book GIG, Kwik and Sendbox deliveries",   href: "#" },
  { icon: Store,   title: "WhatsApp Store Link",        desc: "Turn WhatsApp chats into checkouts",      href: "#" },
  { icon: Zap,     title: "API Documentation",          desc: "Integrate MarketPro into your platform",  href: "#" },
];

export default function SupportPage() {
  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [ticket, setTicket]   = useState({ subject: "", message: "", email: "" });
  const [sent, setSent]       = useState(false);

  const filtered = faqs.filter(f => {
    const matchCat  = cat === "All" || f.cat === cat;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSend = () => {
    if (!ticket.subject || !ticket.message || !ticket.email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setTicket({ subject: "", message: "", email: "" }); }, 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">

      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Help & Support</h1>
        <p className="text-xs text-gray-400 mt-0.5">Find answers, reach our team, or browse the docs</p>
      </div>

      {/* Quick contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageCircle, label: "Live Chat",   sub: "Avg. reply: 2 minutes",    action: "Start chat",     color: "bg-indigo-600" },
          { icon: Mail,          label: "Email Us",    sub: "help@marketpro.ng",         action: "Send email",     color: "bg-violet-600" },
          { icon: Phone,         label: "Call Us",     sub: "Mon–Fri · 8AM–8PM WAT",     action: "0800-MARKET",    color: "bg-green-600" },
        ].map(({ icon: Icon, label, sub, action, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
            <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-white ${color} hover:opacity-90 transition-opacity w-fit`}>
              {action}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 space-y-3">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search questions..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-all ${
                  cat === c ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300 hover:text-indigo-600"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-400">No results for "{search}"</p>
              <button onClick={() => { setSearch(""); setCat("All"); }} className="text-xs text-indigo-600 hover:underline mt-1">Clear search</button>
            </div>
          ) : filtered.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    f.cat === "Payments" ? "bg-indigo-100 text-indigo-600" :
                    f.cat === "Orders"   ? "bg-green-100 text-green-700" :
                    f.cat === "Store"    ? "bg-violet-100 text-violet-600" :
                    f.cat === "Account"  ? "bg-orange-100 text-orange-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>{f.cat}</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{f.q}</span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 shrink-0 ml-3 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Help Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-50 dark:divide-gray-800">
          {resources.map(({ icon: Icon, title, desc, href }) => (
            <a key={title} href={href}
              className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                <Icon size={15} className="text-indigo-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                  {title} <ChevronRight size={11} />
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Submit a ticket */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Submit a Support Ticket</h2>
          <p className="text-xs text-gray-400 mt-0.5">Can't find what you need? We'll get back to you within 2 hours.</p>
        </div>
        <div className="p-5 space-y-4">
          {sent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check size={22} className="text-green-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Ticket submitted!</p>
              <p className="text-xs text-gray-400">We'll reply to your email within 2 hours.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Your Email</label>
                <input type="email" placeholder="you@example.com" value={ticket.email}
                  onChange={e => setTicket(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Subject</label>
                <input type="text" placeholder="e.g. I can't receive payments" value={ticket.subject}
                  onChange={e => setTicket(p => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Message</label>
                <textarea rows={4} placeholder="Describe your issue in detail..." value={ticket.message}
                  onChange={e => setTicket(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none" />
              </div>
              <button onClick={handleSend}
                disabled={!ticket.subject || !ticket.message || !ticket.email}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold transition-colors">
                Send Ticket
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}