const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const fullStarPath =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
const halfStarPath =
  "M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z";
const emptyStarPath =
  "M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4zM22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z";

function createStarSvg(pathData) {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");

  const path = document.createElementNS(SVG_NAMESPACE, "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute("d", pathData);

  svg.appendChild(path);
  return svg;
}

export function createStarRating(rating, reviewsCount, maxRating = 5) {
  const wrapper = document.createElement("div");
  wrapper.className = "star-rating-wrapper";

  for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement("span");
    star.className = "star-icon";
    if (i <= rating) {
      // Full star
      star.appendChild(createStarSvg(fullStarPath));
    } else if (i - 0.5 <= rating) {
      // Half star
      star.appendChild(createStarSvg(halfStarPath));
    } else {
      // Empty star
      star.appendChild(createStarSvg(emptyStarPath));
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
