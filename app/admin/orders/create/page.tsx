"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, Plus, Minus, Trash2, ShoppingBag,
  User, Calendar, Tag, X, ChevronRight, Check,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Product { id: number; name: string; sku: string; price: number; stock: number; demand?: string; image?: string; }
interface CartItem extends Product { qty: number; }

// ── Mock data ──────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 1, name: "Aura Wireless Headphones",  sku: "SKU-AWH-PRO-1", price: 299.00, stock: 42, demand: "High Demand" },
  { id: 2, name: "Chrono Smartwatch v2",       sku: "SKU-SW-CHRON-M", price: 398.00, stock: 15 },
  { id: 3, name: "Ergonomic Office Chair",     sku: "SKU-CHAIR-001",  price: 299.00, stock: 145 },
  { id: 4, name: "Wireless Mechanical Keyboard",sku: "SKU-KB-002",   price: 149.50, stock: 12 },
  { id: 5, name: "Minimalist Desk Lamp",       sku: "SKU-LMP-004",   price: 89.00,  stock: 50 },
  { id: 6, name: "USB-C Hub 7-in-1",           sku: "SKU-HUB-006",   price: 59.99,  stock: 200 },
];

const CUSTOMERS = [
  { id: 1, name: "Jane Doe",        email: "jane@example.com",    initials: "JD", color: "bg-blue-500" },
  { id: 2, name: "Alex Smith",      email: "alex@example.com",    initials: "AS", color: "bg-orange-400" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", initials: "MJ", color: "bg-purple-500" },
  { id: 4, name: "Emily White",     email: "emily@example.com",   initials: "EW", color: "bg-teal-500" },
  { id: 5, name: "Omar Hassan",     email: "omar@example.com",    initials: "OH", color: "bg-green-500" },
];

const TAGS = ["High Priority", "Q4 Campaign", "VIP Customer", "Bulk Order", "Rush"];
const CHANNELS = ["Online Store", "In-Store", "Phone", "Wholesale"];
const SHIPPING_OPTIONS = [
  { label: "Standard (5–7 days)",  price: 0,    id: "standard" },
  { label: "Express (2–3 days)",   price: 25,   id: "express" },
  { label: "Overnight (1 day)",    price: 45,   id: "overnight" },
];

// ── Steps ──────────────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Order Details" },
  { num: 2, label: "Items & Pricing" },
  { num: 3, label: "Payment & Shipping" },
];

// ── Step Indicator ─────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-6 sm:mb-8">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex items-center gap-2 shrink-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              current > s.num ? "bg-[#0A2E1A] text-[#C8F135]" :
              current === s.num ? "bg-[#0A2E1A] text-[#C8F135] ring-4 ring-[#C8F135]/30" :
              "bg-gray-100 text-gray-400"
            }`}>
              {current > s.num ? <Check size={13} /> : s.num}
            </div>
            <span className={`text-xs font-medium hidden sm:block transition-colors ${current >= s.num ? "text-gray-800" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px flex-1 mx-2 sm:mx-3 transition-colors ${current > s.num ? "bg-[#0A2E1A]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function CreateOrderPage() {
  const router = useRouter();
  const [step, setStep]           = useState(1);
  const [done, setDone]           = useState(false);

  // Step 1
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0] | null>(null);
  const [orderDate, setOrderDate] = useState("10/27/2025");
  const [channel, setChannel]     = useState("Online Store");
  const [tags, setTags]           = useState<string[]>(["High Priority", "Q4 Campaign"]);
  const [tagInput, setTagInput]   = useState("");

  // Step 2
  const [productSearch, setProductSearch] = useState("");
  const [cart, setCart]           = useState<CartItem[]>([
    { ...PRODUCTS[0], qty: 1 },
    { ...PRODUCTS[1], qty: 2 },
  ]);

  // Step 3
  const [shipping, setShipping]   = useState("express");
  const [payMethod, setPayMethod] = useState("card");
  const [note, setNote]           = useState("");

  // ── Computed totals ──
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = SHIPPING_OPTIONS.find(s => s.id === shipping)?.price ?? 0;
  const tax       = +(subtotal * 0.049).toFixed(2);
  const total     = subtotal + shippingCost + tax;

  // ── Helpers ──
  const filteredCustomers = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id);
      return exists ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
    setProductSearch("");
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const toggleTag = (t: string) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const addCustomTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const canNext = step === 1 ? !!selectedCustomer : step === 2 ? cart.length > 0 : true;

  const handleSubmit = () => setDone(true);

  // ── Success screen ──
  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 px-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check size={28} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Order Created!</h2>
      <p className="text-sm text-gray-400 max-w-xs">Your order has been successfully created and is being processed.</p>
      <div className="bg-gray-50 rounded-xl px-6 py-4 text-left space-y-1.5 w-full max-w-xs">
        <p className="text-xs text-gray-400">Customer: <span className="font-semibold text-gray-700">{selectedCustomer?.name}</span></p>
        <p className="text-xs text-gray-400">Items: <span className="font-semibold text-gray-700">{cart.reduce((s,i)=>s+i.qty,0)}</span></p>
        <p className="text-xs text-gray-400">Total: <span className="font-bold text-[#0A2E1A]">${total.toFixed(2)}</span></p>
      </div>
      <div className="flex gap-3 w-full max-w-xs">
        <button onClick={() => router.push("/admin/orders")} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">View Orders</button>
        <button onClick={() => { setDone(false); setStep(1); setCart([]); setSelectedCustomer(null); }} className="flex-1 py-2.5 rounded-lg bg-[#0A2E1A] text-[#C8F135] text-sm font-medium hover:bg-[#060F09]">New Order</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => step > 1 ? setStep(s => s - 1) : router.push("/admin/orders")}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Create New Order</h1>
          <p className="text-xs text-gray-400">Market Pro Platform</p>
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT: Main content ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* ── STEP 1: Order Details ── */}
          {step === 1 && (
            <>
              {/* Customer Details */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <User size={14} className="text-indigo-500" />
                  <h2 className="text-sm font-semibold text-gray-800">Customer Details</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Search Customer</label>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Enter customer name, email or ID..."
                        value={customerSearch} onChange={e => setCustomerSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
                    </div>
                  </div>
                  {/* Customer results */}
                  {customerSearch && (
                    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                      {filteredCustomers.length === 0 ? (
                        <p className="text-xs text-gray-400 px-4 py-3">No customers found.</p>
                      ) : filteredCustomers.map(c => (
                        <button key={c.id} onClick={() => { setSelectedCustomer(c); setCustomerSearch(""); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 transition-colors border-b border-gray-50 last:border-0">
                          <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>{c.initials}</div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-gray-800">{c.name}</p>
                            <p className="text-[10px] text-gray-400">{c.email}</p>
                          </div>
                          {selectedCustomer?.id === c.id && <Check size={13} className="text-[#0A2E1A] ml-auto" />}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Selected customer */}
                  {selectedCustomer && !customerSearch && (
                    <div className="flex items-center gap-3 p-3 bg-[#F7F4EE] rounded-xl border border-[#E5E7EB]">
                      <div className={`w-9 h-9 rounded-full ${selectedCustomer.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{selectedCustomer.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800">{selectedCustomer.name}</p>
                        <p className="text-xs text-gray-500">{selectedCustomer.email}</p>
                      </div>
                      <button onClick={() => setSelectedCustomer(null)} className="p-1 rounded-lg hover:bg-[#C8F135]/20 transition-colors">
                        <X size={13} className="text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Date & Channel */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <Calendar size={14} className="text-indigo-500" />
                  <h2 className="text-sm font-semibold text-gray-800">Order Info</h2>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Order Date</label>
                    <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Channel</label>
                    <select value={channel} onChange={e => setChannel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white">
                      {CHANNELS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <Tag size={14} className="text-indigo-500" />
                  <h2 className="text-sm font-semibold text-gray-800">Tags & Categorization</h2>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <span key={t} className="flex items-center gap-1 text-xs font-medium bg-[#F7F4EE] text-[#0A2E1A] border border-[#E5E7EB] px-2.5 py-1 rounded-full">
                        {t}
                        <button onClick={() => toggleTag(t)} className="hover:text-red-500 transition-colors"><X size={11} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TAGS.filter(t => !tags.includes(t)).map(t => (
                      <button key={t} onClick={() => toggleTag(t)}
                        className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full hover:border-[#C8F135] hover:text-[#0A2E1A] transition-colors">
                        + {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add custom tag..." value={tagInput} onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addCustomTag()}
                      className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                    <button onClick={addCustomTag} className="px-3 py-2 bg-[#0A2E1A] text-[#C8F135] rounded-lg text-xs font-medium hover:bg-[#060F09] transition-colors">Add</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: Items & Pricing ── */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <ShoppingBag size={14} className="text-indigo-500" />
                <h2 className="text-sm font-semibold text-gray-800">Product Selection</h2>
                <span className="ml-auto text-xs text-[#0A2E1A] font-medium">{cart.reduce((s,i)=>s+i.qty,0)} items selected</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Product search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Add product by name or SKU..."
                    value={productSearch} onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                </div>

                {/* Search results */}
                {productSearch && (
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    {filteredProducts.map(p => (
                      <button key={p.id} onClick={() => addToCart(p)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/50 transition-colors border-b border-gray-50 last:border-0">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <ShoppingBag size={14} className="text-gray-400" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{p.sku} · Stock: {p.stock}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-800 shrink-0">${p.price.toFixed(2)}</p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Cart items */}
                <div className="space-y-3">
                  {cart.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">No products added yet.</p>
                  )}
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <ShoppingBag size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{item.sku}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[10px] text-gray-400">In Stock: {item.stock}</p>
                          {item.demand && <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">{item.demand}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-sm font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <Minus size={11} className="text-gray-600" />
                          </button>
                          <span className="text-xs font-semibold text-gray-800 w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <Plus size={11} className="text-gray-600" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors ml-1">
                            <Trash2 size={11} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Payment & Shipping ── */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Shipping */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-800">Shipping Method</h2>
                </div>
                <div className="p-5 space-y-2.5">
                  {SHIPPING_OPTIONS.map(s => (
                    <label key={s.id} className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${shipping === s.id ? "border-[#0A2E1A] bg-[#F7F4EE]" : "border-gray-100 hover:border-[#C8F135]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${shipping === s.id ? "border-[#0A2E1A] bg-[#0A2E1A]" : "border-gray-300"}`}>
                          {shipping === s.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{s.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${s.price === 0 ? "text-green-600" : "text-gray-800"}`}>
                        {s.price === 0 ? "Free" : `$${s.price.toFixed(2)}`}
                      </span>
                      <input type="radio" className="hidden" value={s.id} checked={shipping === s.id} onChange={() => setShipping(s.id)} />
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-800">Payment Method</h2>
                </div>
                <div className="p-5 grid grid-cols-3 gap-2.5">
                  {[
                    { id:"card",   label:"Credit Card" },
                    { id:"cash",   label:"Cash" },
                    { id:"bank",   label:"Bank Transfer" },
                  ].map(p => (
                    <button key={p.id} onClick={() => setPayMethod(p.id)}
                      className={`py-3 rounded-xl border-2 text-xs font-semibold transition-all ${payMethod === p.id ? "border-[#0A2E1A] bg-[#F7F4EE] text-[#0A2E1A]" : "border-gray-100 text-gray-500 hover:border-[#C8F135]"}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Note */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-800">Order Note <span className="text-gray-400 font-normal">(optional)</span></h2>
                </div>
                <div className="p-5">
                  <textarea rows={3} placeholder="Add a note for this order..." value={note} onChange={e => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-800">Order Summary</h2>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} className="text-[10px] text-red-500 hover:underline">Clear</button>
              )}
            </div>
            <div className="p-5 space-y-3">
              {cart.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No items added yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map(i => (
                    <div key={i.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate flex-1 mr-2">{i.name} ×{i.qty}</span>
                      <span className="font-semibold text-gray-800 shrink-0">${(i.price * i.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="font-medium text-gray-700">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping ({SHIPPING_OPTIONS.find(s=>s.id===shipping)?.label.split("(")[0].trim()})</span><span className="font-medium text-gray-700">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax (4.9%)</span><span className="font-medium text-gray-700">${tax.toFixed(2)}</span></div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">Total Amount</span>
                  <span className="text-lg font-bold text-[#0A2E1A]">${total.toFixed(2)}</span>
                </div>
                {selectedCustomer && <p className="text-[10px] text-gray-400 mt-1">Estimated delivery: Oct 28 – Oct 30</p>}
              </div>

              {/* Pro Tip */}
              <div className="bg-[#F7F4EE] border border-[#E5E7EB] rounded-xl p-3 space-y-1">
                <p className="text-[10px] font-semibold text-[#0A2E1A]">💡 Pro Tip</p>
                <p className="text-[10px] text-[#0A2E1A] leading-relaxed">Use ⌘ to quickly search for customers or products anywhere in the wizard.</p>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2 pt-1">
                {step < 3 ? (
                  <button onClick={() => canNext && setStep(s => s + 1)} disabled={!canNext}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold transition-all">
                    Continue <ChevronRight size={14} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={cart.length === 0}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold transition-all">
                    <Check size={14} /> Create Order
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Save Draft</button>
                  <button onClick={() => router.push("/admin/orders")} className="py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">Discard</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}