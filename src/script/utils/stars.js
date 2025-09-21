/**
 * Creates a star rating display element based on a given rating.
 * @param {number} rating - The numerical rating (e.g., 3.5).
 * @param {number} reviewsCount - The number of reviews.
 * @param {number} [maxRating=5] - The maximum possible rating.
 * @returns {HTMLElement} A div element containing the rendered stars.
 */
export function createStarRating(rating, reviewsCount, maxRating = 5) {
  const wrapper = document.createElement("div");
  wrapper.className = "star-rating-wrapper";

  for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement("span");
    star.className = "star-icon";
    if (i <= rating) {
      // Full star
      star.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    } else if (i - 0.5 <= rating) {
      // Half star
      star.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z"/></svg>`;
    } else {
      // Empty star
      star.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z"/></svg>`;
    }
    wrapper.appendChild(star);
  }

  const ratingNumSpan = document.createElement("span");
  ratingNumSpan.className = "rating-number";
  ratingNumSpan.textContent = rating ? rating.toFixed(1) : "-";
  wrapper.appendChild(ratingNumSpan);

  if (reviewsCount !== undefined) {
    const reviewsCountSpan = document.createElement("span");
    reviewsCountSpan.className = "reviews-count";
    reviewsCountSpan.textContent = `(${reviewsCount})`;
    wrapper.appendChild(reviewsCountSpan);
  }

  return wrapper;
}
