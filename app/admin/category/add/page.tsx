"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Bold, 
  Italic, 
  List as ListIcon,
  Calendar,
  Globe,
  ShoppingBag,
  Store,
  Info,
  CheckCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [publishingDate, setPublishingDate] = useState(new Date().toISOString().split('T')[0]);
  const [salesChannels, setSalesChannels] = useState({
    onlineStore: true,
    pointOfSale: false,
    googleYouTube: false
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    }
    
    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
    }
    
    if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // Create form data for submission
      const formData = {
        id: Date.now(), // Generate unique ID
        name: categoryName,
        slug: `/${slug}`,
        description,
        status: status === "active" ? "Active" : "Inactive",
        products: 0, // New category starts with 0 products
        publishingDate,
        salesChannels,
        image: image ? URL.createObjectURL(image) : null,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Get existing categories from localStorage
      const existingCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      
      // Add new category
      const updatedCategories = [...existingCategories, formData];
      
      // Save to localStorage
      localStorage.setItem('categories', JSON.stringify(updatedCategories));

      console.log("Category created:", formData);
      
      // Show success message
      alert("Category created successfully!");
      
      // Redirect to category list
      router.push("/admin/category");
      
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link 
            href="/admin/category"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Add Category</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Collections / New Category</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Information</h2>
                
                {/* Category Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      // Auto-generate slug if not manually edited
                      if (!slug || slug === e.target.value.toLowerCase().replace(/\s+/g, '-')) {
                        setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                      }
                    }}
                    placeholder="e.g. Summer Essentials"
                    className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                      errors.categoryName ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                    required
                  />
                  {errors.categoryName && (
                    <p className="mt-1 text-sm text-red-500">{errors.categoryName}</p>
                  )}
                </div>

                {/* Slug */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex items-center bg-gray-50 dark:bg-gray-700 border rounded-xl px-4 py-2.5 ${
                    errors.slug ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  }`}>
                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">marketpro.com/category/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="ml-1 w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
                      placeholder="summer-essentials"
                      required
                    />
                  </div>
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                    <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                        <Bold className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                        <Italic className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                        <ListIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your Category..."
                      rows={4}
                      className="w-full px-4 py-3 outline-none text-sm text-gray-900 dark:text-white resize-none dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Category Image */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Image</h2>
                
                {!imagePreview ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                        : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Click or drag to upload banner</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG or WEBP (Recommended: 1200x400px, Max: 5MB)</p>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Category banner" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Visibility */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status & Visibility</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={status === "active"}
                      onChange={() => setStatus("active")}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={status === "inactive"}
                      onChange={() => setStatus("inactive")}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                  </label>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Publishing Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="date"
                      value={publishingDate}
                      onChange={(e) => setPublishingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Specify when this collection goes live.
                  </p>
                </div>
              </div>

              {/* Sales Channels */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Channels</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={salesChannels.onlineStore}
                      onChange={(e) => setSalesChannels({...salesChannels, onlineStore: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded dark:bg-gray-700"
                    />
                    <ShoppingBag className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Online Store</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={salesChannels.pointOfSale}
                      onChange={(e) => setSalesChannels({...salesChannels, pointOfSale: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded dark:bg-gray-700"
                    />
                    <Store className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Point of Sale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={salesChannels.googleYouTube}
                      onChange={(e) => setSalesChannels({...salesChannels, googleYouTube: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded dark:bg-gray-700"
                    />
                    <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Google & YouTube</span>
                  </label>
                </div>
              </div>

              {/* Market Pro Tip */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Market Pro Tip</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      Collections with high-quality banner images see a <span className="font-semibold text-indigo-600 dark:text-indigo-400">24% higher</span> conversion rate. Ensure your image clearly represents the items within.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.push("/admin/category")}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}