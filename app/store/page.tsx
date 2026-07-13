"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  Heart,
  User,
  Star,
  X,
  Check,
  CreditCard,
  Minus,
  Plus,
  Package,
  ImageIcon
} from "lucide-react";

// ── Types ──
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  comparePrice?: number;
  category: string;
  images: string[];
  stock: number;
  status: "Active" | "Draft" | "Out of Stock";
  sku: string;
  featured: boolean;
  vendor?: string;
  tags?: string[];
}

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: string;
  image: string;
  stock: number;
}

// ── Custom Social Icons ──
const FacebookIconComponent = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIconComponent = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIconComponent = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIconComponent = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// ── Product Image Component ──
function ProductImage({ image, name, className = "" }: { image?: string; name: string; className?: string }) {
  const [imgError, setImgError] = useState(false);
  
  // If there's an image URL, try to display it
  if (image && !imgError) {
    return (
      <img 
        src={image} 
        alt={name} 
        className={`${className} object-cover`}
        onError={() => setImgError(true)}
      />
    );
  }
  
  // Fallback: show placeholder with store name initials
  return (
    <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
      <div className="flex flex-col items-center">
        <ImageIcon size={24} className="text-gray-400" />
        <span className="text-[10px] text-gray-400 mt-1">No image</span>
      </div>
    </div>
  );
}

// ── Checkout Modal ──
function CheckoutModal({ cart, onClose, onComplete }: { cart: CartItem[]; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<"cart" | "checkout" | "complete">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", paymentMethod: "card" });

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  if (step === "complete") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Placed! 🎉</h3>
          <p className="text-sm text-gray-500 mt-2">Thank you for your order!</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors" style={{ backgroundColor: "#0A2E1A" }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step === "cart" ? "Shopping Cart" : "Checkout"}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {step === "cart" ? (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-sm font-bold text-[#C8F135]">{item.price}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span style={{ color: "#C8F135" }}>₦{(total + 2000).toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => setStep("checkout")} className="w-full py-3 rounded-lg text-white font-semibold" style={{ backgroundColor: "#0A2E1A" }}>
                    Proceed to Checkout →
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label><input type="text" className="w-full px-3 py-2 text-sm border rounded-lg" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><input type="email" className="w-full px-3 py-2 text-sm border rounded-lg" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Phone</label><input type="tel" className="w-full px-3 py-2 text-sm border rounded-lg" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Address</label><input type="text" className="w-full px-3 py-2 text-sm border rounded-lg" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">City</label><input type="text" className="w-full px-3 py-2 text-sm border rounded-lg" /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">State</label><select className="w-full px-3 py-2 text-sm border rounded-lg"><option>Lagos</option><option>Abuja</option></select></div>
              </div>
              <button onClick={() => setStep("complete")} className="w-full py-3 rounded-lg text-white font-semibold" style={{ backgroundColor: "#0A2E1A" }}>Place Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Storefront ──
export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<any>(null);

  // ── Load Products and Template ──
  useEffect(() => {
    const loadData = () => {
      try {
        // Load template
        const storedTemplate = localStorage.getItem('storeTemplate');
        if (storedTemplate) {
          setTemplate(JSON.parse(storedTemplate));
        }

        // Load products
        const storedProducts = localStorage.getItem('marketpro_products');
        
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts);
          
          // Only show active products with stock > 0
          const activeProducts = allProducts.filter((p: Product) => {
            return p.status === "Active" && p.stock > 0;
          });
          
          setProducts(activeProducts);
        } else {
          // Default products
          const defaultProducts: Product[] = [
            { 
              id: 1, 
              name: "Premium Wireless Headphones", 
              description: "", 
              price: "₦45,000", 
              category: "Electronics", 
              images: [], 
              stock: 50, 
              status: "Active", 
              sku: "SKU-001", 
              featured: true,
              vendor: "AudioPro"
            },
            { 
              id: 2, 
              name: "Handcrafted Leather Bag", 
              description: "", 
              price: "₦35,000", 
              category: "Fashion", 
              images: [], 
              stock: 25, 
              status: "Active", 
              sku: "SKU-002", 
              featured: false 
            },
          ];
          setProducts(defaultProducts);
          localStorage.setItem('marketpro_products', JSON.stringify(defaultProducts));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.images?.[0] || "", 
        quantity: 1, 
        stock: product.stock 
      }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C8F135] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-400">Loading store...</p>
        </div>
      </div>
    );
  }

  const { storeInfo, design, sections, socialLinks } = template || {};

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" style={{ fontFamily: design?.fontFamily || "Inter" }}>
      
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: design?.secondaryColor || "#C8F135" }}>
                {storeInfo?.name?.slice(0, 2).toUpperCase() || "ST"}
              </div>
              <div>
                <span className="text-sm font-bold" style={{ color: design?.primaryColor || "#0A2E1A" }}>{storeInfo?.name || "My Store"}</span>
                <p className="text-[10px] text-gray-400">{storeInfo?.tagline || "Welcome"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Search size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Heart size={18} /></button>
              <button onClick={() => setShowCheckout(true)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg relative">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: design?.secondaryColor || "#C8F135" }}>
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><User size={18} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-16 text-center text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${design?.primaryColor || "#0A2E1A"}, ${design?.accentColor || "#4F46E5"})` }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Welcome to {storeInfo?.name || "Our Store"}</h1>
          <p className="text-white/70 text-lg mt-3">{storeInfo?.tagline || "Discover premium products"}</p>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: design?.primaryColor || "#0A2E1A" }}>
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.filter(p => p.featured).length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">No featured products yet</p>
          ) : (
            products.filter(p => p.featured).map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-all">
                <ProductImage 
                  image={product.images?.[0]} 
                  name={product.name}
                  className="w-full h-40 rounded-lg mb-3"
                />
                <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{product.name}</p>
                <p className="text-sm font-bold mt-1" style={{ color: design?.secondaryColor || "#C8F135" }}>{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`mt-2 w-full px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    product.stock > 0 
                      ? "bg-[#0A2E1A] text-white hover:bg-[#060F09]" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── ALL PRODUCTS ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6" style={{ color: design?.primaryColor || "#0A2E1A" }}>
          All Products
        </h2>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No products available yet</p>
            <p className="text-gray-400 text-xs mt-1">Check back soon for new arrivals</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-all">
                <div className="relative">
                  <ProductImage 
                    image={product.images?.[0]} 
                    name={product.name}
                    className="w-full h-40 rounded-lg mb-3"
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Low Stock ({product.stock})
                    </span>
                  )}
                  {product.stock <= 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category}</p>
                <p className="text-sm font-bold mt-1" style={{ color: design?.secondaryColor || "#C8F135" }}>{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`mt-2 w-full px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    product.stock > 0 
                      ? "bg-[#0A2E1A] text-white hover:bg-[#060F09]" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm" style={{ color: design?.primaryColor || "#0A2E1A" }}>© 2025 {storeInfo?.name || "My Store"}. All rights reserved.</p>
        </div>
      </footer>

      {/* ── Checkout ── */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onComplete={() => setCart([])}
        />
      )}
    </div>
  );
}