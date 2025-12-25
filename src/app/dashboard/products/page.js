"use client";

import { useEffect, useState, useCallback } from "react";
import { getProcessedProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import PaginationControls from "@/components/PaginationControls";
import { Settings, AlertCircle, Search } from "lucide-react";
import SearchProduct from "@/components/SearchProduct";

/**
 * Products Page Component
 */
export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 1000,
    onlyAvailable: false,
  });
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchAndProcessProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getProcessedProducts({
        page: currentPage,
        limit: itemsPerPage,
        sortBy,
        sortOrder,
        filters,
      });

      if (result.success) {
        setProducts(result.products);
        setPagination(result.pagination);
      } else {
        setError(result.error || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching products");
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy, sortOrder, filters]);

  useEffect(() => {
    fetchAndProcessProducts();
  }, [fetchAndProcessProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in relative">
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden px-4 pt-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all"
        >
          <Settings className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Mobile Filters - Modal */}
      <aside
        className={`md:hidden fixed left-0 top-0 h-screen w-[90%] bg-white z-50 overflow-y-auto transition-transform duration-300 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setShowFilters(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ✕
        </button>

        <div className="p-4 mt-12">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </aside>

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:p-8 pb-8 relative">
        {/* Desktop Filters - Sidebar */}
        <aside className="hidden md:block col-span-1 sticky top-12 self-start h-fit">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </aside>

        {/* Products Grid and Pagination */}
        <main className="w-full md:col-span-3">
          {/* Search Filter */}
          <SearchProduct
            filters={filters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Results Info */}
          {!loading && (
            <div className="mb-6 text-sm text-gray-700 bg-gray-100 rounded-lg p-4">
              <p>
                Showing{" "}
                {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
                to{" "}
                {Math.min(currentPage * itemsPerPage, pagination.totalProducts)}{" "}
                of{" "}
                <strong className="text-gray-900">
                  {pagination.totalProducts}
                </strong>{" "}
                products
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex items-center justify-between animate-in shake">
              <div className="flex items-center gap-3">
                <AlertCircle size={24} className="text-red-600 shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
              <button
                onClick={fetchAndProcessProducts}
                className="text-red-600 hover:text-red-800 font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-semibold">Loading products...</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {/* No Products Message */}
          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-gray-100 rounded-xl">
              <Search size={64} className="text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900">
                No Products Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria
              </p>
              <button
                className="bg-linear-to-r from-pink-400 via-pink-400 to-red-500 hover:from-pink-500 hover:via-pink-500 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all hover:-translate-y-0.5"
                onClick={() => {
                  setFilters({
                    searchTerm: "",
                    minPrice: 0,
                    maxPrice: 1000,
                    onlyAvailable: false,
                  });
                  setCurrentPage(1);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
