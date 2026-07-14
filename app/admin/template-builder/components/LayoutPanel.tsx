"use client";

import { Layout, Grid, AlignLeft, AlignCenter, AlignRight, Columns, Rows, Maximize } from "lucide-react";
import { LayoutSettings } from "../types";

interface LayoutPanelProps {
  layout: LayoutSettings;
  onUpdate: (key: string, value: any) => void;
}

export function LayoutPanel({ layout, onUpdate }: LayoutPanelProps) {
  // ── Ensure all values have defaults ──
  const safeLayout = {
    headerStyle: layout?.headerStyle || "centered",
    footerStyle: layout?.footerStyle || "detailed",
    heroLayout: layout?.heroLayout || "full-width",
    productCardStyle: layout?.productCardStyle || "grid",
    categoryLayout: layout?.categoryLayout || "grid",
    bannerStyle: layout?.bannerStyle || "full-width",
    spacing: layout?.spacing || "comfortable",
    containerWidth: layout?.containerWidth || "wide",
    sidebarPosition: layout?.sidebarPosition || "none",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Layout size={16} /> Layout Configuration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Header Style</label>
            <select
              value={safeLayout.headerStyle}
              onChange={(e) => onUpdate("headerStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="centered">Centered</option>
              <option value="left">Left Aligned</option>
              <option value="right">Right Aligned</option>
              <option value="mega-menu">Mega Menu</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Footer Style</label>
            <select
              value={safeLayout.footerStyle}
              onChange={(e) => onUpdate("footerStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="simple">Simple</option>
              <option value="detailed">Detailed</option>
              <option value="minimal">Minimal</option>
              <option value="social">Social Focus</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Hero Layout</label>
            <select
              value={safeLayout.heroLayout}
              onChange={(e) => onUpdate("heroLayout", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="full-width">Full Width</option>
              <option value="split">Split Screen</option>
              <option value="overlay">Overlay</option>
              <option value="carousel">Carousel</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Product Card Style</label>
            <select
              value={safeLayout.productCardStyle}
              onChange={(e) => onUpdate("productCardStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
              <option value="carousel">Carousel</option>
              <option value="masonry">Masonry</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category Layout</label>
            <select
              value={safeLayout.categoryLayout}
              onChange={(e) => onUpdate("categoryLayout", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Spacing</label>
            <select
              value={safeLayout.spacing}
              onChange={(e) => onUpdate("spacing", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sidebar Position</label>
            <select
              value={safeLayout.sidebarPosition}
              onChange={(e) => onUpdate("sidebarPosition", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="none">None</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Container Width</label>
            <select
              value={safeLayout.containerWidth}
              onChange={(e) => onUpdate("containerWidth", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="narrow">Narrow</option>
              <option value="wide">Wide</option>
              <option value="full">Full Width</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}