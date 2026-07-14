// app/admin/template-builder/components/StorePreview.tsx

"use client";

import { ShoppingBag, Package, ShoppingCart, Search, Heart, User } from "lucide-react";
import { Template } from "../types";

interface StorePreviewProps {
  template: Template;
  templateData: {
    branding: {
      storeName: string;
      tagline: string;
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      fontFamily: string;
      darkMode: boolean;
      logo?: string | null;
    };
    layout: {
      headerStyle: string;
      footerStyle: string;
      heroLayout: string;
      productCardStyle: string;
    };
    homepageSections?: {
      hero: boolean;
      categories: boolean;
      featuredProducts: boolean;
      flashSale: boolean;
      newArrivals: boolean;
      brands: boolean;
      testimonials: boolean;
      newsletter: boolean;
      instagramFeed: boolean;
    };
  };
}

export function StorePreview({ template, templateData }: StorePreviewProps) {
  const { branding, layout, homepageSections } = templateData;
  const HeroIcon = template.heroIcon || ShoppingBag;
  const displayProducts = template.demoProducts || [];

  // Check if sections are enabled
  const showHero = homepageSections?.hero !== false;
  const showProducts = homepageSections?.featuredProducts !== false;

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
        branding.darkMode ? "dark" : ""
      }`} 
      style={{ fontFamily: branding.fontFamily || "Inter" }}
    >
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700" style={{ backgroundColor: branding.primaryColor + "10" }}>
        <div className={`p-4 flex ${
          layout.headerStyle === "centered" ? "flex-col items-center" :
          layout.headerStyle === "left" ? "flex items-center justify-start" :
          layout.headerStyle === "right" ? "flex items-center justify-end" :
          "flex items-center justify-between"
        }`}>
          <div className="flex items-center gap-3">
            {branding.logo ? (
              <img src={branding.logo} alt="Logo" className="h-10 w-auto" />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: branding.secondaryColor }}>
                <HeroIcon size={18} />
              </div>
            )}
            <span className="font-bold" style={{ color: branding.primaryColor }}>{branding.storeName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-500">Shop</span>
            <span className="text-gray-500">About</span>
            <span className="text-gray-500">Contact</span>
            <button className="px-3 py-1 rounded-full text-white text-[10px] font-semibold" style={{ backgroundColor: branding.primaryColor }}>
              Cart (0)
            </button>
          </div>
        </div>
      </header>

      {/* Hero - Only if enabled */}
      {showHero && (
        <div className="p-6 text-center text-white" style={{ background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.accentColor})` }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-white/20">
            <HeroIcon size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Welcome to {branding.storeName}</h2>
          <p className="text-white/70 text-sm mt-1">{branding.tagline}</p>
          <button className="mt-3 px-6 py-2 text-sm font-semibold rounded-full" style={{ backgroundColor: branding.secondaryColor, color: branding.primaryColor }}>
            Shop Now
          </button>
        </div>
      )}

      {/* Products - Only if enabled */}
      {showProducts && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: branding.primaryColor }}>Featured Products</h3>
            <span className="text-xs text-gray-400">{displayProducts.length} items</span>
          </div>
          <div className={`grid gap-3 ${
            layout.productCardStyle === "list" ? "grid-cols-1" :
            layout.productCardStyle === "carousel" ? "grid-cols-1 sm:grid-cols-2" :
            layout.productCardStyle === "masonry" ? "grid-cols-2 sm:grid-cols-3" :
            "grid-cols-2 sm:grid-cols-3"
          }`}>
            {displayProducts.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Package size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No products added yet</p>
                <p className="text-xs text-gray-400">Add products from your dashboard</p>
              </div>
            ) : (
              displayProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="w-full h-20 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2" />
                  <p className="text-xs font-medium text-gray-800 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400 truncate">{product.category}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: branding.secondaryColor }}>₦{product.price.toLocaleString()}</p>
                  <button className="mt-1 px-3 py-1 text-[10px] font-semibold rounded-full text-white" style={{ backgroundColor: branding.primaryColor }}>
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 text-center text-xs" style={{ backgroundColor: branding.primaryColor + "05", borderTop: `1px solid ${branding.primaryColor}20` }}>
        <p style={{ color: branding.primaryColor }}>© {new Date().getFullYear()} {branding.storeName}. All rights reserved.</p>
      </footer>
    </div>
  );
}