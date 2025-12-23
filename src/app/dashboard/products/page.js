"use client";

import { useEffect, useState, useCallback } from "react";
import { getProcessedProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import PaginationControls from "@/components/PaginationControls";

/**
 * Products Page Component
 * Main product listing page with filtering, sorting, and pagination
 * Fetches product data and manages state for user interactions
 */
export default function ProductsPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Product data state
  const [products, setProducts] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [pagination, setPagination] = useState({});

  // Loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 1000,
    onlyAvailable: false,
  });

  // Sort state
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");

  /**
   * Fetch and process products based on current filters, sort, and pagination
   * Memoized with useCallback to prevent unnecessary re-renders
   */
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
        setFilteredCount(result.pagination.totalProducts);
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

  /**
   * Effect hook to fetch products when page, filters, or sort changes
   */
  useEffect(() => {
    fetchAndProcessProducts();
  }, [fetchAndProcessProducts]);

  /**
   * Handle filter changes - reset to page 1 when filters change
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  /**
   * Handle sort changes - reset to page 1 when sort changes
   */
  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  /**
   * Handle page changes
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in">
      {/* Header Section */}
      <div className="bg-linear-to-r from-red-600 via-red-600 to-red-700 p-8 md:p-12 text-center text-white animate-in slide-in-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Products</h1>
        <p className="text-lg text-red-100">
          Browse our extensive collection of high-quality products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </aside>

        {/* Products Grid and Pagination */}
        <main className="md:col-span-3">
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
                <span className="text-2xl">⚠️</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
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
              <div className="text-5xl">🔍</div>
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
