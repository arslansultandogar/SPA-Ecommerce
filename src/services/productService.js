
/**
 * 
 * @param {number} ms - 
 * @returns {Promise}
 */
function simulateNetworkDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @returns {Promise<Array>} - 
 */
export async function fetchProducts() {
  await simulateNetworkDelay(800);
  const response = await fetch('/api/products');
  return response.json();

}

/**
 * @param {number} page 
 * @param {number} limit 
 * @returns {Promise<Object>} 
 */
export async function fetchProductsPaginated(page = 1, limit = 12) {
  const allProducts = await fetchProducts();
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  const validPage = Math.max(1, Math.min(page, totalPages));
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
 * @param {Array} products 
 * @param {string} sortBy 
 * @param {string} order 
 * @returns {Array} 
 */
export function sortProducts(products, sortBy = 'price', order = 'desc') {
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

  const sortFn = sortFunctions[sortBy] || sortFunctions.price;
  return sortedProducts.sort(sortFn);
}

/**
 * @param {Array} products 
 * @param {Object} filters 
 * @param {string} filters.searchTerm 
 * @param {number} filters.minPrice 
 * @param {number} filters.maxPrice 
 * @param {boolean} filters.onlyAvailable 
 * @returns {Array} 
 */
export function filterProducts(products, filters = {}) {
  const { searchTerm = '', minPrice, maxPrice, onlyAvailable = false } = filters;

  const minVal =
    minPrice === '' || minPrice === null || isNaN(Number(minPrice))
      ? 0
      : Number(minPrice);
  const maxVal =
    maxPrice === '' || maxPrice === null || isNaN(Number(maxPrice))
      ? Infinity
      : Number(maxPrice);

  return products.filter((product) => {
    if (searchTerm && searchTerm.toString().trim() && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    const price = parseFloat(product.price) || 0;
    if (price < minVal || price > maxVal) {
      return false;
    }
    if (onlyAvailable && !product.availability) {
      return false;
    }

    return true;
  });
}

/**
 * @param {Object} options 
 * @param {number} options.page 
 * @param {number} options.limit 
 * @param {string} options.sortBy 
 * @param {string} options.sortOrder 
 * @param {Object} options.filters 
 * @returns {Promise<Object>}
 */
export async function getProcessedProducts(options = {}) {
  const {
    page = 1,
    limit = 9,
    sortBy = 'price',
    sortOrder = 'desc',
    filters = {},
  } = options;

  try {
    let products = await fetchProducts();

    products = filterProducts(products, filters);

    if (sortBy) {
      products = sortProducts(products, sortBy, sortOrder);
    }

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const validPage = Math.max(1, Math.min(page, totalPages));

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
