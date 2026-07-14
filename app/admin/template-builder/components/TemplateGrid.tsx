// app/admin/template-builder/components/TemplateGrid.tsx

"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Template } from "../types";
import { TemplateCard } from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TemplateGrid({ templates, selectedId, onSelect }: TemplateGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");

  const industries = ["All", ...new Set(templates.map(t => t.industry))];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "All" || t.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setIndustryFilter(industry)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                industryFilter === industry
                  ? "bg-[#0A2E1A] text-[#C8F135]"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">No templates found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedId === template.id}
              onSelect={onSelect}
            />
          ))
        )}
      </div>

      {/* Count */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
        {filteredTemplates.length} of {templates.length} templates
      </div>
    </div>
  );
}