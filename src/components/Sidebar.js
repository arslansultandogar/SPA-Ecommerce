"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HomeIcon, LogOutIcon, ShoppingCartIcon } from "lucide-react";

/**
 * Sidebar Navigation Component
 * Provides navigation between dashboard pages (Welcome and Products)
 * Also includes logout functionality
 */
export default function Sidebar({ isOpen, onToggle }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  /**
   * Check if a route is currently active
   */
  const isActive = (route) => pathname === route;

  /**
   * Handle navigation to a route and close sidebar on mobile
   */
  const handleNavigate = (route) => {
    router.push(route);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  /**
   * Handle logout - clear session and redirect to login
   */
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 animate-in fade-in md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } animate-in slide-in-from-left md:animate-none`}
      >
        {/* Brand/Logo */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Arslan E-Store
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-5 overflow-y-auto">
          <ul className="space-y-0">
            {/* Welcome Page */}
            <li>
              <button
                className={`w-full flex items-center gap-3 px-5 py-3 border-l-4 transition-all text-left font-medium ${
                  isActive("/dashboard")
                    ? "bg-red-50 text-red-600 border-red-600"
                    : "text-gray-600 border-transparent hover:bg-gray-50"
                }`}
                onClick={() => handleNavigate("/dashboard")}
              >
                <HomeIcon
                  className={`w-4 h-4 ${
                    isActive("/dashboard") ? "text-red-600" : "text-gray-600"
                  }`}
                />
                <span>Welcome</span>
              </button>
            </li>

            {/* Products Page */}
            <li>
              <button
                className={`w-full flex items-center gap-3 px-5 py-3 border-l-4 transition-all text-left font-medium ${
                  isActive("/dashboard/products")
                    ? "bg-red-50 text-red-600 border-red-600"
                    : "text-gray-600 border-transparent hover:bg-gray-50"
                }`}
                onClick={() => handleNavigate("/dashboard/products")}
              >
                <ShoppingCartIcon
                  className={`w-4 h-4 ${
                    isActive("/dashboard/products")
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                />
                <span>Products</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-5 border-t border-gray-200">
          <button
            className="w-full flex items-center justify-center gap-2 text-red-500 py-2 px-4 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
