"use client";

import { ShoppingCartIcon, Package } from "lucide-react";

/**
 * ProductCard Component
 */
export default function ProductCard({ product }) {
  const discountPercent = product.discount || 0;
  const originalPrice = product.originalPrice || product.price;

  const getStarRating = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 text-yellow-500"
            aria-hidden
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star (left half filled)
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3 h-3 text-yellow-500"
            aria-hidden
          >
            <defs>
              <linearGradient id={`half-${product.id}`} x1="0%" x2="100%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z"
              fill={`url(#half-${product.id})`}
              stroke="currentColor"
              strokeWidth="0"
            />
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-3 h-3 text-yellow-400"
            aria-hidden
          >
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" />
          </svg>
        );
      }
    }
    return stars;
  };

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
          <span className="text-sm tracking-widest inline-flex items-center ">
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
