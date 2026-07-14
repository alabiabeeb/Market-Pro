"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    // Update cart logic
  };

  const removeItem = (id: number) => {
    // Remove item logic
  };

  const total = cartItems.reduce((sum, item: any) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <div className="flex justify-center py-10"><div className="w-8 h-8 border-2 border-[#C8F135] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/store" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Link href="/store" className="inline-block mt-4 px-6 py-2 bg-[#0A2E1A] text-[#C8F135] rounded-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[#C8F135] font-bold">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-lg hover:bg-gray-100">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-lg hover:bg-gray-100">
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="font-semibold">₦2,000</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[#C8F135]">₦{(total + 2000).toLocaleString()}</span>
              </div>
            </div>
            <Link href="/store/checkout" className="block w-full mt-4 py-3 bg-[#0A2E1A] text-[#C8F135] rounded-lg text-center font-semibold hover:opacity-90 transition-all">
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}