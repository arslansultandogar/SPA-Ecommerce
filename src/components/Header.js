'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

/**
 * Header Component
 * Displays the current page title and menu toggle for mobile
 * Updates title based on current route
 */
export default function Header({ onMenuClick }) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('Dashboard');

  /**
   * Update page title based on current route
   */
  useEffect(() => {
    const titles = {
      '/dashboard': 'Welcome',
      '/dashboard/products': 'Products',
    };

    setPageTitle(titles[pathname] || 'Dashboard');
  }, [pathname]);

  return (
    <header className="bg-linear-to-r from-red-600 via-red-600 to-red-700 text-white border-b border-white/10 shadow-md">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Menu Button for Mobile */}
        <button
          className="md:hidden p-1 hover:scale-110 transition-transform"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-white" />
        </button>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold flex-1 md:flex-none animate-in slide-in-down">
          {pageTitle}
        </h1>

        {/* Header Right Section */}
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base opacity-90">E-Commerce Store</span>
        </div>
      </div>
    </header>
  );
}
