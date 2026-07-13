"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Palette,
  Type,
  Image as ImageIcon,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Eye,
  RefreshCw,
  Check,
  X,
  Copy,
  ArrowLeft,
  Grid3x3,
  ShoppingBag,
  Users,
  Star,
  Zap,
  Sparkles,
  Loader2,
  Home,
  Info,
  Phone,
  Mail,
  MapPin,
  Menu,
  ShoppingCart,
  Search,
  Heart,
  User,
  ChevronDown,
  Plus,
  Minus,
  Truck,
  Shield,
  CreditCard,
  Clock,
  ArrowRight,
  // Social icons - using alternative icons since Facebook/Instagram/Twitter/Youtube don't exist
  // We'll use custom SVG components below
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ── Custom Social Icons (since lucide-react doesn't have them) ──
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

// ── Types ──
interface TemplateSection {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
  settings: Record<string, any>;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

interface TemplateData {
  storeInfo: {
    name: string;
    tagline: string;
    logo: string | null;
    favicon: string | null;
    banner: string | null;
    email: string;
    phone: string;
    address: string;
  };
  design: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    buttonStyle: string;
    spacing: string;
    animation: boolean;
    darkMode: boolean;
  };
  sections: TemplateSection[];
  socialLinks: SocialLinks;
  published: boolean;
  lastSaved: string | null;
}

// ── Default Template ──
const defaultTemplate: TemplateData = {
  storeInfo: {
    name: "Luminary Aesthetics",
    tagline: "Premium handcrafted home decor",
    logo: null,
    favicon: null,
    banner: null,
    email: "hello@luminary.com",
    phone: "+234 800 000 0000",
    address: "Lagos, Nigeria",
  },
  design: {
    primaryColor: "#0A2E1A",
    secondaryColor: "#C8F135",
    accentColor: "#4F46E5",
    fontFamily: "Inter",
    buttonStyle: "rounded-full",
    spacing: "comfortable",
    animation: true,
    darkMode: false,
  },
  sections: [
    { id: "header", label: "Header", enabled: true, order: 0, settings: {} },
    { id: "hero", label: "Hero Section", enabled: true, order: 1, settings: { title: "Welcome to Our Store", subtitle: "Discover premium products" } },
    { id: "featured", label: "Featured Products", enabled: true, order: 2, settings: { title: "Featured Products" } },
    { id: "categories", label: "Categories", enabled: true, order: 3, settings: { title: "Shop by Category" } },
    { id: "about", label: "About Us", enabled: true, order: 4, settings: { title: "About Our Store" } },
    { id: "testimonials", label: "Testimonials", enabled: true, order: 5, settings: { title: "What Our Customers Say" } },
    { id: "cta", label: "Call to Action", enabled: true, order: 6, settings: { title: "Ready to Shop?", button: "Shop Now" } },
    { id: "footer", label: "Footer", enabled: true, order: 7, settings: {} },
  ],
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  },
  published: false,
  lastSaved: null,
};

// ── Main Component ──
export default function TemplateBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("layout");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saved, setSaved] = useState(false);
  const [template, setTemplate] = useState<TemplateData>(defaultTemplate);
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // ── Load Template ──
  useEffect(() => {
    loadTemplate();
  }, []);

  const loadTemplate = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('storeTemplate');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTemplate(parsed);
      } else {
        setTemplate(defaultTemplate);
      }
    } catch (error) {
      console.error("Error loading template:", error);
      setTemplate(defaultTemplate);
    } finally {
      setLoading(false);
    }
  };

  // ── Save Template ──
  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('storeTemplate', JSON.stringify({
        ...template,
        lastSaved: new Date().toISOString()
      }));

      setSaved(true);
      setShowToast({ message: "Template saved successfully!", type: "success" });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setShowToast({ message: "Failed to save template.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // ── Publish Template ──
  const handlePublish = async () => {
    setSaving(true);
    try {
      setTemplate({ ...template, published: true });
      localStorage.setItem('storeTemplate', JSON.stringify({
        ...template,
        published: true,
        lastSaved: new Date().toISOString()
      }));
      setShowToast({ message: "🎉 Store published successfully!", type: "success" });
    } catch (error) {
      setShowToast({ message: "Failed to publish store.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // ── Update Functions ──
  const updateStoreInfo = (key: string, value: any) => {
    setTemplate({
      ...template,
      storeInfo: { ...template.storeInfo, [key]: value }
    });
  };

  const updateDesign = (key: string, value: any) => {
    setTemplate({
      ...template,
      design: { ...template.design, [key]: value }
    });
  };

  const updateSocial = (key: keyof SocialLinks, value: string) => {
    setTemplate({
      ...template,
      socialLinks: { ...template.socialLinks, [key]: value }
    });
  };

  const toggleSection = (id: string) => {
    setTemplate({
      ...template,
      sections: template.sections.map(s =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      )
    });
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = template.sections.findIndex(s => s.id === id);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= template.sections.length) return;

    const newSections = [...template.sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setTemplate({ ...template, sections: newSections });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={32} className="text-[#C8F135] animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-400">Loading template...</p>
        </div>
      </div>
    );
  }

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

      {/* ── Header ── */}
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
              Customize your storefront — {template.published ? "🟢 Published" : "🟡 Draft"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Device Preview */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { id: "desktop", icon: Monitor },
              { id: "tablet", icon: Tablet },
              { id: "mobile", icon: Smartphone },
            ].map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setPreviewDevice(device.id as any)}
                  className={`p-1.5 rounded-md transition-all ${
                    previewDevice === device.id
                      ? "bg-[#0A2E1A] text-[#C8F135]"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon size={15} />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => window.open("/store", "_blank")}
            className="px-3 py-2 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Eye size={14} />
            Preview Store
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-2 text-sm font-medium text-[#C8F135] bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Template"}
          </button>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* ── Left: Sections ── */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Sections</h3>
              <span className="text-[10px] text-gray-400">{template.sections.filter(s => s.enabled).length} active</span>
            </div>
            <div className="p-2 space-y-0.5">
              {template.sections.sort((a, b) => a.order - b.order).map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <div key={section.id} className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isActive ? "bg-[#C8F135]/10" : ""}`}>
                    <button
                      onClick={() => setActiveTab(section.id)}
                      className={`flex-1 flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#C8F135]/20 text-[#0A2E1A] dark:text-[#C8F135]"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {section.label}
                    </button>
                    <div className="flex items-center gap-0.5">
                      <button onClick={() => moveSection(section.id, "up")} className="p-1 text-gray-400 hover:text-gray-600 rounded">↑</button>
                      <button onClick={() => moveSection(section.id, "down")} className="p-1 text-gray-400 hover:text-gray-600 rounded">↓</button>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`p-1 rounded transition-colors ${section.enabled ? "text-green-500" : "text-gray-400"}`}
                      >
                        {section.enabled ? <Check size={12} /> : <X size={12} />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Quick Actions</h3>
            </div>
            <div className="p-3 space-y-1.5">
              <button
                onClick={() => {
                  if (confirm("Reset to default template?")) {
                    setTemplate(defaultTemplate);
                    localStorage.removeItem('storeTemplate');
                    setShowToast({ message: "Template reset to default", type: "success" });
                  }
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <RefreshCw size={14} />
                Reset to Default
              </button>
              <button
                onClick={handlePublish}
                disabled={saving}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#C8F135] bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 transition-colors"
              >
                <Sparkles size={14} />
                Publish Store
              </button>
            </div>
          </div>
        </div>

        {/* ── Center: Live Preview ── */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] text-gray-400 ml-2">{template.storeInfo.name}</span>
                {template.published && (
                  <span className="text-[8px] font-bold text-green-500 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded">LIVE</span>
                )}
              </div>
              <span className="text-[10px] text-gray-400">{previewDevice}</span>
            </div>

            {/* ── STOREFRONT PREVIEW ── */}
            <div className={`p-4 transition-all ${
              previewDevice === "desktop" ? "max-w-full" :
              previewDevice === "tablet" ? "max-w-[768px] mx-auto" :
              "max-w-[375px] mx-auto"
            }`}>
              <div 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{ fontFamily: template.design.fontFamily }}
              >
                {/* ── HEADER ── */}
                {template.sections.find(s => s.id === "header")?.enabled && (
                  <header className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {template.storeInfo.logo ? (
                          <img src={template.storeInfo.logo} alt="Logo" className="h-10 w-auto" />
                        ) : (
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: template.design.secondaryColor }}
                          >
                            {template.storeInfo.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-bold" style={{ color: template.design.primaryColor }}>
                            {template.storeInfo.name}
                          </span>
                          <p className="text-[10px] text-gray-400">{template.storeInfo.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Search size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                          <Heart size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                          <ShoppingCart size={18} />
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: template.design.secondaryColor }}>
                            0
                          </span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <User size={18} />
                        </button>
                      </div>
                    </div>
                  </header>
                )}

                {/* ── HERO ── */}
                {template.sections.find(s => s.id === "hero")?.enabled && (
                  <section 
                    className="relative p-8 text-center text-white overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${template.design.primaryColor}, ${template.design.accentColor})` 
                    }}
                  >
                    {template.storeInfo.banner && (
                      <img src={template.storeInfo.banner} alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    )}
                    <div className="relative z-10">
                      <h1 className="text-3xl font-bold">
                        {template.sections.find(s => s.id === "hero")?.settings?.title || `Welcome to ${template.storeInfo.name}`}
                      </h1>
                      <p className="text-white/70 text-sm mt-2 max-w-md mx-auto">
                        {template.sections.find(s => s.id === "hero")?.settings?.subtitle || template.storeInfo.tagline}
                      </p>
                      <button 
                        className={`mt-4 px-8 py-3 text-sm font-semibold transition-colors ${template.design.buttonStyle}`}
                        style={{ 
                          backgroundColor: template.design.secondaryColor,
                          color: template.design.primaryColor
                        }}
                      >
                        Shop Now →
                      </button>
                    </div>
                  </section>
                )}

                {/* ── FEATURED PRODUCTS ── */}
                {template.sections.find(s => s.id === "featured")?.enabled && (
                  <section className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold" style={{ color: template.design.primaryColor }}>
                        {template.sections.find(s => s.id === "featured")?.settings?.title || "Featured Products"}
                      </h3>
                      <button className="text-xs font-medium" style={{ color: template.design.secondaryColor }}>
                        View All →
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                          <div className="w-full h-24 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2" />
                          <p className="text-xs font-medium text-gray-800 dark:text-white">Product Name {i}</p>
                          <p className="text-xs font-bold" style={{ color: template.design.secondaryColor }}>₦{i}0,000</p>
                          <button 
                            className={`mt-2 px-4 py-1 text-[10px] font-semibold transition-colors ${template.design.buttonStyle}`}
                            style={{ 
                              backgroundColor: template.design.primaryColor,
                              color: 'white'
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── CATEGORIES ── */}
                {template.sections.find(s => s.id === "categories")?.enabled && (
                  <section className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold mb-3" style={{ color: template.design.primaryColor }}>
                      {template.sections.find(s => s.id === "categories")?.settings?.title || "Shop by Category"}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'].map((cat) => (
                        <button key={cat} className="p-2 text-center text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-[#C8F135] hover:text-[#0A2E1A] transition-colors">
                          {cat}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── CTA ── */}
                {template.sections.find(s => s.id === "cta")?.enabled && (
                  <section 
                    className="p-6 text-center text-white"
                    style={{ backgroundColor: template.design.primaryColor }}
                  >
                    <h3 className="text-lg font-bold">
                      {template.sections.find(s => s.id === "cta")?.settings?.title || "Ready to Start Shopping?"}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">Join thousands of happy customers</p>
                    <button 
                      className={`mt-3 px-6 py-2 text-sm font-semibold transition-colors ${template.design.buttonStyle}`}
                      style={{ 
                        backgroundColor: template.design.secondaryColor,
                        color: template.design.primaryColor
                      }}
                    >
                      {template.sections.find(s => s.id === "cta")?.settings?.button || "Shop Now"}
                    </button>
                  </section>
                )}

                {/* ── FOOTER ── */}
                {template.sections.find(s => s.id === "footer")?.enabled && (
                  <footer className="p-4 border-t border-gray-200 dark:border-gray-700" style={{ backgroundColor: template.design.primaryColor + "05" }}>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold" style={{ color: template.design.primaryColor }}>{template.storeInfo.name}</p>
                        <p className="text-gray-500 mt-1">{template.storeInfo.address}</p>
                        <p className="text-gray-500">{template.storeInfo.phone}</p>
                        <p className="text-gray-500">{template.storeInfo.email}</p>
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: template.design.primaryColor }}>Follow Us</p>
                        <div className="flex gap-2 mt-1">
                          {template.socialLinks.facebook && <FacebookIcon className="w-3.5 h-3.5 text-gray-400" />}
                          {template.socialLinks.instagram && <InstagramIcon className="w-3.5 h-3.5 text-gray-400" />}
                          {template.socialLinks.twitter && <TwitterIcon className="w-3.5 h-3.5 text-gray-400" />}
                          {template.socialLinks.youtube && <YoutubeIcon className="w-3.5 h-3.5 text-gray-400" />}
                        </div>
                        <p className="text-gray-400 mt-2">© 2025 All rights reserved</p>
                      </div>
                    </div>
                  </footer>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Controls ── */}
        <div className="lg:col-span-1 space-y-4">
          {/* Store Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Store Info</h3>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Store Name</label>
                <input type="text" value={template.storeInfo.name} onChange={(e) => updateStoreInfo("name", e.target.value)} 
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Tagline</label>
                <input type="text" value={template.storeInfo.tagline} onChange={(e) => updateStoreInfo("tagline", e.target.value)} 
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                <input type="email" value={template.storeInfo.email} onChange={(e) => updateStoreInfo("email", e.target.value)} 
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                <input type="text" value={template.storeInfo.phone} onChange={(e) => updateStoreInfo("phone", e.target.value)} 
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Address</label>
                <input type="text" value={template.storeInfo.address} onChange={(e) => updateStoreInfo("address", e.target.value)} 
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Banner Image URL</label>
                <input type="text" value={template.storeInfo.banner || ""} onChange={(e) => updateStoreInfo("banner", e.target.value)} 
                  placeholder="https://example.com/banner.jpg"
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Colors</h3>
            </div>
            <div className="p-3 space-y-3">
              {[
                { label: "Primary", key: "primaryColor", color: template.design.primaryColor },
                { label: "Secondary", key: "secondaryColor", color: template.design.secondaryColor },
                { label: "Accent", key: "accentColor", color: template.design.accentColor },
              ].map(({ label, key, color }) => (
                <div key={key}>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={color} onChange={(e) => updateDesign(key, e.target.value)} 
                      className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer" />
                    <input type="text" value={color} onChange={(e) => updateDesign(key, e.target.value)} 
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Typography</h3>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Font Family</label>
                <select value={template.design.fontFamily} onChange={(e) => updateDesign("fontFamily", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40">
                  <option value="Inter">Inter</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Space Grotesk">Space Grotesk</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Button Style</label>
                <select value={template.design.buttonStyle} onChange={(e) => updateDesign("buttonStyle", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40">
                  <option value="rounded-full">Rounded (Full)</option>
                  <option value="rounded-lg">Rounded (Medium)</option>
                  <option value="rounded">Rounded (Small)</option>
                  <option value="none">Square</option>
                </select>
              </div>
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[10px] text-gray-600 dark:text-gray-400">Dark Mode</span>
                  <button onClick={() => updateDesign("darkMode", !template.design.darkMode)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${template.design.darkMode ? "bg-[#0A2E1A]" : "bg-gray-300 dark:bg-gray-700"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${template.design.darkMode ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Social Links</h3>
            </div>
            <div className="p-3 space-y-2">
              {[
                { key: "facebook", icon: FacebookIcon, placeholder: "Facebook URL" },
                { key: "instagram", icon: InstagramIcon, placeholder: "Instagram URL" },
                { key: "twitter", icon: TwitterIcon, placeholder: "Twitter URL" },
                { key: "youtube", icon: YoutubeIcon, placeholder: "YouTube URL" },
              ].map(({ key, icon: Icon, placeholder }) => (
                <div key={key} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-gray-400" />
                  <input type="text" placeholder={placeholder} value={template.socialLinks[key as keyof SocialLinks]} 
                    onChange={(e) => updateSocial(key as keyof SocialLinks, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}