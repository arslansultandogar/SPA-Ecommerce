"use client";

import { useState } from "react";

/**
 * Product Search or Filter by Name Component
 */

export default function SearchProduct({ filters, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

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
  return (
    <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-gray-100">
      <label className="text-sm font-semibold text-gray-900">
        Search Products
      </label>
      <input
        type="text"
        className=""
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
