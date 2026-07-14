// app/admin/template-builder/types/index.ts

export interface Product {
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

export interface PageTemplate {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  isCustom?: boolean;
  required?: boolean;
}

export interface TemplateLayout {
  header: string;
  footer: string;
  hero: string;
  productCard: string;
  category: string;
}

export interface TemplateBranding {
  defaultColors: string[];
  defaultFont: string;
  logo?: string;
  favicon?: string;
  banner?: string;
}

export interface TemplateFeatures {
  wishlist: boolean;
  reviews: boolean;
  blog: boolean;
  testimonials: boolean;
  newsletter: boolean;
  flashSale: boolean;
  coupons: boolean;
  compare: boolean;
}

export interface Template {
  id: string;
  name: string;
  industry: string;
  icon: any;
  heroIcon: any;
  description: string;
  pages: PageTemplate[];
  layouts: TemplateLayout;
  branding: TemplateBranding;
  features: TemplateFeatures;
  demoProducts: Product[];
  popular?: boolean;
  featured?: boolean;
}

export interface BrandingSettings {
  logo: string | null;
  favicon: string | null;
  banner: string | null;
  storeName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  buttonStyle: string;
  cardStyle: string;
  animation: boolean;
  darkMode: boolean;
}

export interface LayoutSettings {
  headerStyle: string;
  footerStyle: string;
  heroLayout: string;
  productCardStyle: string;
  categoryLayout: string;
  bannerStyle: string;
  spacing: string;
  containerWidth: string;
  sidebarPosition: "left" | "right" | "none";
}

export interface HomepageSections {
  hero: boolean;
  categories: boolean;
  featuredProducts: boolean;
  flashSale: boolean;
  newArrivals: boolean;
  brands: boolean;
  testimonials: boolean;
  newsletter: boolean;
  instagramFeed: boolean;
  footer: boolean;
}

export interface TemplateData {
  templateId: string;
  branding: BrandingSettings;
  layout: LayoutSettings;
  pages: PageTemplate[];
  homepageSections: HomepageSections;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  published: boolean;
  lastSaved: string | null;
}