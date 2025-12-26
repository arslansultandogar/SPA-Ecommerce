"use client";

export default function Stars({ rating = 0, reviews = 0, id = "stars" }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
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
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-3 h-3 text-yellow-500"
          aria-hidden
        >
          <defs>
            <linearGradient id={`half-${id}`} x1="0%" x2="100%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z"
            fill={`url(#half-${id})`}
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

  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex items-center">{stars}</span>
      <span className="text-gray-700 text-xs">{rating}</span>
      <span className="text-gray-500 text-xs">({reviews})</span>
    </span>
  );
}
