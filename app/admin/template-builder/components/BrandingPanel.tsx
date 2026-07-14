"use client";

import { Palette, Type, Eye, Moon, Sun, Image, FileText, Globe } from "lucide-react";
import { BrandingSettings } from "../types";

interface BrandingPanelProps {
  branding: BrandingSettings;
  onUpdate: (key: string, value: any) => void;
}

export function BrandingPanel({ branding, onUpdate }: BrandingPanelProps) {
  // ── Ensure all values have defaults ──
  const safeBranding = {
    storeName: branding?.storeName || "",
    tagline: branding?.tagline || "",
    logo: branding?.logo || null,
    favicon: branding?.favicon || null,
    banner: branding?.banner || null,
    primaryColor: branding?.primaryColor || "#0A2E1A",
    secondaryColor: branding?.secondaryColor || "#C8F135",
    accentColor: branding?.accentColor || "#4F46E5",
    fontFamily: branding?.fontFamily || "Inter",
    borderRadius: branding?.borderRadius || "rounded-lg",
    buttonStyle: branding?.buttonStyle || "rounded-full",
    cardStyle: branding?.cardStyle || "shadow-md",
    animation: branding?.animation !== undefined ? branding.animation : true,
    darkMode: branding?.darkMode !== undefined ? branding.darkMode : false,
  };

  const handleUpdate = (key: string, value: any) => {
    onUpdate(key, value);
  };

  return (
    <div className="space-y-6">
      {/* Store Identity */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FileText size={16} /> Store Identity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Store Name</label>
            <input
              type="text"
              value={safeBranding.storeName}
              onChange={(e) => handleUpdate("storeName", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
              placeholder="Enter store name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tagline</label>
            <input
              type="text"
              value={safeBranding.tagline}
              onChange={(e) => handleUpdate("tagline", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
              placeholder="Enter tagline"
            />
          </div>
        </div>
      </div>

      {/* Logo & Images */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Image size={16} /> Logo & Images
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Logo</label>
            <div 
              onClick={() => document.getElementById("logo-upload")?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center hover:border-[#C8F135] transition-colors cursor-pointer"
            >
              {safeBranding.logo ? (
                <img src={safeBranding.logo} alt="Logo" className="h-12 mx-auto" />
              ) : (
                <>
                  <Image size={24} className="text-gray-400 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-400">Upload Logo</span>
                </>
              )}
              <input id="logo-upload" type="file" className="hidden" accept="image/*" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Favicon</label>
            <div 
              onClick={() => document.getElementById("favicon-upload")?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center hover:border-[#C8F135] transition-colors cursor-pointer"
            >
              {safeBranding.favicon ? (
                <img src={safeBranding.favicon} alt="Favicon" className="h-8 mx-auto" />
              ) : (
                <>
                  <Globe size={24} className="text-gray-400 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-400">Upload Favicon</span>
                </>
              )}
              <input id="favicon-upload" type="file" className="hidden" accept="image/*" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Banner</label>
            <div 
              onClick={() => document.getElementById("banner-upload")?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center hover:border-[#C8F135] transition-colors cursor-pointer"
            >
              {safeBranding.banner ? (
                <img src={safeBranding.banner} alt="Banner" className="h-12 w-full object-cover rounded" />
              ) : (
                <>
                  <Image size={24} className="text-gray-400 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-400">Upload Banner</span>
                </>
              )}
              <input id="banner-upload" type="file" className="hidden" accept="image/*" />
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Palette size={16} /> Colors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Primary", key: "primaryColor", color: safeBranding.primaryColor },
            { label: "Secondary", key: "secondaryColor", color: safeBranding.secondaryColor },
            { label: "Accent", key: "accentColor", color: safeBranding.accentColor },
          ].map(({ label, key, color }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleUpdate(key, e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleUpdate(key, e.target.value)}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Type size={16} /> Typography
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Font Family</label>
            <select
              value={safeBranding.fontFamily}
              onChange={(e) => handleUpdate("fontFamily", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Button Style</label>
            <select
              value={safeBranding.buttonStyle}
              onChange={(e) => handleUpdate("buttonStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="rounded-full">Full Rounded</option>
              <option value="rounded-lg">Medium Rounded</option>
              <option value="rounded">Small Rounded</option>
              <option value="none">Square</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Border Radius</label>
            <select
              value={safeBranding.borderRadius}
              onChange={(e) => handleUpdate("borderRadius", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="rounded-none">None</option>
              <option value="rounded-sm">Small</option>
              <option value="rounded">Medium</option>
              <option value="rounded-lg">Large</option>
              <option value="rounded-xl">Extra Large</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Card Style</label>
            <select
              value={safeBranding.cardStyle}
              onChange={(e) => handleUpdate("cardStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="shadow-none">None</option>
              <option value="shadow-sm">Subtle</option>
              <option value="shadow">Default</option>
              <option value="shadow-lg">Prominent</option>
              <option value="shadow-xl">Dramatic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Eye size={16} /> Theme
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs text-gray-600 dark:text-gray-400">Enable Animations</span>
            <button
              onClick={() => handleUpdate("animation", !safeBranding.animation)}
              className={`relative w-9 h-5 rounded-full transition-colors ${
                safeBranding.animation ? "bg-[#0A2E1A]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                safeBranding.animation ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              {safeBranding.darkMode ? <Moon size={16} className="text-gray-600" /> : <Sun size={16} className="text-gray-600" />}
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {safeBranding.darkMode ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <button
              onClick={() => handleUpdate("darkMode", !safeBranding.darkMode)}
              className={`relative w-9 h-5 rounded-full transition-colors ${
                safeBranding.darkMode ? "bg-[#0A2E1A]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                safeBranding.darkMode ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}