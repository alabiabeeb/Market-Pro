// app/admin/template-builder/components/DesignPanel.tsx

"use client";

import { Palette, Type, Eye, Moon, Sun } from "lucide-react";
import { DesignSettings } from "../types";

interface DesignPanelProps {
  design: DesignSettings;
  onUpdate: (key: string, value: any) => void;
}

export function DesignPanel({ design, onUpdate }: DesignPanelProps) {
  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Palette size={16} /> Colors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Primary", key: "primaryColor", color: design.primaryColor },
            { label: "Secondary", key: "secondaryColor", color: design.secondaryColor },
            { label: "Accent", key: "accentColor", color: design.accentColor },
          ].map(({ label, key, color }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onUpdate(key, e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onUpdate(key, e.target.value)}
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
              value={design.fontFamily}
              onChange={(e) => onUpdate("fontFamily", e.target.value)}
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
              value={design.buttonStyle}
              onChange={(e) => onUpdate("buttonStyle", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
            >
              <option value="rounded-full">Full Rounded</option>
              <option value="rounded-lg">Medium Rounded</option>
              <option value="rounded">Small Rounded</option>
              <option value="none">Square</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs text-gray-600 dark:text-gray-400">Enable Animations</span>
            <button
              onClick={() => onUpdate("animation", !design.animation)}
              className={`relative w-9 h-5 rounded-full transition-colors ${
                design.animation ? "bg-[#0A2E1A]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                design.animation ? "translate-x-4" : "translate-x-0.5"
              }`} />
            </button>
          </label>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Eye size={16} /> Theme
        </h3>
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            {design.darkMode ? <Moon size={16} className="text-gray-600" /> : <Sun size={16} className="text-gray-600" />}
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {design.darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
          <button
            onClick={() => onUpdate("darkMode", !design.darkMode)}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              design.darkMode ? "bg-[#0A2E1A]" : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              design.darkMode ? "translate-x-4" : "translate-x-0.5"
            }`} />
          </button>
        </label>
      </div>
    </div>
  );
}