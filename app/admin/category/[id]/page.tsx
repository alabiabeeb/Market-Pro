"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, ShoppingBag, Calendar, Tag, Eye, Loader2 } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  products: number;
  status: "Active" | "Inactive";
  description?: string;
  createdAt?: string;
  image?: string | null;
  publishingDate?: string;
  salesChannels?: {
    onlineStore: boolean;
    pointOfSale: boolean;
    googleYouTube: boolean;
  };
}

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategory = () => {
      try {
        const stored = localStorage.getItem('categories');
        if (stored) {
          const categories = JSON.parse(stored);
          const found = categories.find((c: Category) => c.id === id);
          setCategory(found || null);
        }
      } catch (error) {
        console.error("Error loading category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const getStatusStyles = (status: string) => {
    return status === "Active" 
      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
      : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
  };

  const getStatusDot = (status: string) => {
    return status === "Active"
      ? "bg-green-500"
      : "bg-gray-400";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0A2E1A] animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Tag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-sm">
          The category you're looking for doesn't exist or may have been deleted.
        </p>
        <button
          onClick={() => router.push("/admin/category")}
          className="mt-6 px-6 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] text-[#C8F135] rounded-xl transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link 
          href="/admin/category"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Category Details</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/category/edit/${category.id}`)}
            className="px-4 py-2 text-sm font-medium text-[#C8F135] bg-[#0A2E1A] hover:bg-[#060F09] rounded-xl transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Image */}
          {category.image && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category Name</label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">{category.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Slug</label>
                <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">marketpro.com/category{category.slug}</p>
              </div>
              
              {category.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{category.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sales Channels */}
          {category.salesChannels && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Channels</h2>
              <div className="flex flex-wrap gap-3">
                {category.salesChannels.onlineStore && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F7F4EE] dark:bg-[#0F1D14] text-[#0A2E1A] dark:text-[#C8F135] rounded-full text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    Online Store
                  </span>
                )}
                {category.salesChannels.pointOfSale && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                    <Tag className="w-4 h-4" />
                    Point of Sale
                  </span>
                )}
                {category.salesChannels.googleYouTube && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                    <Eye className="w-4 h-4" />
                    Google & YouTube
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status</h2>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusStyles(category.status)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(category.status)}`} />
              {category.status}
            </span>
          </div>

          {/* Meta Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Metadata</h2>
            
            <div className="space-y-3">
              {category.createdAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Created:</span>
                  <span className="text-gray-900 dark:text-white">{category.createdAt}</span>
                </div>
              )}
              {category.publishingDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Publishing:</span>
                  <span className="text-gray-900 dark:text-white">{category.publishingDate}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Products:</span>
                <span className="text-gray-900 dark:text-white">{category.products} items</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push(`/admin/category/edit/${category.id}`)}
                className="w-full px-4 py-2.5 text-sm font-medium text-[#0A2E1A] dark:text-[#C8F135] bg-[#F7F4EE] dark:bg-[#0F1D14] hover:bg-[#C8F135]/20 dark:hover:bg-[#153323] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Category
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
                    const stored = localStorage.getItem('categories');
                    if (stored) {
                      const categories = JSON.parse(stored);
                      const updated = categories.filter((c: Category) => c.id !== category.id);
                      localStorage.setItem('categories', JSON.stringify(updated));
                      router.push("/admin/category");
                    }
                  }
                }}
                className="w-full px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}