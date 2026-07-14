// app/admin/template-builder/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layout, Palette, Eye, Save, Sparkles, ArrowLeft,
  Check, X, Loader2, Plus, Smartphone, Tablet, Monitor,
  Crown, Lock, Globe, Package, ShoppingBag, Car, Watch,
  Shirt, Droplet, PhoneIcon, Home, Sofa, Book, Music2,
  Flower, ToyBrick, Truck, Wrench, Dumbbell, Camera,
  Coffee, Rocket, Gem, Pizza, Headphones, Brush,
  ChevronRight, ChevronDown, GripVertical,
  LayoutTemplate, Paintbrush, FileText, Settings as SettingsIcon, House
} from "lucide-react";
import { TEMPLATES, getTemplateById, getIndustries } from "./templates";
import { Template, TemplateData, BrandingSettings, LayoutSettings, HomepageSections, PageTemplate } from "./types";
import { BrandingPanel } from "./components/BrandingPanel";
import { LayoutPanel } from "./components/LayoutPanel";
import { StorePreview } from "./components/StorePreview";

// ── Default Template Data ──
const defaultTemplateData: TemplateData = {
  templateId: "fashion-store",
  branding: {
    logo: null,
    favicon: null,
    banner: null,
    storeName: "My Store",
    tagline: "Welcome to my store",
    primaryColor: "#2d2d2d",
    secondaryColor: "#f5f0eb",
    accentColor: "#c0392b",
    fontFamily: "Poppins",
    borderRadius: "rounded-lg",
    buttonStyle: "rounded-full",
    cardStyle: "shadow-md",
    animation: true,
    darkMode: false,
  },
  layout: {
    headerStyle: "centered",
    footerStyle: "detailed",
    heroLayout: "full-width",
    productCardStyle: "grid",
    categoryLayout: "masonry",
    bannerStyle: "full-width",
    spacing: "comfortable",
    containerWidth: "wide",
    sidebarPosition: "none",
  },
  pages: [],
  homepageSections: {
    hero: true,
    categories: true,
    featuredProducts: true,
    flashSale: true,
    newArrivals: true,
    brands: true,
    testimonials: true,
    newsletter: true,
    instagramFeed: true,
    footer: true,
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },
  published: false,
  lastSaved: null,
};

// ── HomepageSectionsTab Component ──
function HomepageSectionsTab({ 
  sections, 
  onToggle, 
  onReorder 
}: { 
  sections: HomepageSections; 
  onToggle: (key: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}) {
  const safeSections = sections || {
    hero: true,
    categories: true,
    featuredProducts: true,
    flashSale: true,
    newArrivals: true,
    brands: true,
    testimonials: true,
    newsletter: true,
    instagramFeed: true,
    footer: true,
  };

  const sectionKeys = Object.keys(safeSections) as (keyof HomepageSections)[];
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Homepage Sections</h3>
      <div className="space-y-2">
        {sectionKeys.map((key, index) => (
          <div
            key={key}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="cursor-move text-gray-400">
              <GripVertical size={16} />
            </div>
            <label className="flex-1 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={safeSections[key] !== false}
                onChange={() => onToggle(key)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#C8F135] focus:ring-[#C8F135]"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
            </label>
            <button
              onClick={() => onReorder(index, Math.max(0, index - 1))}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              ↑
            </button>
            <button
              onClick={() => onReorder(index, Math.min(sectionKeys.length - 1, index + 1))}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              ↓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FeaturesTab Component ──
function FeaturesTab({ features, onToggle }: { features: any; onToggle: (key: string) => void }) {
  const safeFeatures = features || {
    wishlist: true,
    reviews: true,
    blog: true,
    testimonials: true,
    newsletter: true,
    flashSale: true,
    coupons: true,
    compare: true,
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Features</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(safeFeatures).map(([key, value]) => (
          <label key={key} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={value === true}
              onChange={() => onToggle(key)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#C8F135] focus:ring-[#C8F135]"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ── PagesTab Component ──
function PagesTab({ pages, onToggle }: { pages: PageTemplate[]; onToggle: (id: string) => void }) {
  const safePages = pages || [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Pages</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {safePages.map((page) => (
          <button
            key={page.id}
            onClick={() => onToggle(page.id)}
            className={`p-3 rounded-xl border-2 text-center transition-all ${
              page.enabled
                ? "border-[#C8F135] bg-[#C8F135]/10"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            } ${page.required ? "cursor-default opacity-70" : "cursor-pointer hover:shadow-md"}`}
          >
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{page.name}</p>
            {page.required && (
              <span className="text-[9px] text-gray-400">Required</span>
            )}
            {!page.required && (
              <div className={`mt-1 text-[10px] font-semibold ${page.enabled ? "text-[#C8F135]" : "text-gray-400"}`}>
                {page.enabled ? "✅ Visible" : "🔒 Hidden"}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── TemplatesTab Component ──
function TemplatesTab({ templates, selectedId, onSelect }: any) {
  const industries = getIndustries();
  const [filter, setFilter] = useState("All");

  const filteredTemplates = filter === "All" 
    ? templates 
    : templates.filter((t: Template) => t.industry === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...industries].map((industry) => (
          <button
            key={industry}
            onClick={() => setFilter(industry)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === industry
                ? "bg-[#0A2E1A] text-[#C8F135]"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTemplates.map((template: Template) => {
          const Icon = template.icon;
          const isSelected = selectedId === template.id;
          return (
            <div
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative rounded-xl border-2 cursor-pointer transition-all p-4 hover:shadow-md ${
                isSelected
                  ? "border-[#C8F135] bg-[#C8F135]/10 shadow-lg"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#C8F135]/50"
              }`}
            >
              {template.popular && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#C8F135] text-[#0A2E1A]">
                  Popular
                </div>
              )}
              {template.featured && (
                <div className="absolute -top-2 -left-2 px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#4F46E5] text-white">
                  Featured
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? "bg-[#C8F135] text-[#0A2E1A]" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{template.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{template.industry}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{template.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{template.pages.length} pages</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] text-gray-400">{template.demoProducts.length} products</span>
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#C8F135]">
                  <Check size={12} /> Selected
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Template Builder ──
export default function TemplateBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"templates" | "branding" | "layout" | "pages" | "sections" | "features" | "preview">("templates");
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('storeTemplate');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTemplateData({
          ...defaultTemplateData,
          ...parsed,
          homepageSections: {
            ...defaultTemplateData.homepageSections,
            ...parsed.homepageSections,
          },
          branding: {
            ...defaultTemplateData.branding,
            ...parsed.branding,
          },
          layout: {
            ...defaultTemplateData.layout,
            ...parsed.layout,
          },
        });
      } else {
        setTemplateData(defaultTemplateData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setTemplateData(defaultTemplateData);
    } finally {
      setLoading(false);
    }
  };

  const saveData = (data: TemplateData) => {
    localStorage.setItem('storeTemplate', JSON.stringify(data));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        ...templateData,
        lastSaved: new Date().toISOString()
      };
      saveData(dataToSave);
      setSaved(true);
      setShowToast({ message: "Template saved successfully!", type: "success" });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setShowToast({ message: "Failed to save template.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        ...templateData,
        published: true,
        lastSaved: new Date().toISOString()
      };
      saveData(dataToSave);
      setTemplateData(dataToSave);
      setShowToast({ message: "Store published successfully!", type: "success" });
    } catch (error) {
      setShowToast({ message: "Failed to publish store.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const selectTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      const newData = {
        ...templateData,
        templateId: templateId,
        branding: {
          ...templateData.branding,
          primaryColor: template.branding.defaultColors[0] || "#0A2E1A",
          secondaryColor: template.branding.defaultColors[1] || "#C8F135",
          accentColor: template.branding.defaultColors[2] || "#4F46E5",
          fontFamily: template.branding.defaultFont || "Inter",
        },
        pages: template.pages,
      };
      setTemplateData(newData);
      saveData(newData);
      setShowToast({ 
        message: `✅ ${template.name} template loaded with ${template.pages.length} pages!`, 
        type: "success" 
      });
    }
  };

  const updateBranding = (key: string, value: any) => {
    const newData = {
      ...templateData,
      branding: { ...templateData.branding, [key]: value }
    };
    setTemplateData(newData);
  };

  const updateLayout = (key: string, value: any) => {
    const newData = {
      ...templateData,
      layout: { ...templateData.layout, [key]: value }
    };
    setTemplateData(newData);
  };

  const togglePage = (id: string) => {
    const newPages = templateData.pages.map(page =>
      page.id === id ? { ...page, enabled: !page.enabled } : page
    );
    const newData = { ...templateData, pages: newPages };
    setTemplateData(newData);
  };

  const toggleSection = (key: string) => {
    const currentSections = templateData.homepageSections || defaultTemplateData.homepageSections;
    const newSections = {
      ...currentSections,
      [key]: !currentSections[key as keyof HomepageSections]
    };
    const newData = { ...templateData, homepageSections: newSections };
    setTemplateData(newData);
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    const currentSections = templateData.homepageSections || defaultTemplateData.homepageSections;
    const keys = Object.keys(currentSections) as (keyof HomepageSections)[];
    const newKeys = [...keys];
    const [moved] = newKeys.splice(fromIndex, 1);
    newKeys.splice(toIndex, 0, moved);
    
    const newSections = {} as HomepageSections;
    newKeys.forEach(key => {
      newSections[key] = currentSections[key];
    });
    const newData = { ...templateData, homepageSections: newSections };
    setTemplateData(newData);
  };

  const toggleFeature = (key: string) => {
    const template = getTemplateById(templateData.templateId);
    if (template) {
      const currentFeatures = template.features || {
        wishlist: true,
        reviews: true,
        blog: true,
        testimonials: true,
        newsletter: true,
        flashSale: true,
        coupons: true,
        compare: true,
      };
      
      const newFeatures = {
        ...currentFeatures,
        [key]: !currentFeatures[key as keyof typeof currentFeatures]
      };
      
      setTemplateData({
        ...templateData,
        // Store features in templateData for now
        // You might want to add a features field to TemplateData
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={32} className="text-[#C8F135] animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-400">Loading template builder...</p>
        </div>
      </div>
    );
  }

  const selectedTemplate = getTemplateById(templateData.templateId);

  return (
    <div className="max-w-full space-y-6 pb-10">
      {/* Toast */}
      {showToast && (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-in slide-in-from-top-4 ${
          showToast.type === "success"
            ? "bg-[#0A2E1A] text-[#C8F135] border border-[#C8F135]/30"
            : "bg-red-600 text-white"
        }`}>
          {showToast.type === "success" ? <Check size={14} /> : <X size={14} />}
          {showToast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Template Builder
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {templateData.published ? "🟢 Published" : "🟡 Draft"} · {selectedTemplate?.name || "No template selected"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-2 text-sm font-medium text-[#C8F135] bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-3 py-2 text-sm font-medium text-[#0A2E1A] bg-[#C8F135] hover:bg-[#B8E025] disabled:bg-gray-400 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: "templates", label: "📁 Templates", icon: LayoutTemplate },
          { id: "branding", label: "🎨 Branding", icon: Paintbrush },
          { id: "layout", label: "📐 Layout", icon: Layout },
          { id: "pages", label: "📄 Pages", icon: FileText },
          { id: "sections", label: "🏠 Sections", icon: House },
          { id: "features", label: "⚙ Features", icon: SettingsIcon },
          { id: "preview", label: "👁️ Preview", icon: Eye },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <TabIcon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === "templates" && (
          <TemplatesTab
            templates={TEMPLATES}
            selectedId={templateData.templateId}
            onSelect={selectTemplate}
          />
        )}
        {activeTab === "branding" && (
          <BrandingPanel branding={templateData.branding} onUpdate={updateBranding} />
        )}
        {activeTab === "layout" && (
          <LayoutPanel layout={templateData.layout} onUpdate={updateLayout} />
        )}
        {activeTab === "pages" && (
          <PagesTab pages={templateData.pages} onToggle={togglePage} />
        )}
        {activeTab === "sections" && (
          <HomepageSectionsTab
            sections={templateData.homepageSections}
            onToggle={toggleSection}
            onReorder={reorderSections}
          />
        )}
        {activeTab === "features" && selectedTemplate && (
          <FeaturesTab features={selectedTemplate.features} onToggle={toggleFeature} />
        )}
        {activeTab === "preview" && selectedTemplate && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Live Store Preview</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open('/store', '_blank')}
                  className="px-3 py-1.5 bg-[#0A2E1A] text-[#C8F135] rounded-lg text-xs font-medium hover:opacity-90 transition-all flex items-center gap-1"
                >
                  <Eye size={14} /> View Full Store
                </button>
                <button
                  onClick={() => {
                    // Force re-render preview
                    const currentData = { ...templateData };
                    setTemplateData({ ...currentData });
                    setShowToast({ message: "Preview refreshed!", type: "success" });
                    setTimeout(() => setShowToast(null), 2000);
                  }}
                  className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
            <StorePreview 
              template={selectedTemplate} 
              templateData={{
                branding: templateData.branding,
                layout: templateData.layout,
                homepageSections: templateData.homepageSections,
              }} 
            />
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500 space-y-1">
              <p>💡 This preview updates in real-time as you make changes.</p>
              <p className="text-[10px] text-gray-400">Click "View Full Store" to see the complete storefront in a new tab.</p>
              <p className="text-[10px] text-gray-400">Current template: <span className="font-semibold text-[#C8F135]">{selectedTemplate.name}</span></p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
        {TEMPLATES.length} templates available · {selectedTemplate?.pages.length || 0} pages · Fully customizable
      </div>
    </div>
  );
}