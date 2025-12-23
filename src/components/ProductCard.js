"use client";

import { ShoppingCartIcon, Package } from "lucide-react";

/**
 * ProductCard Component
 * Displays individual product information in a card format
 * Shows product image, name, price, rating, and availability
 */
export default function ProductCard({ product }) {
  // Calculate discount percentage
  const discountPercent = product.discount || 0;
  const originalPrice = product.originalPrice || product.price;

  /**
   * Generate star rating display
   * @param {number} rating - Rating value (0-5)
   * @returns {string} - Star emoji string
   */
  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "★".repeat(fullStars);
    if (hasHalfStar) stars += "½";
    return stars;
  };

  /**
   * Get availability badge color
   */
  const getAvailabilityColor = () => {
    return product.availability ? "text-emerald-600" : "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full animate-in fade-in slide-in-up">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-linear-to-br from-gray-100 via-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <Package size={80} className="text-gray-400" />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-down">
            {discountPercent}% OFF
          </div>
        )}

        {/* Availability Badge */}
        <div
          className={`absolute bottom-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor()}`}
        >
          {product.availability ? "✓ In Stock" : "✗ Out of Stock"}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category */}
        <span className="text-xs font-bold uppercase tracking-wide text-red-600">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-xs text-gray-600 line-clamp-2 hidden sm:block">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-sm tracking-widest">
            {getStarRating(parseFloat(product.rating))}
          </span>
          <span className="text-gray-700">
            {product.rating}
            <span className="text-gray-500 text-xs">({product.reviews})</span>
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-xl text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.availability && (
          <p className="text-xs text-red-600 font-medium">
            Only {product.inStock} left in stock
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          className={`mt-auto py-2 px-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            product.availability
              ? "bg-linear-to-r from-red-600 via-red-600 to-red-700 text-white hover:-translate-y-0.5 active:translate-y-0"
              : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-60"
          }`}
          disabled={!product.availability}
        >
          {product.availability ? (
            <>
              <ShoppingCartIcon className="w-4 h-4" /> Add to Cart
            </>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </div>
  );
}
