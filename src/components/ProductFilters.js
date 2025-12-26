"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * ProductFilters Component
 */
export default function ProductFilters({
  filters,
  onFilterChange,
  onSortChange,
  sortBy,
  sortOrder,

}) {
  const [minPrice, setMinPrice] = useState(
    filters.minPrice !== undefined && filters.minPrice !== null
      ? filters.minPrice
      : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice !== undefined && filters.maxPrice !== null
      ? filters.maxPrice
      : ""
  );

  useEffect(() => {
    setMinPrice(filters.minPrice !== undefined && filters.minPrice !== null ? filters.minPrice : "");
  }, [filters.minPrice]);

  useEffect(() => {
    setMaxPrice(filters.maxPrice !== undefined && filters.maxPrice !== null ? filters.maxPrice : "");
  }, [filters.maxPrice]);
  const handleMinPriceChange = (e) => {
    const raw = e.target.value;
    const value = raw === "" ? "" : parseFloat(raw);
    setMinPrice(value);

    onFilterChange({
      ...filters,
      minPrice: value,
    });
  };


  const handleMaxPriceChange = (e) => {
    const raw = e.target.value;
    const value = raw === "" ? "" : parseFloat(raw);
    setMaxPrice(value);

    onFilterChange({
      ...filters,
      maxPrice: value,
    });
  };


  const handleAvailabilityChange = (e) => {
    const value = e.target.checked;

    onFilterChange({
      ...filters,
      onlyAvailable: value,
    });
  };

  const handleSortChange = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(field, newOrder);
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");

    onFilterChange({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      onlyAvailable: false,
    });

    if (onSortChange) onSortChange("", "");
  };

  return (
    <div className="animate-in slide-in-left">
      <h2 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b-2 border-gray-100">
        Filters & Sort
      </h2>
      <div className="grid grid-cols-1">
        {/* Price Range Filter */}
        <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-gray-100">
          <label className="text-sm font-semibold text-gray-900">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                id="min-price"
                type="number"
                className=""
                placeholder="Min"
                min="0"
                max={maxPrice}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <span className="text-gray-600">-</span>
            <div className="flex-1 relative">
              <input
                id="max-price"
                type="number"
                className=""
                placeholder="Max"
                min={minPrice}
                max="10000"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
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
              checked={filters.onlyAvailable || false}
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
          <div className="flex gap-2">
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer bg-white"
              value={sortBy || ""}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Select</option>
              <option value="price">Price</option>
              {/* <option value="name">Name</option> */}
              <option value="rating">Rating</option>
              <option value="discount">Discount</option>
            </select>
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-semibold transition-all text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSortChange && onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")}
              title={sortBy ? `Sort ${sortOrder === "asc" ? "descending" : "ascending"}` : "Select a sort field"}
              disabled={!sortBy}
            >
              {sortBy ? (sortOrder === "asc" ? "Low → High" : "High → Low") : "Order"}
              {/* {sortOrder === "asc" ? "↑" : "↓"} */}
            </button>
          </div>
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
