// app/admin/template-builder/templates/index.ts

import {
  Car, Watch, Shirt, Droplet, Smartphone, Package,
  Crown, Sofa, Book, Music2, Flower, ToyBrick,
  Truck, ShoppingBag, Wrench, Dumbbell, Camera, Coffee,
  Rocket, Gem, Pizza, Headphones, Brush, Home,
  ShoppingCart, User, Heart, Star, Zap, Layers,
  Info, Phone, Mail, Gift, Award, Sparkles
} from "lucide-react";
import { Template, PageTemplate } from "../types";

// ── Shared Universal Pages ──
const UNIVERSAL_PAGES: PageTemplate[] = [
  { id: "cart", name: "Cart", slug: "/cart", enabled: true, required: true },
  { id: "checkout", name: "Checkout", slug: "/checkout", enabled: true, required: true },
  { id: "order-success", name: "Order Success", slug: "/order-success", enabled: true, required: true },
  { id: "profile", name: "Customer Profile", slug: "/profile", enabled: true, required: true },
  { id: "login", name: "Login", slug: "/login", enabled: true, required: true },
  { id: "register", name: "Register", slug: "/register", enabled: true, required: true },
  { id: "forgot-password", name: "Forgot Password", slug: "/forgot-password", enabled: true, required: true },
  { id: "order-history", name: "Order History", slug: "/orders", enabled: true, required: true },
  { id: "wishlist", name: "Wishlist", slug: "/wishlist", enabled: true },
  { id: "search", name: "Search", slug: "/search", enabled: true },
];

// ── Helper to create pages ──
const createPages = (customPages: PageTemplate[]): PageTemplate[] => {
  return [...UNIVERSAL_PAGES, ...customPages];
};

// ── Fashion Template ──
const FASHION_PAGES: PageTemplate[] = [
  { id: "home", name: "Home", slug: "/", enabled: true },
  { id: "shop", name: "Shop", slug: "/shop", enabled: true },
  { id: "collection", name: "Collection", slug: "/collections", enabled: true },
  { id: "product", name: "Product Detail", slug: "/product", enabled: true },
  { id: "about", name: "About Us", slug: "/about", enabled: true },
  { id: "contact", name: "Contact", slug: "/contact", enabled: true },
  { id: "blog", name: "Blog", slug: "/blog", enabled: false },
];

// ── Luxury Cars Template ──
const CARS_PAGES: PageTemplate[] = [
  { id: "home", name: "Home", slug: "/", enabled: true },
  { id: "inventory", name: "Inventory", slug: "/inventory", enabled: true },
  { id: "vehicle-details", name: "Vehicle Details", slug: "/vehicle", enabled: true },
  { id: "brands", name: "Brands", slug: "/brands", enabled: true },
  { id: "financing", name: "Financing", slug: "/financing", enabled: true },
  { id: "test-drive", name: "Book Test Drive", slug: "/test-drive", enabled: true },
  { id: "about", name: "About Us", slug: "/about", enabled: true },
  { id: "contact", name: "Contact", slug: "/contact", enabled: true },
];

// ── Furniture Template ──
const FURNITURE_PAGES: PageTemplate[] = [
  { id: "home", name: "Home", slug: "/", enabled: true },
  { id: "rooms", name: "Rooms", slug: "/rooms", enabled: true },
  { id: "collections", name: "Collections", slug: "/collections", enabled: true },
  { id: "product", name: "Product", slug: "/product", enabled: true },
  { id: "interior-ideas", name: "Interior Ideas", slug: "/interior-ideas", enabled: true },
  { id: "about", name: "About Us", slug: "/about", enabled: true },
  { id: "contact", name: "Contact", slug: "/contact", enabled: true },
];

// ── Electronics Template ──
const ELECTRONICS_PAGES: PageTemplate[] = [
  { id: "home", name: "Home", slug: "/", enabled: true },
  { id: "categories", name: "Categories", slug: "/categories", enabled: true },
  { id: "deals", name: "Deals", slug: "/deals", enabled: true },
  { id: "product", name: "Product", slug: "/product", enabled: true },
  { id: "brands", name: "Brands", slug: "/brands", enabled: true },
  { id: "support", name: "Support", slug: "/support", enabled: true },
  { id: "about", name: "About Us", slug: "/about", enabled: true },
  { id: "contact", name: "Contact", slug: "/contact", enabled: true },
];

// ── ALL TEMPLATES ──
export const TEMPLATES: Template[] = [
  // 1. Fashion Store
  {
    id: "fashion-store",
    name: "Fashion Store",
    industry: "Fashion",
    icon: Shirt,
    heroIcon: Shirt,
    description: "Stylish fashion template with lookbooks, size guides, and quick checkout.",
    pages: createPages(FASHION_PAGES),
    layouts: {
      header: "centered",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "masonry"
    },
    branding: {
      defaultColors: ["#2d2d2d", "#f5f0eb", "#b8a99c", "#c0392b"],
      defaultFont: "Poppins"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: true
    },
    popular: true,
    featured: true,
    demoProducts: [
      { id: 201, name: "Premium Cotton T-Shirt", description: "100% organic cotton t-shirt", price: 12500, image: "", category: "Clothing", stock: 45, status: "Active" },
      { id: 202, name: "Denim Jeans", description: "Classic fit denim jeans", price: 25000, image: "", category: "Clothing", stock: 30, status: "Active" },
      { id: 203, name: "Leather Jacket", description: "Genuine leather jacket", price: 65000, image: "", category: "Outerwear", stock: 15, status: "Active" },
      { id: 204, name: "Summer Dress", description: "Floral summer dress", price: 18000, image: "", category: "Dresses", stock: 25, status: "Active" },
    ]
  },
  
  // 2. Luxury Cars
  {
    id: "luxury-cars",
    name: "Luxury Cars",
    industry: "Automotive",
    icon: Car,
    heroIcon: Car,
    description: "Premium automotive showroom with vehicle listings and test drive booking.",
    pages: createPages(CARS_PAGES),
    layouts: {
      header: "mega-menu",
      footer: "detailed",
      hero: "split",
      productCard: "carousel",
      category: "grid"
    },
    branding: {
      defaultColors: ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
      defaultFont: "Inter"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: false,
      testimonials: true,
      newsletter: false,
      flashSale: false,
      coupons: false,
      compare: true
    },
    popular: true,
    featured: true,
    demoProducts: [
      { id: 1, name: "Mercedes-Benz S-Class", description: "Luxury sedan with V8 engine", price: 45000000, image: "", category: "Cars", stock: 5, status: "Active" },
      { id: 2, name: "BMW 7 Series", description: "Executive luxury sedan", price: 38000000, image: "", category: "Cars", stock: 3, status: "Active" },
      { id: 3, name: "Audi A8", description: "Premium luxury sedan", price: 35000000, image: "", category: "Cars", stock: 4, status: "Active" },
      { id: 4, name: "Lexus LS", description: "Japanese luxury sedan", price: 32000000, image: "", category: "Cars", stock: 6, status: "Active" },
      { id: 5, name: "Porsche Panamera", description: "Sport luxury sedan", price: 55000000, image: "", category: "Cars", stock: 2, status: "Active" },
    ]
  },
  
  // 3. Electronics
  {
    id: "electronics-store",
    name: "Electronics Store",
    industry: "Electronics",
    icon: Smartphone,
    heroIcon: Smartphone,
    description: "Tech-focused template with product specs, comparisons, and reviews.",
    pages: createPages(ELECTRONICS_PAGES),
    layouts: {
      header: "left",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "grid"
    },
    branding: {
      defaultColors: ["#0a0a1a", "#1a1a3e", "#00d4ff", "#f5f5f5"],
      defaultFont: "Space Grotesk"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: true
    },
    popular: true,
    featured: true,
    demoProducts: [
      { id: 701, name: "Smartphone Pro Max", description: "6.9-inch OLED, 5G, 12GB RAM", price: 850000, image: "", category: "Phones", stock: 20, status: "Active" },
      { id: 702, name: "Wireless Headphones", description: "Active noise cancellation, 30hr battery", price: 125000, image: "", category: "Audio", stock: 35, status: "Active" },
      { id: 703, name: "Smart TV 65\"", description: "4K OLED Smart TV", price: 1800000, image: "", category: "TVs", stock: 10, status: "Active" },
      { id: 704, name: "Laptop Pro", description: "16GB RAM, 512GB SSD, 14\" screen", price: 1250000, image: "", category: "Laptops", stock: 15, status: "Active" },
    ]
  },
  
  // 4. Furniture
  {
    id: "furniture-store",
    name: "Furniture Store",
    industry: "Furniture",
    icon: Sofa,
    heroIcon: Sofa,
    description: "Modern furniture template with room visualizations and design inspiration.",
    pages: createPages(FURNITURE_PAGES),
    layouts: {
      header: "centered",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "grid"
    },
    branding: {
      defaultColors: ["#2c1810", "#8b7355", "#d4c5a9", "#f5f0eb"],
      defaultFont: "Playfair Display"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: false,
      compare: true
    },
    demoProducts: [
      { id: 1001, name: "Luxury Sofa Set", description: "3-seater leather sofa", price: 450000, image: "", category: "Living Room", stock: 8, status: "Active" },
      { id: 1002, name: "Dining Table", description: "6-seater wooden dining table", price: 280000, image: "", category: "Dining", stock: 10, status: "Active" },
      { id: 1003, name: "King Size Bed", description: "Upholstered king bed frame", price: 350000, image: "", category: "Bedroom", stock: 6, status: "Active" },
      { id: 1004, name: "Office Desk", description: "Modern standing desk", price: 180000, image: "", category: "Office", stock: 12, status: "Active" },
    ]
  },
  
  // 5. Perfume Store
  {
    id: "perfume-store",
    name: "Perfume Store",
    industry: "Beauty",
    icon: Droplet,
    heroIcon: Droplet,
    description: "Scent-focused with immersive branding, fragrance notes, and gift sets.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "fragrance-notes", name: "Fragrance Notes", slug: "/fragrance-notes", enabled: true },
      { id: "gift-sets", name: "Gift Sets", slug: "/gift-sets", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "masonry"
    },
    branding: {
      defaultColors: ["#f5e6d3", "#d4a574", "#8b5a2b", "#2c1810"],
      defaultFont: "Playfair Display"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    popular: true,
    demoProducts: [
      { id: 501, name: "Oud & Rose EDP", description: "Luxury oud and rose fragrance", price: 45000, image: "", category: "Perfumes", stock: 20, status: "Active" },
      { id: 502, name: "Citrus Summer EDT", description: "Fresh citrus summer scent", price: 28000, image: "", category: "Perfumes", stock: 30, status: "Active" },
      { id: 503, name: "Vanilla & Amber EDP", description: "Warm vanilla and amber fragrance", price: 35000, image: "", category: "Perfumes", stock: 25, status: "Active" },
      { id: 504, name: "Fresh Musk EDP", description: "Clean musk fragrance", price: 32000, image: "", category: "Perfumes", stock: 15, status: "Active" },
    ]
  },
  
  // 6. Jewelry Store
  {
    id: "jewelry-store",
    name: "Jewelry Store",
    industry: "Jewelry",
    icon: Crown,
    heroIcon: Crown,
    description: "Luxury jewelry template with elegant galleries and gift suggestions.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "collections", name: "Collections", slug: "/collections", enabled: true },
      { id: "gift-guide", name: "Gift Guide", slug: "/gift-guide", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "minimal",
      hero: "split",
      productCard: "carousel",
      category: "grid"
    },
    branding: {
      defaultColors: ["#1a1a1a", "#c9a84c", "#f5f0eb", "#2d1b2e"],
      defaultFont: "Playfair Display"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: false,
      testimonials: true,
      newsletter: true,
      flashSale: false,
      coupons: false,
      compare: false
    },
    featured: true,
    demoProducts: [
      { id: 901, name: "Diamond Engagement Ring", description: "1.5ct diamond ring", price: 3500000, image: "", category: "Rings", stock: 5, status: "Active" },
      { id: 902, name: "Gold Necklace", description: "18k gold chain with pendant", price: 850000, image: "", category: "Necklaces", stock: 8, status: "Active" },
      { id: 903, name: "Silver Bracelet", description: "Sterling silver bracelet", price: 250000, image: "", category: "Bracelets", stock: 12, status: "Active" },
    ]
  },
  
  // 7. Book Store
  {
    id: "book-store",
    name: "Book Store",
    industry: "Books",
    icon: Book,
    heroIcon: Book,
    description: "Bookstore with author spotlights, reading lists, and event promotions.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "authors", name: "Authors", slug: "/authors", enabled: true },
      { id: "bestsellers", name: "Bestsellers", slug: "/bestsellers", enabled: true },
      { id: "reading-list", name: "Reading List", slug: "/reading-list", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "left",
      footer: "simple",
      hero: "full-width",
      productCard: "list",
      category: "grid"
    },
    branding: {
      defaultColors: ["#2d1b2e", "#8b5a2b", "#d4a574", "#f5e6d3"],
      defaultFont: "Inter"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    demoProducts: [
      { id: 1101, name: "The Nigerian Dream", description: "A story of ambition", price: 8500, image: "", category: "Fiction", stock: 50, status: "Active" },
      { id: 1102, name: "Business in Nigeria", description: "Guide to entrepreneurship", price: 12000, image: "", category: "Business", stock: 30, status: "Active" },
      { id: 1103, name: "Cooking Made Easy", description: "Nigerian recipes", price: 7500, image: "", category: "Cooking", stock: 40, status: "Active" },
    ]
  },
  
  // 8. Flowers Store
  {
    id: "flower-store",
    name: "Flower Store",
    industry: "Flowers",
    icon: Flower,
    heroIcon: Flower,
    description: "Flower shop with arrangement guides, seasonal collections, and delivery.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "collections", name: "Collections", slug: "/collections", enabled: true },
      { id: "occasions", name: "Occasions", slug: "/occasions", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "masonry"
    },
    branding: {
      defaultColors: ["#fdf6f0", "#d4a0a8", "#8b5a2b", "#2c1810"],
      defaultFont: "Inter"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: false,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    demoProducts: [
      { id: 1301, name: "Rose Bouquet", description: "12 red roses with greenery", price: 18000, image: "", category: "Bouquets", stock: 20, status: "Active" },
      { id: 1302, name: "Lily Arrangement", description: "White lilies in vase", price: 25000, image: "", category: "Arrangements", stock: 15, status: "Active" },
      { id: 1303, name: "Mixed Flowers", description: "Seasonal mixed flower bunch", price: 12000, image: "", category: "Bunches", stock: 30, status: "Active" },
    ]
  },
  
  // 9. Toys Store
  {
    id: "toys-store",
    name: "Toys Store",
    industry: "Toys",
    icon: ToyBrick,
    heroIcon: ToyBrick,
    description: "Colorful toy store with age filters, gift finders, and play guides.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "categories", name: "Categories", slug: "/categories", enabled: true },
      { id: "gift-finder", name: "Gift Finder", slug: "/gift-finder", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "simple",
      hero: "full-width",
      productCard: "grid",
      category: "grid"
    },
    branding: {
      defaultColors: ["#ff6b35", "#4ecdc4", "#ffe66d", "#f5f5f5"],
      defaultFont: "Inter"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: false,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    demoProducts: [
      { id: 1401, name: "Building Blocks Set", description: "1000-piece building blocks", price: 15000, image: "", category: "Blocks", stock: 25, status: "Active" },
      { id: 1402, name: "Remote Control Car", description: "RC car with rechargeable battery", price: 28000, image: "", category: "RC Toys", stock: 12, status: "Active" },
      { id: 1403, name: "Educational Puzzle", description: "Wooden educational puzzle", price: 8500, image: "", category: "Educational", stock: 30, status: "Active" },
    ]
  },
  
  // 10. Music Store
  {
    id: "music-store",
    name: "Music Store",
    industry: "Music",
    icon: Music2,
    heroIcon: Music2,
    description: "Music store with instrument listings, artists, and event calendar.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "brands", name: "Brands", slug: "/brands", enabled: true },
      { id: "events", name: "Events", slug: "/events", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "detailed",
      hero: "full-width",
      productCard: "grid",
      category: "grid"
    },
    branding: {
      defaultColors: ["#1a1a2e", "#e94560", "#0f3460", "#f5f5f5"],
      defaultFont: "Poppins"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: false,
      compare: false
    },
    demoProducts: [
      { id: 1201, name: "Acoustic Guitar", description: "Full-size acoustic guitar", price: 85000, image: "", category: "Guitars", stock: 15, status: "Active" },
      { id: 1202, name: "Digital Piano", description: "88-key weighted keyboard", price: 250000, image: "", category: "Keyboards", stock: 8, status: "Active" },
      { id: 1203, name: "Studio Headphones", description: "Professional monitoring headphones", price: 45000, image: "", category: "Audio", stock: 20, status: "Active" },
    ]
  },
  
  // 11. Cosmetics Store
  {
    id: "cosmetics-store",
    name: "Cosmetics Store",
    industry: "Beauty",
    icon: Brush,
    heroIcon: Brush,
    description: "Cosmetics store with makeup guides, tutorials, and shade finder.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "tutorials", name: "Tutorials", slug: "/tutorials", enabled: true },
      { id: "shade-finder", name: "Shade Finder", slug: "/shade-finder", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "left",
      footer: "simple",
      hero: "full-width",
      productCard: "grid",
      category: "masonry"
    },
    branding: {
      defaultColors: ["#fdf6f0", "#d4a0a8", "#c9a84c", "#2d1b2e"],
      defaultFont: "Poppins"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    demoProducts: [
      { id: 601, name: "Matte Lipstick Set", description: "6-piece matte lipstick collection", price: 25000, image: "", category: "Lipsticks", stock: 30, status: "Active" },
      { id: 602, name: "Foundation", description: "Full coverage foundation", price: 18000, image: "", category: "Face", stock: 25, status: "Active" },
      { id: 603, name: "Eyeshadow Palette", description: "12-shade eyeshadow palette", price: 22000, image: "", category: "Eyes", stock: 20, status: "Active" },
    ]
  },
  
  // 12. Gourmet Food Store
  {
    id: "gourmet-food",
    name: "Gourmet Food",
    industry: "Food",
    icon: Coffee,
    heroIcon: Coffee,
    description: "Gourmet food store with recipe ideas and tasting notes.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "recipes", name: "Recipes", slug: "/recipes", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "centered",
      footer: "simple",
      hero: "full-width",
      productCard: "grid",
      category: "grid"
    },
    branding: {
      defaultColors: ["#2c1810", "#8b5a2b", "#d4a574", "#f5e6d3"],
      defaultFont: "Inter"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: false
    },
    demoProducts: [
      { id: 1701, name: "Ethiopian Yirgacheffe", description: "Light roast with floral notes", price: 8500, image: "", category: "Coffee", stock: 30, status: "Active" },
      { id: 1702, name: "Colombian Supremo", description: "Medium roast with caramel notes", price: 7500, image: "", category: "Coffee", stock: 25, status: "Active" },
      { id: 1703, name: "Coffee Grinder", description: "Burr coffee grinder", price: 45000, image: "", category: "Equipment", stock: 10, status: "Active" },
    ]
  },
  
  // 13. Gaming Store
  {
    id: "gaming-store",
    name: "Gaming Store",
    industry: "Electronics",
    icon: Rocket,
    heroIcon: Rocket,
    description: "Gaming store with live streams, tournaments, and community features.",
    pages: createPages([
      { id: "home", name: "Home", slug: "/", enabled: true },
      { id: "shop", name: "Shop", slug: "/shop", enabled: true },
      { id: "product", name: "Product Detail", slug: "/product", enabled: true },
      { id: "tournaments", name: "Tournaments", slug: "/tournaments", enabled: true },
      { id: "community", name: "Community", slug: "/community", enabled: true },
      { id: "about", name: "About Us", slug: "/about", enabled: true },
      { id: "contact", name: "Contact", slug: "/contact", enabled: true },
    ]),
    layouts: {
      header: "left",
      footer: "minimal",
      hero: "full-width",
      productCard: "list",
      category: "grid"
    },
    branding: {
      defaultColors: ["#0d0d2b", "#ff6b35", "#00ff87", "#f5f5f5"],
      defaultFont: "Space Grotesk"
    },
    features: {
      wishlist: true,
      reviews: true,
      blog: true,
      testimonials: true,
      newsletter: true,
      flashSale: true,
      coupons: true,
      compare: true
    },
    demoProducts: [
      { id: 801, name: "Gaming PC", description: "RTX 4080, i9, 32GB RAM", price: 2500000, image: "", category: "PCs", stock: 8, status: "Active" },
      { id: 802, name: "Gaming Monitor", description: "4K 144Hz Gaming Monitor", price: 450000, image: "", category: "Monitors", stock: 12, status: "Active" },
      { id: 803, name: "Mechanical Keyboard", description: "RGB mechanical keyboard", price: 85000, image: "", category: "Keyboards", stock: 20, status: "Active" },
    ]
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByIndustry = (industry: string): Template[] => {
  return TEMPLATES.filter(t => t.industry === industry);
};

export const getIndustries = (): string[] => {
  const industries = TEMPLATES.map(t => t.industry);
  return [...new Set(industries)];
};