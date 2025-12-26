"use client";

import { ShoppingCartIcon, Package } from "lucide-react";
import Stars from "@/components/Stars";

/**
 * ProductCard Component
 */
export default function ProductCard({ product }) {
  const discountPercent = product.discount || 0;
  const originalPrice = product.originalPrice || product.price || 0;

  const getAvailabilityColor = () => {
    return product.availability ? "text-emerald-600" : "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full animate-in fade-in slide-in-up">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-linear-to-br from-gray-100 via-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400"> 
            <Package className="w-12 h-12 mb-2" />
            <span className="text-sm">No Image</span>
          </div>
        )}

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
          <Stars rating={parseFloat(product.rating) || 0} reviews={product.reviews || 0} id={product.id || Math.random().toString(36).slice(2)} />
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
