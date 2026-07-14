// app/store/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart, Search, Heart, User, Star, Package,
  X, Check, CreditCard, Minus, Plus, ArrowRight, Car, Watch, Shirt, Droplet, Smartphone, Home, Package as PackageIcon,
  Crown, Sofa, Book, Music2, Flower, ToyBrick, PhoneIcon,
  Truck, ShoppingBag, Wrench, Dumbbell, Camera, Coffee,
  Rocket, Gem, Pizza, Headphones, Brush
} from "lucide-react";

// ── Types ──
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status?: string;
  featured?: boolean;
}

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface Template {
  id: string;
  name: string;
  industry: string;
  icon: any;
  heroIcon: any;
  description: string;
  pages: string[];
  colorPalette: string[];
  popular?: boolean;
  featured?: boolean;
  productStyle: "grid" | "list" | "carousel";
  headerStyle: "centered" | "left" | "right";
  footerStyle: "simple" | "detailed" | "minimal";
  demoProducts: Product[];
}

// ── TEMPLATES DATA ──
const TEMPLATES: Template[] = [
  {
    id: "luxury-cars",
    name: "Luxury Cars",
    industry: "Automotive",
    icon: Car,
    heroIcon: Car,
    description: "Premium automotive showroom with vehicle listings and test drive booking.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
    popular: true,
    featured: true,
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 1, name: "Mercedes-Benz S-Class", description: "Luxury sedan with V8 engine", price: 45000000, image: "", category: "Cars", stock: 5, status: "Active" },
      { id: 2, name: "BMW 7 Series", description: "Executive luxury sedan", price: 38000000, image: "", category: "Cars", stock: 3, status: "Active" },
      { id: 3, name: "Audi A8", description: "Premium luxury sedan", price: 35000000, image: "", category: "Cars", stock: 4, status: "Active" },
      { id: 4, name: "Lexus LS", description: "Japanese luxury sedan", price: 32000000, image: "", category: "Cars", stock: 6, status: "Active" },
      { id: 5, name: "Porsche Panamera", description: "Sport luxury sedan", price: 55000000, image: "", category: "Cars", stock: 2, status: "Active" },
    ]
  },
  {
    id: "fashion-store",
    name: "Fashion Store",
    industry: "Fashion",
    icon: Shirt,
    heroIcon: Shirt,
    description: "Stylish fashion template with lookbooks, size guides, and quick checkout.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#2d2d2d", "#f5f0eb", "#b8a99c", "#c0392b"],
    popular: true,
    featured: true,
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 201, name: "Premium Cotton T-Shirt", description: "100% organic cotton t-shirt", price: 12500, image: "", category: "Clothing", stock: 45, status: "Active" },
      { id: 202, name: "Denim Jeans", description: "Classic fit denim jeans", price: 25000, image: "", category: "Clothing", stock: 30, status: "Active" },
      { id: 203, name: "Leather Jacket", description: "Genuine leather jacket", price: 65000, image: "", category: "Outerwear", stock: 15, status: "Active" },
      { id: 204, name: "Summer Dress", description: "Floral summer dress", price: 18000, image: "", category: "Dresses", stock: 25, status: "Active" },
    ]
  },
  {
    id: "electronics-store",
    name: "Electronics Store",
    industry: "Electronics",
    icon: PhoneIcon,
    heroIcon: PhoneIcon,
    description: "Tech-focused template with product specs, comparisons, and reviews.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#0a0a1a", "#1a1a3e", "#00d4ff", "#f5f5f5"],
    popular: true,
    featured: true,
    productStyle: "grid",
    headerStyle: "left",
    footerStyle: "detailed",
    demoProducts: [
      { id: 701, name: "Smartphone Pro Max", description: "6.9-inch OLED, 5G, 12GB RAM", price: 850000, image: "", category: "Phones", stock: 20, status: "Active" },
      { id: 702, name: "Wireless Headphones", description: "Active noise cancellation, 30hr battery", price: 125000, image: "", category: "Audio", stock: 35, status: "Active" },
      { id: 703, name: "Smart TV 65\"", description: "4K OLED Smart TV", price: 1800000, image: "", category: "TVs", stock: 10, status: "Active" },
      { id: 704, name: "Laptop Pro", description: "16GB RAM, 512GB SSD, 14\" screen", price: 1250000, image: "", category: "Laptops", stock: 15, status: "Active" },
    ]
  },
  {
    id: "perfume-store",
    name: "Perfume Store",
    industry: "Beauty",
    icon: Droplet,
    heroIcon: Droplet,
    description: "Scent-focused with immersive branding, fragrance notes, and gift sets.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#f5e6d3", "#d4a574", "#8b5a2b", "#2c1810"],
    popular: true,
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 501, name: "Oud & Rose EDP", description: "Luxury oud and rose fragrance", price: 45000, image: "", category: "Perfumes", stock: 20, status: "Active" },
      { id: 502, name: "Citrus Summer EDT", description: "Fresh citrus summer scent", price: 28000, image: "", category: "Perfumes", stock: 30, status: "Active" },
      { id: 503, name: "Vanilla & Amber EDP", description: "Warm vanilla and amber fragrance", price: 35000, image: "", category: "Perfumes", stock: 25, status: "Active" },
      { id: 504, name: "Fresh Musk EDP", description: "Clean musk fragrance", price: 32000, image: "", category: "Perfumes", stock: 15, status: "Active" },
    ]
  },
  {
    id: "jewelry-store",
    name: "Jewelry Store",
    industry: "Jewelry",
    icon: Crown,
    heroIcon: Crown,
    description: "Luxury jewelry template with elegant galleries and gift suggestions.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#1a1a1a", "#c9a84c", "#f5f0eb", "#2d1b2e"],
    featured: true,
    productStyle: "carousel",
    headerStyle: "centered",
    footerStyle: "minimal",
    demoProducts: [
      { id: 901, name: "Diamond Engagement Ring", description: "1.5ct diamond ring", price: 3500000, image: "", category: "Rings", stock: 5, status: "Active" },
      { id: 902, name: "Gold Necklace", description: "18k gold chain with pendant", price: 850000, image: "", category: "Necklaces", stock: 8, status: "Active" },
      { id: 903, name: "Silver Bracelet", description: "Sterling silver bracelet", price: 250000, image: "", category: "Bracelets", stock: 12, status: "Active" },
    ]
  },
  {
    id: "furniture-store",
    name: "Furniture Store",
    industry: "Furniture",
    icon: Sofa,
    heroIcon: Sofa,
    description: "Modern furniture template with room visualizations and design inspiration.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#2c1810", "#8b7355", "#d4c5a9", "#f5f0eb"],
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 1001, name: "Luxury Sofa Set", description: "3-seater leather sofa", price: 450000, image: "", category: "Living Room", stock: 8, status: "Active" },
      { id: 1002, name: "Dining Table", description: "6-seater wooden dining table", price: 280000, image: "", category: "Dining", stock: 10, status: "Active" },
      { id: 1003, name: "King Size Bed", description: "Upholstered king bed frame", price: 350000, image: "", category: "Bedroom", stock: 6, status: "Active" },
      { id: 1004, name: "Office Desk", description: "Modern standing desk", price: 180000, image: "", category: "Office", stock: 12, status: "Active" },
    ]
  },
  {
    id: "book-store",
    name: "Book Store",
    industry: "Books",
    icon: Book,
    heroIcon: Book,
    description: "Bookstore with author spotlights, reading lists, and event promotions.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#2d1b2e", "#8b5a2b", "#d4a574", "#f5e6d3"],
    productStyle: "list",
    headerStyle: "left",
    footerStyle: "simple",
    demoProducts: [
      { id: 1101, name: "The Nigerian Dream", description: "A story of ambition", price: 8500, image: "", category: "Fiction", stock: 50, status: "Active" },
      { id: 1102, name: "Business in Nigeria", description: "Guide to entrepreneurship", price: 12000, image: "", category: "Business", stock: 30, status: "Active" },
      { id: 1103, name: "Cooking Made Easy", description: "Nigerian recipes", price: 7500, image: "", category: "Cooking", stock: 40, status: "Active" },
    ]
  },
  {
    id: "music-store",
    name: "Music Store",
    industry: "Music",
    icon: Music2,
    heroIcon: Music2,
    description: "Music store with instrument listings, artists, and event calendar.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#1a1a2e", "#e94560", "#0f3460", "#f5f5f5"],
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 1201, name: "Acoustic Guitar", description: "Full-size acoustic guitar", price: 85000, image: "", category: "Guitars", stock: 15, status: "Active" },
      { id: 1202, name: "Digital Piano", description: "88-key weighted keyboard", price: 250000, image: "", category: "Keyboards", stock: 8, status: "Active" },
      { id: 1203, name: "Studio Headphones", description: "Professional monitoring headphones", price: 45000, image: "", category: "Audio", stock: 20, status: "Active" },
    ]
  },
  {
    id: "flower-store",
    name: "Flower Store",
    industry: "Flowers",
    icon: Flower,
    heroIcon: Flower,
    description: "Flower shop with arrangement guides, seasonal collections, and delivery.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#fdf6f0", "#d4a0a8", "#8b5a2b", "#2c1810"],
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "detailed",
    demoProducts: [
      { id: 1301, name: "Rose Bouquet", description: "12 red roses with greenery", price: 18000, image: "", category: "Bouquets", stock: 20, status: "Active" },
      { id: 1302, name: "Lily Arrangement", description: "White lilies in vase", price: 25000, image: "", category: "Arrangements", stock: 15, status: "Active" },
      { id: 1303, name: "Mixed Flowers", description: "Seasonal mixed flower bunch", price: 12000, image: "", category: "Bunches", stock: 30, status: "Active" },
    ]
  },
  {
    id: "toys-store",
    name: "Toys Store",
    industry: "Toys",
    icon: ToyBrick,
    heroIcon: ToyBrick,
    description: "Colorful toy store with age filters, gift finders, and play guides.",
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Order Success", "Profile", "About", "Contact"],
    colorPalette: ["#ff6b35", "#4ecdc4", "#ffe66d", "#f5f5f5"],
    productStyle: "grid",
    headerStyle: "centered",
    footerStyle: "simple",
    demoProducts: [
      { id: 1401, name: "Building Blocks Set", description: "1000-piece building blocks", price: 15000, image: "", category: "Blocks", stock: 25, status: "Active" },
      { id: 1402, name: "Remote Control Car", description: "RC car with rechargeable battery", price: 28000, image: "", category: "RC Toys", stock: 12, status: "Active" },
      { id: 1403, name: "Educational Puzzle", description: "Wooden educational puzzle", price: 8500, image: "", category: "Educational", stock: 30, status: "Active" },
    ]
  },
];

// ── Custom Social Icons ──
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// ── Checkout Modal ──
function CheckoutModal({ cart, onClose, onComplete }: { cart: CartItem[]; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<"cart" | "checkout" | "complete">("cart");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", paymentMethod: "card" });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <p className="text-sm font-bold text-[#C8F135]">₦{item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
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
  const currentYear = new Date().getFullYear();

  // ── Load Data ──
  useEffect(() => {
    const loadData = () => {
      try {
        // Load template from localStorage
        const storedTemplate = localStorage.getItem('storeTemplate');
        if (storedTemplate) {
          const parsed = JSON.parse(storedTemplate);
          setTemplate(parsed);
        }

        // ── FIX: Load products from localStorage ──
        const storedProducts = localStorage.getItem('marketpro_products');
        console.log("📦 Stored products:", storedProducts);
        
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts);
          console.log("📋 All products:", allProducts);
          
          // Show only active products with stock > 0
          const activeProducts = allProducts.filter((p: Product) => 
            p.status === "Active" && p.stock > 0
          );
          console.log("✅ Active products:", activeProducts);
          setProducts(activeProducts);
        } else {
          console.log("⚠️ No products in localStorage, using demo products");
          // Fallback: use demo products from selected template
          const storedTemplate = localStorage.getItem('storeTemplate');
          if (storedTemplate) {
            const parsed = JSON.parse(storedTemplate);
            const selectedTemplate = TEMPLATES.find((t: any) => t.id === parsed.selectedTemplate);
            if (selectedTemplate?.demoProducts) {
              setProducts(selectedTemplate.demoProducts);
            }
          }
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
        image: product.image || "", 
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

  // ── Use template data or fallback ──
  const storeInfo = template?.storeInfo || {
    name: "My Store",
    tagline: "Welcome to my store",
    email: "hello@mystore.com",
    phone: "+234 800 000 0000",
    address: "Lagos, Nigeria",
  };

  const design = template?.design || {
    primaryColor: "#0A2E1A",
    secondaryColor: "#C8F135",
    accentColor: "#4F46E5",
    fontFamily: "Inter",
    buttonStyle: "rounded-full",
    spacing: "comfortable",
    animation: true,
    darkMode: false,
  };

  const socialLinks = template?.socialLinks || {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  };

  const pages = template?.pages || {
    home: true,
    shop: true,
    productDetail: true,
    cart: true,
    checkout: true,
    orderSuccess: true,
    profile: true,
    about: true,
    contact: true,
  };

  // ── Get hero icon from template ──
  const selectedTemplateId = template?.selectedTemplate || "fashion-store";
  
  const HeroIcon = 
    selectedTemplateId === "luxury-cars" ? Car :
    selectedTemplateId === "fashion-store" ? Shirt :
    selectedTemplateId === "electronics-store" ? PhoneIcon :
    selectedTemplateId === "perfume-store" ? Droplet :
    selectedTemplateId === "jewelry-store" ? Crown :
    selectedTemplateId === "furniture-store" ? Sofa :
    selectedTemplateId === "book-store" ? Book :
    selectedTemplateId === "music-store" ? Music2 :
    selectedTemplateId === "flower-store" ? Flower :
    selectedTemplateId === "toys-store" ? ToyBrick :
    ShoppingBag;

  // ── Render Storefront ──
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" style={{ fontFamily: design.fontFamily || "Inter" }}>
      
      {/* ── HEADER ── */}
      {pages.home !== false && (
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: design.secondaryColor || "#C8F135" }}>
                  {storeInfo.name?.slice(0, 2).toUpperCase() || "ST"}
                </div>
                <div>
                  <span className="text-sm font-bold" style={{ color: design.primaryColor || "#0A2E1A" }}>
                    {storeInfo.name || "My Store"}
                  </span>
                  <p className="text-[10px] text-gray-400">{storeInfo.tagline || "Welcome"}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Search size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><Heart size={18} /></button>
                <button onClick={() => setShowCheckout(true)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg relative">
                  <ShoppingCart size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: design.secondaryColor || "#C8F135" }}>
                      {totalItems}
                    </span>
                  )}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><User size={18} /></button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ── HERO ── */}
      {pages.home !== false && (
        <section className="relative py-16 text-center text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${design.primaryColor || "#0A2E1A"}, ${design.accentColor || "#4F46E5"})` }}>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/20">
              <HeroIcon size={32} className="text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Welcome to {storeInfo.name || "Our Store"}</h1>
            <p className="text-white/70 text-lg mt-3">{storeInfo.tagline || "Discover premium products"}</p>
            <button className={`mt-6 px-8 py-3 text-sm font-semibold transition-colors ${design.buttonStyle || "rounded-full"}`} style={{ backgroundColor: design.secondaryColor || "#C8F135", color: design.primaryColor || "#0A2E1A" }}>
              Shop Now →
            </button>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ── */}
      {pages.shop !== false && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: design.primaryColor || "#0A2E1A" }}>
              Featured Products
            </h2>
            <button className="text-sm font-medium" style={{ color: design.secondaryColor || "#C8F135" }}>
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <PackageIcon size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No products available yet</p>
                <p className="text-gray-400 text-xs mt-1">Check back soon for new arrivals</p>
              </div>
            ) : (
              products.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-all group">
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <PackageIcon size={32} className="text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">{product.category || "Product"}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500">4.5 (128)</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-sm font-bold" style={{ color: design.secondaryColor || "#C8F135" }}>
                        ₦{product.price.toLocaleString()}
                      </p>
                      {product.stock > 0 ? (
                        <button 
                          onClick={() => addToCart(product)}
                          className={`px-3 py-1 text-[10px] font-semibold transition-colors ${design.buttonStyle || "rounded-full"}`}
                          style={{ backgroundColor: design.primaryColor || "#0A2E1A", color: "white" }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="text-[10px] text-red-500 font-medium">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      {pages.contact !== false && (
        <footer className="py-8 border-t border-gray-200 dark:border-gray-700" style={{ backgroundColor: design.primaryColor + "05" || "#f5f5f5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="font-semibold" style={{ color: design.primaryColor || "#0A2E1A" }}>{storeInfo.name || "My Store"}</p>
                <p className="text-gray-500 mt-1">{storeInfo.address || "Lagos, Nigeria"}</p>
                <p className="text-gray-500">{storeInfo.phone || "+234 800 000 0000"}</p>
                <p className="text-gray-500">{storeInfo.email || "hello@store.com"}</p>
              </div>
              <div>
                <p className="font-semibold" style={{ color: design.primaryColor || "#0A2E1A" }}>Quick Links</p>
                <ul className="space-y-1 mt-1 text-gray-500">
                  <li><button className="hover:text-[#0A2E1A]">About Us</button></li>
                  <li><button className="hover:text-[#0A2E1A]">Contact</button></li>
                  <li><button className="hover:text-[#0A2E1A]">FAQ</button></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold" style={{ color: design.primaryColor || "#0A2E1A" }}>Customer Service</p>
                <ul className="space-y-1 mt-1 text-gray-500">
                  <li><button className="hover:text-[#0A2E1A]">Shipping Policy</button></li>
                  <li><button className="hover:text-[#0A2E1A]">Returns</button></li>
                  <li><button className="hover:text-[#0A2E1A]">Privacy Policy</button></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold" style={{ color: design.primaryColor || "#0A2E1A" }}>Follow Us</p>
                <div className="flex gap-3 mt-1">
                  {socialLinks.facebook && <FacebookIcon className="w-4 h-4 text-gray-400 hover:text-[#0A2E1A] cursor-pointer" />}
                  {socialLinks.instagram && <InstagramIcon className="w-4 h-4 text-gray-400 hover:text-[#0A2E1A] cursor-pointer" />}
                  {socialLinks.twitter && <TwitterIcon className="w-4 h-4 text-gray-400 hover:text-[#0A2E1A] cursor-pointer" />}
                  {socialLinks.youtube && <YoutubeIcon className="w-4 h-4 text-gray-400 hover:text-[#0A2E1A] cursor-pointer" />}
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  © {currentYear} {storeInfo.name || "My Store"}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* ── Checkout Modal ── */}
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