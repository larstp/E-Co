import { fetchAllProducts } from "./api/api.js";
import { shareUrl } from "./utils/share.js";

function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.class) el.className = options.class;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, v);
    }
  }
  return el;
}

function createProductCard(product, size = "bestseller") {
  // Use the same structure and classes as storefront.js
  const link = document.createElement("a");
  link.className = "product-link product-card-base product-card-small";
  link.href = `product-specific.html?id=${product.id}`;

  // Product image
  const img = document.createElement("img");
  img.className = "product-img";
  img.src =
    product.image?.url ||
    product.imageUrl ||
    product.image ||
    "../public/assets/img/placeholder.jpg";
  img.alt = product.image?.alt || product.title;
  link.appendChild(img);

  // Product title
  const title = document.createElement("h2");
  title.className = "product-title";
  title.textContent = product.title;
  link.appendChild(title);

  // Product tags
  if (product.tags && Array.isArray(product.tags) && product.tags.length > 0) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags";
    tagsDiv.textContent = product.tags
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .join(", ");
    link.appendChild(tagsDiv);
  }

  // Spacer
  const spacer = document.createElement("div");
  spacer.className = "product-card-spacer";
  link.appendChild(spacer);

  // Rating
  let ratingValue = product.rating;
  if (product.reviews && product.reviews.length > 0) {
    ratingValue =
      product.reviews.reduce((a, r) => a + (r.rating || 0), 0) /
      product.reviews.length;
  }
  const ratingDiv = document.createElement("div");
  ratingDiv.className = "product-rating";
  if (ratingValue) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    const ratingNum = document.createElement("span");
    ratingNum.className = "rating-number";
    ratingNum.textContent = ratingValue.toFixed(1);
    ratingDiv.appendChild(star);
    ratingDiv.appendChild(ratingNum);
  } else {
    ratingDiv.innerHTML =
      '<span class="star">★</span><span class="rating-number">-</span>';
  }
  link.appendChild(ratingDiv);

  // Review count
  const reviewCount = product.reviews?.length || 0;
  const reviewDiv = document.createElement("div");
  reviewDiv.className = "review-count";
  reviewDiv.textContent = `${reviewCount} review${
    reviewCount === 1 ? "" : "s"
  }`;
  link.appendChild(reviewDiv);

  // Prices
  const priceSpan = document.createElement("span");
  priceSpan.className = "product-price";
  if (product.discountedPrice && product.discountedPrice < product.price) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = `${product.price.toFixed(2)},-`;
    priceSpan.appendChild(oldPrice);
    priceSpan.appendChild(document.createTextNode(" "));
    const discounted = document.createElement("span");
    discounted.className = "discounted-price";
    discounted.textContent = `${product.discountedPrice.toFixed(2)},-`;
    priceSpan.appendChild(discounted);
  } else {
    priceSpan.textContent = `${product.price.toFixed(2)},-`;
  }
  const pricesDiv = document.createElement("div");
  pricesDiv.className = "product-prices";
  pricesDiv.appendChild(priceSpan);
  link.appendChild(pricesDiv);

  // Add to cart button
  const btn = document.createElement("button");
  btn.className = "add-to-cart-btn btn-xsmall";
  btn.type = "button";
  btn.textContent = "Add to cart";
  link.appendChild(btn);

  return link;
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Summer Ad
  const summerAd = createEl("section", {
    class: "landing-summer-ad",
    attrs: {
      style: "background-image: url('../public/assets/img/summer-sale.jpg')",
    },
  });
  const summerAdContent = createEl("div", { class: "summer-ad-content" });
  const summerAdText = createEl("div", { class: "summer-ad-text" });
  summerAdText.appendChild(
    createEl("h1", {
      text: "SUMMER SALE!",
    })
  );
  summerAdText.appendChild(
    createEl("summer-ad-text", {
      text: 'Get up to 80% off with the code "ecosummer"',
    })
  );
  const summerAdBtn = createEl("button", {
    class: "btn-small",
    text: "Shop Now",
  });
  summerAdContent.append(summerAdText, summerAdBtn);
  summerAd.appendChild(summerAdContent);
  body.appendChild(summerAd);

  // Info Section
  const infoSection = createEl("section", { class: "landing-info-section" });
  const infoList = createEl("ul", { class: "info-list" });
  [
    {
      main: "SAME-DAY DISPATCH",
      detail: "before 8pm (mon/fri)",
    },
    {
      main: "FREE SHIPPING",
      detail: "on orders over 1000,-",
    },
    {
      main: "CARBON OFFSET",
      detail: "on every shipment",
    },
  ].forEach((item) => {
    const li = document.createElement("li");
    const mainSpan = document.createElement("span");
    mainSpan.className = "info-main";
    mainSpan.textContent = item.main + " ";
    const detailSpan = document.createElement("span");
    detailSpan.className = "info-detail";
    detailSpan.textContent = item.detail;
    li.appendChild(mainSpan);
    li.appendChild(detailSpan);
    infoList.appendChild(li);
  });
  infoSection.appendChild(infoList);

  // Carousel Section (New Arrivals) as pop-out inside info section
  const carouselSection = createEl("section", {
    class: "landing-carousel-section carousel-popout",
  });
  carouselSection.appendChild(
    createEl("h2", { class: "carousel-heading", text: "New Arrivals" })
  );
  const carouselContainer = createEl("div", { class: "carousel-container" });
  const carouselTrack = createEl("div", { class: "carousel-track" });
  carouselContainer.appendChild(carouselTrack);
  carouselSection.appendChild(carouselContainer);

  const carouselControls = createEl("div", { class: "carousel-controls" });
  // Left arrow
  const leftArrow = createEl("button", {
    class: "carousel-arrow left",
    attrs: { "aria-label": "Previous" },
  });
  leftArrow.innerHTML = `<img src="../public/assets/icons/icons-svg/black/left.svg" alt="Previous" style="width:32px;height:32px;">`;
  carouselControls.appendChild(leftArrow);
  // Dots
  const carouselIndicators = createEl("div", { class: "carousel-indicators" });
  carouselControls.appendChild(carouselIndicators);
  // Right arrow
  const rightArrow = createEl("button", {
    class: "carousel-arrow right",
    attrs: { "aria-label": "Next" },
  });
  rightArrow.innerHTML = `<img src="../public/assets/icons/icons-svg/black/right.svg" alt="Next" style="width:32px;height:32px;">`;
  carouselControls.appendChild(rightArrow);
  carouselSection.appendChild(carouselControls);
  carouselSection.appendChild(
    createEl("button", {
      class: "btn-large-white",
      text: "View All",
    })
  );
  infoSection.insertBefore(carouselSection, infoSection.firstChild);
  body.appendChild(infoSection);

  // Shop By Category
  const categoryHeader = createEl("h2", {
    class: "category-heading",
    text: "Shop by category",
  });
  body.appendChild(categoryHeader);

  const categorySection = createEl("section", {
    class: "landing-category-section",
  });
  const categoryList = createEl("div", { class: "category-list" });
  const categoryData = [
    {
      name: "Beauty",
      productId: "c0d245f1-58fa-4b15-aa0c-a704772a122b",
      category: "beauty",
    },
    {
      name: "Electronics",
      productId: "159fdd2f-2b12-46de-9654-d9139525ba87",
      category: "electronics",
    },
    {
      name: "Fashion",
      productId: "5391e16f-d88b-4747-a989-f17fb178459d",
      category: "fashion",
    },
  ];
  fetchAllProducts().then((products) => {
    categoryData.forEach((cat) => {
      const card = document.createElement("a");
      card.className = "category-card";
      card.href = `../src/pages/storefront.html?tag=${encodeURIComponent(
        cat.category
      )}`;
      card.setAttribute("role", "button");
      card.style.display = "flex";
      card.style.alignItems = "center";
      card.style.justifyContent = "space-between";
      card.style.textDecoration = "none";
      card.style.color = "inherit";
      const btn = createEl("span", { class: "btn-small", text: cat.name });
      card.appendChild(btn);
      const img = document.createElement("img");
      const product = products.find((p) => p.id === cat.productId);
      if (
        product &&
        product.image &&
        (product.image.url || product.imageUrl || product.image)
      ) {
        img.src = product.image.url || product.imageUrl || product.image;
        img.alt = product.image.alt || cat.name;
      } else {
        img.src = "../public/assets/img/placeholder.jpg";
        img.alt = cat.name;
      }
      img.style.marginLeft = "auto";
      img.style.objectFit = "cover";
      card.appendChild(img);
      categoryList.appendChild(card);
    });
  });
  categorySection.appendChild(categoryList);
  body.appendChild(categorySection);

  // Bestseller Section
  const bestsellersHeading = createEl("h2", {
    class: "bestseller-heading",
    text: "Bestsellers",
  });
  body.appendChild(bestsellersHeading);

  const bestsellerSection = createEl("section", {
    class: "landing-bestseller-section",
  });
  bestsellerSection.appendChild(createEl("div", { class: "bestseller-grid" }));
  const bestsellerFooter = createEl("div", { class: "bestseller-footer" });
  const bestSellerHeading = document.createElement("h3");
  bestSellerHeading.textContent = "And many more!";
  bestsellerFooter.appendChild(bestSellerHeading);
  const bestSellerText = document.createElement("p");
  bestSellerText.textContent = "Check out our best seller section";
  bestsellerFooter.appendChild(bestSellerText);
  const viewAllBtn = document.createElement("button");
  viewAllBtn.className = "btn-large-white";
  viewAllBtn.textContent = "View All";
  viewAllBtn.type = "button";
  viewAllBtn.addEventListener("click", () => {
    window.location.href = "../src/pages/storefront.html";
  });
  bestsellerFooter.appendChild(viewAllBtn);
  bestsellerSection.appendChild(bestsellerFooter);
  body.appendChild(bestsellerSection);

  // Newsletter Section
  const newsletterSection = createEl("section", {
    class: "landing-newsletter-section",
    attrs: {
      style: "background-image: url('../public/assets/img/newsletter.jpg')",
    },
  });
  const newsletterContent = createEl("div", { class: "newsletter-content" });
  newsletterContent.appendChild(
    createEl("h2", { class: "newsletter-heading", text: "Into fashion?" })
  );
  newsletterContent.appendChild(
    createEl("h4", { text: "Subscribe to our newsletter" })
  );
  const newsletterText = createEl("p", {
    text: "and stay updated on all our latest deals and offers",
  });
  newsletterContent.appendChild(newsletterText);

  const newsletterForm = document.createElement("form");
  newsletterForm.className = "newsletter-form";
  newsletterForm.onsubmit = (e) => {
    e.preventDefault();
  };
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Enter your email";
  emailInput.required = true;
  newsletterForm.appendChild(emailInput);
  const subscribeBtn = document.createElement("button");
  subscribeBtn.type = "submit";
  subscribeBtn.className = "btn-small";
  subscribeBtn.textContent = "Subscribe";
  newsletterForm.appendChild(subscribeBtn);
  newsletterContent.appendChild(newsletterForm);
  newsletterSection.appendChild(newsletterContent);
  body.appendChild(newsletterSection);

  import("./utils/footer.js").then((mod) => {
    const footer = mod.buildFooter();
    document.body.appendChild(footer);
  });

  fetchAllProducts()
    .then((products) => {
      const newArrivals = products.filter(
        (p) => !p.reviews || p.reviews.length === 0
      );
      const carouselTrack = document.querySelector(".carousel-track");
      newArrivals.slice(0, 9).forEach((product) => {
        carouselTrack.appendChild(createProductCard(product, "carousel"));
      });

      const indicators = document.querySelector(".carousel-indicators");
      indicators.innerHTML = "";
      const groupCount = 3;
      for (let i = 0; i < groupCount; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          carouselTrack.scrollTo({
            left: i * carouselTrack.offsetWidth,
            behavior: "smooth",
          });
          setActiveDot(i);
        });
        indicators.appendChild(dot);
      }

      carouselTrack.style.scrollbarWidth = "none";
      carouselTrack.style.msOverflowStyle = "none";
      carouselTrack.style.overflowX = "auto";
      carouselTrack.style.overflowY = "hidden";
      carouselTrack.style.whiteSpace = "nowrap";
      carouselTrack.style.scrollBehavior = "smooth";
      carouselTrack.style.display = "flex";
      carouselTrack.style.gap = "1rem";
      carouselTrack.style.border = "none";
      carouselTrack.style.background = "none";
      carouselTrack.style.position = "relative";
      carouselTrack.style.scrollSnapType = "x mandatory";
      carouselTrack.style.WebkitOverflowScrolling = "touch";
      carouselTrack.style.overflow = "-webkit-paged-x";
      carouselTrack.style.setProperty("scrollbar-width", "none");
      carouselTrack.style.setProperty("-ms-overflow-style", "none");
      carouselTrack.style.setProperty("-webkit-overflow-scrolling", "touch");
      carouselTrack.style.setProperty("overflow", "-webkit-paged-x");
      Array.from(carouselTrack.children).forEach((card) => {
        card.style.scrollSnapAlign = "start";
      });

      let currentGroup = 0;
      function setActiveDot(idx) {
        Array.from(indicators.children).forEach((dot, i) => {
          dot.classList.toggle("active", i === idx);
        });
        currentGroup = idx;
      }
      document.querySelector(".carousel-arrow.left").onclick = () => {
        if (currentGroup > 0) {
          currentGroup--;
          carouselTrack.scrollTo({
            left: currentGroup * carouselTrack.offsetWidth,
            behavior: "smooth",
          });
          setActiveDot(currentGroup);
        }
      };
      document.querySelector(".carousel-arrow.right").onclick = () => {
        if (currentGroup < groupCount - 1) {
          currentGroup++;
          carouselTrack.scrollTo({
            left: currentGroup * carouselTrack.offsetWidth,
            behavior: "smooth",
          });
          setActiveDot(currentGroup);
        }
      };

      // Bestsellers
      const bestsellers = products
        .filter((p) => p.reviews && p.reviews.length > 0)
        .map((p) => ({
          ...p,
          avgRating:
            p.reviews.reduce((a, r) => a + (r.rating || 0), 0) /
            p.reviews.length,
        }))
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 6);
      const bestsellerGrid = document.querySelector(".bestseller-grid");
      bestsellers.forEach((product) => {
        bestsellerGrid.appendChild(createProductCard(product, "bestseller"));
      });
    })
    .catch((err) => {
      //I have no idea if this is how youre supposed to show error messages. Clicking inspect on random websites seems to confirm it but there were several different ways of doing it
      const carouselTrack = document.querySelector(".carousel-track");
      if (carouselTrack) carouselTrack.textContent = "Failed to load products.";
      const bestsellerGrid = document.querySelector(".bestseller-grid");
      if (bestsellerGrid)
        bestsellerGrid.textContent = "Failed to load products.";
    });
});
