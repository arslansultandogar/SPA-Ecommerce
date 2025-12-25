'use client';

/**
 * PaginationControls Component
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && typeof page === 'number') {
      onPageChange(page);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-6 mt-8 animate-in fade-in">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {/* Previous Button */}
        <button
          className={`px-2 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5'
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                page === '...'
                  ? 'text-gray-600 cursor-default'
                  : page === currentPage
                  ? 'bg-red-600 text-white border-2 border-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-transparent'
              }`}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
              aria-label={
                typeof page === 'number' ? `Go to page ${page}` : undefined
              }
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`px-2 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5'
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center text-sm text-gray-700">
        Page <strong className="text-red-600">{currentPage}</strong> of <strong className="text-red-600">{totalPages}</strong>
      </div>
    </div>
  );
}
