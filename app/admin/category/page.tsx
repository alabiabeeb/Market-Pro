"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  ArrowUpDown,
  AlertTriangle,
  X
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  products: number;
  status: "Active" | "Inactive";
  image?: string;
}

export default function CategoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load categories from localStorage on component mount
  useEffect(() => {
    const loadCategories = () => {
      try {
        const stored = localStorage.getItem('categories');
        if (stored) {
          setCategories(JSON.parse(stored));
        } else {
          // Default categories if none exist
          const defaultCategories = [
            {
              id: 1,
              name: "Summer Essentials",
              slug: "/summer-essentials",
              products: 42,
              status: "Active" as const
            },
            {
              id: 2,
              name: "Best Sellers",
              slug: "/best-sellers",
              products: 128,
              status: "Active" as const
            },
            {
              id: 3,
              name: "New Arrivals",
              slug: "/new-arrivals",
              products: 15,
              status: "Inactive" as const
            },
            {
              id: 4,
              name: "Winter Clearance",
              slug: "/winter-clearance",
              products: 89,
              status: "Active" as const
            }
          ];
          setCategories(defaultCategories);
          localStorage.setItem('categories', JSON.stringify(defaultCategories));
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const totalItems = categories.length;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getStatusStyles = (status: string) => {
    return status === "Active"
      ? "bg-[#F7F4EE] text-[#0A2E1A] border-[#C8F135]/50 dark:bg-[#0F1D14] dark:text-[#C8F135] dark:border-[#C8F135]/30"
      : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
  };

  const getStatusDot = (status: string) => {
    return status === "Active"
      ? "bg-[#0A2E1A] dark:bg-[#C8F135]"
      : "bg-gray-400";
  };

  // Handle View Category
  const handleViewCategory = (category: Category) => {
    router.push(`/admin/category/${category.id}`);
  };

  // Handle Edit Category
  const handleEditCategory = (category: Category) => {
    router.push(`/admin/category/edit/${category.id}`);
  };

  // Handle Delete Category
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      const updatedCategories = categories.filter(c => c.id !== categoryToDelete.id);
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  // Handle Status Toggle
  const handleStatusToggle = (categoryId: number) => {
    const updatedCategories = categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" as "Active" | "Inactive" }
        : cat
    );
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A2E1A] dark:border-[#C8F135] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#F7F4EE] dark:bg-[#060F09]">
      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2E1A] dark:text-[#F7F4EE]">Category</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Organize your products into categories to help customers find what they're looking for.
              </p>
            </div>
            <button 
              onClick={() => router.push("/admin/category/add")} 
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A2E1A] hover:bg-[#061A11] text-[#C8F135] text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-[#0A2E1A]/20"
            >
              <Plus className="w-4 h-4" />
              Create Category
            </button>
          </div>
        </div>

        {/* Toolbar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8F135]/30 focus:border-[#0A2E1A] transition-all dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? "bg-[#F7F4EE] dark:bg-[#0F1D14] text-[#0A2E1A] dark:text-[#C8F135]" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-[#F7F4EE] dark:bg-[#0F1D14] text-[#0A2E1A] dark:text-[#C8F135]" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table/Grid View */}
        <div className="bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl shadow-sm">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No categories yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create your first category to get started.</p>
              <button
                onClick={() => router.push("/admin/category/add")}
                className="px-4 py-2 bg-[#0A2E1A] hover:bg-[#061A11] text-[#C8F135] rounded-xl transition-colors"
              >
                Create Category
              </button>
            </div>
          ) : (
            <>
              {/* List View */}
              {viewMode === "list" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F7F4EE] dark:bg-[#0F1D14] border-b border-[#E5E7EB] dark:border-[#153323]">
                        <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 py-3">
                          <div className="flex items-center gap-1">
                            Category
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 py-3">
                          Slug
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 py-3">
                          Products
                        </th>
                        <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 py-3">
                          Status
                        </th>
                        <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#153323]">
                      {paginatedCategories.map((category) => (
                        <tr 
                          key={category.id}
                          className="hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors"
                          onMouseEnter={() => setSelectedCategory(category.id)}
                          onMouseLeave={() => setSelectedCategory(null)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#F7F4EE] dark:bg-[#0F1D14] flex items-center justify-center">
                                <span className="text-xs font-bold text-[#0A2E1A] dark:text-[#C8F135]">
                                  {category.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {category.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                              {category.slug}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {category.products} items
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleStatusToggle(category.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                                getStatusStyles(category.status)
                              } hover:opacity-80`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(category.status)}`} />
                              {category.status}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button 
                                onClick={() => handleViewCategory(category)}
                                className="p-1.5 text-gray-400 hover:text-[#0A2E1A] hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] rounded-lg transition-colors"
                                title="View Category"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditCategory(category)}
                                className="p-1.5 text-gray-400 hover:text-[#0A2E1A] hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] rounded-lg transition-colors"
                                title="Edit Category"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(category)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete Category"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] rounded-lg transition-colors"
                                title="More Options"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {paginatedCategories.map((category) => (
                    <div 
                      key={category.id}
                      className="bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] dark:bg-[#0F1D14] flex items-center justify-center">
                            <span className="text-sm font-bold text-[#0A2E1A] dark:text-[#C8F135]">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                              {category.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                              {category.slug}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleStatusToggle(category.id)}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border transition-all ${
                            getStatusStyles(category.status)
                          } hover:opacity-80`}
                        >
                          <span className={`w-1 h-1 rounded-full ${getStatusDot(category.status)}`} />
                          {category.status}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#153323]">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {category.products} products
                        </span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleViewCategory(category)}
                            className="p-1.5 text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#C8F135] rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleEditCategory(category)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(category)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 border-t border-[#E5E7EB] dark:border-[#153323] bg-[#F7F4EE]/60 dark:bg-[#0F1D14]/60">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-lg hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-[#C8F135] bg-[#0A2E1A] rounded-lg">
                    {currentPage}
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-lg hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#08120C] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Category</h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the category <span className="font-semibold text-gray-900 dark:text-white">"{categoryToDelete.name}"</span>? 
              This action cannot be undone and will remove all products associated with this category.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#08120C] border border-[#E5E7EB] dark:border-[#153323] rounded-xl hover:bg-[#F7F4EE] dark:hover:bg-[#0F1D14] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}