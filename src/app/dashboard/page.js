"use client";

import { useRouter } from "next/navigation";
import { Zap, Shield, Star, MessageCircle, Package } from "lucide-react";

/**
 * Welcome Page Component
 */
export default function WelcomePage() {
  const router = useRouter();

  const handleViewProducts = () => {
    router.push("/dashboard/products");
  };

  return (
    <div className="w-full mx-auto animate-in fade-in">
      {/* Welcome Card */}
      <div className="">
        {/* Features Section */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-linear-to-br from-blue-50 via-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all">
              <Zap size={32} className="text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-blue-700">
                Get your orders delivered quickly and reliably
              </p>
            </div>

            <div className="p-6 bg-linear-to-br from-green-50 via-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <Shield size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-green-700">
                Your payment information is safe and secure
              </p>
            </div>

            <div className="p-6 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 hover:shadow-md transition-all">
              <Star size={32} className="text-yellow-600 mb-3" />
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                Quality Products
              </h3>
              <p className="text-yellow-700">
                Handpicked products from trusted sellers
              </p>
            </div>

            <div className="p-6 bg-linear-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-all">
              <MessageCircle size={32} className="text-pink-600 mb-3" />
              <h3 className="text-lg font-bold text-pink-900 mb-2">
                Great Support
              </h3>
              <p className="text-pink-700">
                24/7 customer support for your convenience
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-200 text-center space-y-4">
          <button
            className="inline-block bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 text-lg"
            onClick={handleViewProducts}
          >
            Browse Our Products →
          </button>
          <p className="text-gray-600 text-sm">
            Explore our extensive catalog of products
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x border-t">
          <div className="p-6 text-center hover:bg-red-50 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              1000+
            </div>
            <div className="text-gray-700 font-semibold">Products</div>
          </div>
          <div className="p-6 text-center hover:bg-red-50 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              50K+
            </div>
            <div className="text-gray-700 font-semibold">Happy Customers</div>
          </div>
          <div className="p-6 text-center hover:bg-red-50 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              4.8{" "}
              <Star
                size={28}
                className="inline-block ml-1 text-yellow-500"
                fill="currentColor"
              />
            </div>
            <div className="text-gray-700 font-semibold">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
