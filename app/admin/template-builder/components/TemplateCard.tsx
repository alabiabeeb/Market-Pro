"use client";

import { Check } from "lucide-react";
import { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const Icon = template.icon;

  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`relative rounded-xl border-2 cursor-pointer transition-all p-4 hover:shadow-md ${
        isSelected
          ? "border-[#C8F135] bg-[#C8F135]/10 shadow-lg"
          : "border-gray-200 dark:border-gray-700 hover:border-[#C8F135]/50"
      }`}
    >
      {/* Badges */}
      <div className="absolute top-2 right-2 flex gap-1">
        {template.popular && (
          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#C8F135] text-[#0A2E1A]">
            Popular
          </span>
        )}
        {template.featured && (
          <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#4F46E5] text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isSelected ? "bg-[#C8F135] text-[#0A2E1A]" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
        }`}>
          <Icon size={18} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{template.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{template.industry}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{template.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] text-gray-400">{template.pages.length} pages</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-[10px] text-gray-400">{template.demoProducts.length} products</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex gap-0.5">
              {template.branding.defaultColors.slice(0, 4).map((color, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#C8F135]">
          <Check size={12} /> Selected
        </div>
      )}
    </div>
  );
}