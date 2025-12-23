/**
 * Product Service - Handles all product-related API calls
 * Uses a mock API with realistic product data
 * Can be easily replaced with a real API endpoint
 */

/**
 * Generate realistic mock product data
 * Creates 150 unique products with realistic attributes
 * @returns {Array} - Array of product objects
 */
function generateMockProducts() {
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Toys',
    'Tools',
  ];

  const brands = [
    'TechPro',
    'StyleHub',
    'HomeMax',
    'SportZone',
    'BookWise',
    'BeautyPlus',
    'PlayTime',
    'ToolMaster',
  ];

  const products = [];
  const productNames = [
    'Premium Headphones',
    'Wireless Mouse',
    'USB-C Cable',
    'Phone Stand',
    'Laptop Bag',
    'Screen Protector',
    'Power Bank',
    'Phone Case',
    'Keyboard',
    'Monitor',
    'Desk Lamp',
    'USB Hub',
    'Webcam',
    'Microphone',
    'Speaker',
    'Memory Card',
    'External SSD',
    'Router',
    'Charger',
    'Adapter',
  ];

  // Generate 150 products
  for (let i = 1; i <= 150; i++) {
    const name = `${productNames[i % productNames.length]} ${i}`;
    const basePrice = Math.floor(Math.random() * 900) + 50;

    products.push({
      id: i,
      name,
      price: basePrice,
      originalPrice: basePrice + Math.floor(Math.random() * 50) + 10,
      description: `High-quality ${name.toLowerCase()}. Perfect for everyday use with premium features and durability. Trusted by thousands of customers worldwide.`,
      category: categories[Math.floor(Math.random() * categories.length)],
      brand: brands[Math.floor(Math.random() * brands.length)],
      rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
      reviews: Math.floor(Math.random() * 5000) + 100,
      availability: Math.random() > 0.2, // 80% availability
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`,
      inStock: Math.floor(Math.random() * 100),
      discount: Math.floor(Math.random() * 40),
      tags: [
        categories[Math.floor(Math.random() * categories.length)].toLowerCase(),
        'trending',
      ],
    });
  }

  return products;
}

/**
 * Simulates a network delay for realistic API behavior
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
function simulateNetworkDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all products from the API
 * In production, this would be replaced with a real API endpoint
 * @returns {Promise<Array>} - Array of product objects
 */
export async function fetchProducts() {
  // Simulate network request
  await simulateNetworkDelay(800);

  // In production, replace with:
  // const response = await fetch('https://api.example.com/products');
  // return response.json();

  return generateMockProducts();
}

/**
 * Fetch products with pagination
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} - Paginated products with metadata
 */
export async function fetchProductsPaginated(page = 1, limit = 12) {
  const allProducts = await fetchProducts();
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  // Validate page number
  const validPage = Math.max(1, Math.min(page, totalPages));

  // Calculate pagination
  const startIndex = (validPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: validPage,
      totalPages,
      totalProducts,
      itemsPerPage: limit,
      hasNextPage: validPage < totalPages,
      hasPreviousPage: validPage > 1,
    },
  };
}

/**
 * Sort products by a specified field and order
 * Optimized for performance using native sort method
 * @param {Array} products - Array of products to sort
 * @param {string} sortBy - Field to sort by (price, name, rating)
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted products (creates new array, doesn't mutate)
 */
export function sortProducts(products, sortBy = 'price', order = 'desc') {
  // Create a shallow copy to avoid mutating the original array
  const sortedProducts = [...products];

  const sortFunctions = {
    price: (a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    },
    name: (a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      const comparison = nameA.localeCompare(nameB);
      return order === 'asc' ? comparison : -comparison;
    },
    rating: (a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    },
    discount: (a, b) => {
      const discountA = parseFloat(a.discount) || 0;
      const discountB = parseFloat(b.discount) || 0;
      return order === 'asc' ? discountA - discountB : discountB - discountA;
    },
  };

  // Use the appropriate sorting function or default to price
  const sortFn = sortFunctions[sortBy] || sortFunctions.price;
  return sortedProducts.sort(sortFn);
}

/**
 * Filter products by multiple criteria
 * Supports filtering by name, price range, and availability
 * @param {Array} products - Array of products to filter
 * @param {Object} filters - Filter criteria
 * @param {string} filters.searchTerm - Search term for product name
 * @param {number} filters.minPrice - Minimum price
 * @param {number} filters.maxPrice - Maximum price
 * @param {boolean} filters.onlyAvailable - Only show available products
 * @returns {Array} - Filtered products
 */
export function filterProducts(products, filters = {}) {
  const {
    searchTerm = '',
    minPrice = 0,
    maxPrice = Infinity,
    onlyAvailable = false,
  } = filters;

  return products.filter((product) => {
    // Filter by search term (case-insensitive)
    if (
      searchTerm.trim() &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    const price = parseFloat(product.price) || 0;
    if (price < minPrice || price > maxPrice) {
      return false;
    }

    // Filter by availability
    if (onlyAvailable && !product.availability) {
      return false;
    }

    return true;
  });
}

/**
 * Combined function to fetch, filter, sort, and paginate products
 * Optimized for performance with minimal data transformations
 * @param {Object} options - Options object
 * @param {number} options.page - Page number (1-indexed)
 * @param {number} options.limit - Items per page
 * @param {string} options.sortBy - Field to sort by
 * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
 * @param {Object} options.filters - Filter criteria
 * @returns {Promise<Object>} - Processed products with pagination metadata
 */
export async function getProcessedProducts(options = {}) {
  const {
    page = 1,
    limit = 12,
    sortBy = 'price',
    sortOrder = 'desc',
    filters = {},
  } = options;

  try {
    // Fetch all products
    let products = await fetchProducts();

    // Apply filters (before pagination for accurate total count)
    products = filterProducts(products, filters);

    // Apply sorting
    products = sortProducts(products, sortBy, sortOrder);

    // Calculate pagination
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const validPage = Math.max(1, Math.min(page, totalPages));

    // Paginate
    const startIndex = (validPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      success: true,
      products: paginatedProducts,
      pagination: {
        currentPage: validPage,
        totalPages,
        totalProducts,
        itemsPerPage: limit,
        hasNextPage: validPage < totalPages,
        hasPreviousPage: validPage > 1,
      },
      filters: {
        applied: Object.keys(filters).length > 0,
        criteria: filters,
      },
    };
  } catch (error) {
    console.error('Error processing products:', error);
    return {
      success: false,
      products: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        itemsPerPage: limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      error: error.message,
    };
  }
}
