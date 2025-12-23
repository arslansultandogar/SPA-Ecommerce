"use client";

import { useState } from "react";

/**
 * ProductFilters Component
 * Provides filtering and sorting controls for products
 * Supports filtering by name, price range, availability
 * Supports sorting by price, name, rating
 */
export default function ProductFilters({
  filters,
  onFilterChange,
  onSortChange,
  sortBy,
  sortOrder,
}) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 1000);
  const [onlyAvailable, setOnlyAvailable] = useState(
    filters.onlyAvailable || false
  );

  /**
   * Handle search input change with debouncing
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update parent component with new search term
    onFilterChange({
      ...filters,
      searchTerm: value,
    });
  };

  /**
   * Handle minimum price change
   */
  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setMinPrice(value);

    onFilterChange({
      ...filters,
      minPrice: value,
    });
  };

  /**
   * Handle maximum price change
   */
  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 1000;
    setMaxPrice(value);

    onFilterChange({
      ...filters,
      maxPrice: value,
    });
  };

  /**
   * Handle availability filter toggle
   */
  const handleAvailabilityChange = (e) => {
    const value = e.target.checked;
    setOnlyAvailable(value);

    onFilterChange({
      ...filters,
      onlyAvailable: value,
    });
  };

  /**
   * Handle sort change
   */
  const handleSortChange = (field) => {
    // If clicking the same field, toggle order; otherwise set to ascending
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(field, newOrder);
  };

  /**
   * Reset all filters to default values
   */
  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice(0);
    setMaxPrice(1000);
    setOnlyAvailable(false);

    onFilterChange({
      searchTerm: "",
      minPrice: 0,
      maxPrice: 1000,
      onlyAvailable: false,
    });
  };

  return (
    <div className="animate-in slide-in-left">
      <h2 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b-2 border-gray-100">
        Filters & Sort
      </h2>

      {/* Search Filter */}
      <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-gray-100">
        <label className="text-sm font-semibold text-gray-900">
          Search Products
        </label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-gray-100">
        <label className="text-sm font-semibold text-gray-900">
          Price Range
        </label>
        <div className="flex items-end gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <label
              htmlFor="min-price"
              className="text-xs text-gray-600 font-semibold uppercase"
            >
              Min
            </label>
            <input
              id="min-price"
              type="number"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 transition-all"
              min="0"
              max={maxPrice}
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <span className="text-gray-600">-</span>
          <div className="flex-1 flex flex-col gap-1">
            <label
              htmlFor="max-price"
              className="text-xs text-gray-600 font-semibold uppercase"
            >
              Max
            </label>
            <input
              id="max-price"
              type="number"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 transition-all"
              min={minPrice}
              max="10000"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        {/* Price Range Display */}
        <div className="text-center font-semibold text-red-600 bg-gray-50 rounded py-2 text-sm mt-2">
          ${minPrice.toFixed(0)} - ${maxPrice.toFixed(0)}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-gray-100">
        <label className="text-sm font-semibold text-gray-900">
          Availability
        </label>
        <div className="flex items-center gap-3">
          <input
            id="availability-checkbox"
            type="checkbox"
            className="w-5 h-5 accent-red-600"
            checked={onlyAvailable}
            onChange={handleAvailabilityChange}
          />
          <label
            htmlFor="availability-checkbox"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Only Available Products
          </label>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex flex-col gap-2 mb-5 pb-5">
        <label className="text-sm font-semibold text-gray-900">Sort By</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all text-left ${
              sortBy === "price"
                ? "bg-red-50 border-red-600 text-red-600 border-2"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
            }`}
            onClick={() => handleSortChange("price")}
            title="Sort by price"
          >
            Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>

          <button
            className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all text-left ${
              sortBy === "name"
                ? "bg-red-50 border-red-600 text-red-600 border-2"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
            }`}
            onClick={() => handleSortChange("name")}
            title="Sort by name"
          >
            Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>

          <button
            className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all text-left ${
              sortBy === "rating"
                ? "bg-red-50 border-red-600 text-red-600 border-2"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
            }`}
            onClick={() => handleSortChange("rating")}
            title="Sort by rating"
          >
            Rating {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>

          <button
            className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all text-left ${
              sortBy === "discount"
                ? "bg-red-50 border-red-600 text-red-600 border-2"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
            }`}
            onClick={() => handleSortChange("discount")}
            title="Sort by discount"
          >
            Discount{" "}
            {sortBy === "discount" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="w-full border-2 border-gray-400 text-gray-600 py-2 px-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
        onClick={handleResetFilters}
      >
        Reset All Filters
      </button>
    </div>
  );
}
