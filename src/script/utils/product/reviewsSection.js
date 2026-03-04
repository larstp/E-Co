/**
 * Creates the reviews section with sorting functionality
 * @param {Object} product - The product object containing reviews
 * @returns {HTMLElement} The reviews page element
 */
export function createReviewsSection(product) {
  const reviewsPage = document.createElement("div");
  reviewsPage.className = "product-tab-page";
  reviewsPage.style.display = "none";

  const reviewsHeader = document.createElement("div");
  reviewsHeader.className = "reviews-header-row";
  const reviewsH3 = document.createElement("h3");
  reviewsH3.textContent = "Reviews";
  const reviewsCount = document.createElement("p");
  reviewsCount.textContent = `(${
    Array.isArray(product.reviews) ? product.reviews.length : 0
  })`;

  const sortBtnWrapper = document.createElement("div");
  sortBtnWrapper.style.position = "relative";
  sortBtnWrapper.style.display = "inline-block";
  const sortBtn = document.createElement("button");
  sortBtn.className = "product-sort-btn";
  sortBtn.type = "button";
  const sortIcon = document.createElement("img");
  sortIcon.src = "../../public/assets/icons/icons-svg/black/sort.svg";
  sortIcon.alt = "Sort";
  sortIcon.style.width = "24px";
  sortIcon.style.height = "24px";
  sortIcon.style.verticalAlign = "middle";
  sortBtn.appendChild(sortIcon);
  const sortDropdown = document.createElement("select");
  sortDropdown.className = "product-sort-dropdown";
  sortDropdown.style.position = "absolute";
  sortDropdown.style.top = "110%";
  sortDropdown.style.left = "0";
  sortDropdown.style.zIndex = "10";
  sortDropdown.style.display = "none";
  sortDropdown.style.minWidth = "100px";
  ["Best", "Worst"].forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt.toLowerCase();
    o.textContent = opt;
    sortDropdown.appendChild(o);
  });
  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sortDropdown.style.display =
      sortDropdown.style.display === "none" ? "block" : "none";
  });
  document.addEventListener("click", (e) => {
    if (!sortBtnWrapper.contains(e.target)) {
      sortDropdown.style.display = "none";
    }
  });
  sortBtnWrapper.appendChild(sortBtn);
  sortBtnWrapper.appendChild(sortDropdown);

  const writeReviewBtn = document.createElement("button");
  writeReviewBtn.className = "btn-small";
  writeReviewBtn.type = "button";
  writeReviewBtn.textContent = "Write a Review";
  reviewsHeader.append(reviewsH3, reviewsCount, sortBtnWrapper, writeReviewBtn);
  reviewsHeader.style.display = "flex";
  reviewsHeader.style.alignItems = "center";
  reviewsHeader.style.gap = "0.7rem";
  reviewsPage.appendChild(reviewsHeader);

  const reviewsList = document.createElement("div");
  reviewsList.className = "product-reviews-list";

  let reviewsArr = Array.isArray(product.reviews) ? [...product.reviews] : [];
  function renderReviews(sort = "best") {
    while (reviewsList.firstChild) {
      reviewsList.removeChild(reviewsList.firstChild);
    }
    let sorted = [...reviewsArr];
    if (sort === "best") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }
    sorted.forEach((rev) => {
      const box = document.createElement("div");
      box.className = "product-review-box";

      const stars = document.createElement("div");
      stars.className = "product-review-stars";
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = i <= (rev.rating || 0) ? "★" : "☆";
        stars.appendChild(star);
      }

      const name = document.createElement("div");
      name.className = "product-review-name";
      name.textContent = rev.username || rev.name || "Anonymous";
      name.style.fontWeight = "bold";

      const text = document.createElement("div");
      text.className = "product-review-text";
      text.textContent = rev.description || rev.text || "";

      const date = document.createElement("div");
      date.className = "product-review-date";
      date.textContent = rev.date || "";

      box.appendChild(stars);
      box.appendChild(name);
      box.appendChild(text);
      box.appendChild(document.createElement("br"));
      box.appendChild(date);
      reviewsList.appendChild(box);
    });
  }
  renderReviews();
  sortDropdown.addEventListener("change", (e) => {
    renderReviews(e.target.value);
    sortDropdown.style.display = "none";
  });
  reviewsPage.appendChild(reviewsList);

  return reviewsPage;
}
