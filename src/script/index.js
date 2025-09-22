import { fetchAllProducts } from "./api/api.js";
import { shareUrl } from "./utils/share.js";

function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.class) el.className = options.class;
  if (options.text) el.textContent = options.text;
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, v);
    }
  }
  return el;
}

function createProductCard(product, size = "bestseller") {
  const link = document.createElement("a");
  link.className = "product-link product-card-base product-card-small";
  link.href = `src/pages/product.html?id=${product.id}`;

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

  // Rating and share Row
  const ratingAndIconsRow = createEl("div", {
    class: "product-card-rating-row",
  });

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
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    const ratingNum = document.createElement("span");
    ratingNum.className = "rating-number";
    ratingNum.textContent = "-";
    ratingDiv.appendChild(star);
    ratingDiv.appendChild(ratingNum);
  }
  ratingAndIconsRow.appendChild(ratingDiv);

  // Share Icon
  const iconsDiv = createEl("div", { class: "product-card-icon-row" });
  const shareIcon = createEl("img", {
    class: "product-share-icon",
    attrs: {
      src: "/public/assets/icons/icons-svg/black/share.svg",
      alt: "Share product",
    },
  });
  shareIcon.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = link.href;
    const title = product.title || "Product";
    const result = await shareUrl(url, title, "Check out this product!");
    if (result === "copied") {
      shareIcon.title = "Link copied!";
      setTimeout(() => (shareIcon.title = "Share product"), 1500);
    } else if (result === "shared") {
      shareIcon.title = "Shared!";
      setTimeout(() => (shareIcon.title = "Share product"), 1500);
    } else {
      shareIcon.title = "Could not share";
      setTimeout(() => (shareIcon.title = "Share product"), 1500);
    }
  });
  iconsDiv.appendChild(shareIcon);
  ratingAndIconsRow.appendChild(iconsDiv);

  link.appendChild(ratingAndIconsRow);

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
  summerAdBtn.addEventListener(
    "click",
    () => (window.location.href = "/src/pages/storefront.html?sale")
  );
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
  body.appendChild(infoSection);

  async function createNewArrivalsCarousel() {
    const section = createEl("section", {
      class: "landing-carousel-section carousel-popout",
    });
    section.appendChild(
      createEl("h2", { class: "carousel-heading", text: "New Arrivals" })
    );
    const carouselContainer = createEl("div", { class: "carousel-container" });
    const track = createEl("div", { class: "carousel-track no-scrollbar" });
    carouselContainer.appendChild(track);
    section.appendChild(carouselContainer);

    const controls = createEl("div", {
      class: "carousel-controls",
      attrs: {
        style:
          "display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1rem;",
      },
    });
    const leftArrow = createEl("button", {
      class: "carousel-arrow left",
      attrs: { "aria-label": "Previous" },
    });
    const leftArrowImg = createEl("img", {
      attrs: {
        src: "/public/assets/icons/icons-svg/black/left.svg",
        alt: "Previous",
      },
    });
    leftArrowImg.style.width = "32px";
    leftArrowImg.style.height = "32px";
    leftArrow.appendChild(leftArrowImg);

    const viewAllBtn = createEl("button", {
      text: "View All",
    });
    viewAllBtn.addEventListener(
      "click",
      () => (window.location.href = "/src/pages/storefront.html?new")
    );

    const mediaQuery = window.matchMedia("(min-width: 900px)"); // haha, cant believe this worked..
    function handleBtnClass(mq) {
      if (mq.matches) {
        viewAllBtn.className = "btn-large";
      } else {
        viewAllBtn.className = "btn-small";
      }
    }
    mediaQuery.addEventListener("change", handleBtnClass);
    handleBtnClass(mediaQuery); // Initial check

    const rightArrow = createEl("button", {
      class: "carousel-arrow right",
      attrs: { "aria-label": "Next" },
    });
    const rightArrowImg = createEl("img", {
      attrs: {
        src: "/public/assets/icons/icons-svg/black/right.svg",
        alt: "Next",
      },
    });
    rightArrowImg.style.width = "32px";
    rightArrowImg.style.height = "32px";
    rightArrow.appendChild(rightArrowImg);

    controls.appendChild(leftArrow);
    controls.appendChild(viewAllBtn);
    controls.appendChild(rightArrow);
    section.appendChild(controls);

    try {
      const allProducts = await fetchAllProducts();

      // Get products with no reviews
      const newArrivals = allProducts.filter(
        (p) => !p.reviews || p.reviews.length === 0
      );

      // Get other products, shuffle them, and take 5 (if it works)
      const otherProducts = allProducts.filter(
        (p) => p.reviews && p.reviews.length > 0
      );
      for (let i = otherProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherProducts[i], otherProducts[j]] = [
          otherProducts[j],
          otherProducts[i],
        ];
      }
      const randomProducts = otherProducts.slice(0, 5);

      // Combine the lists
      const products = [...newArrivals, ...randomProducts];

      function renderCarousel() {
        while (track.firstChild) {
          track.removeChild(track.firstChild);
        }
        products.forEach((prod) => {
          track.appendChild(createProductCard(prod, "carousel"));
        });
        // Add a blank card to prevent items from being cut off
        const blankCard = createEl("div", {
          class: "product-link product-card-base product-card-small",
        });
        blankCard.style.visibility = "hidden";
        track.appendChild(blankCard);
      }

      leftArrow.addEventListener("click", () => {
        const card = track.querySelector(".product-card-base");
        if (!card) return;
        const cardStyle = getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const cardMargin =
          parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
        const gap = parseFloat(getComputedStyle(track).gap);
        const scrollAmount = (cardWidth + cardMargin + gap) * 3;

        if (track.scrollLeft <= 0) {
          // If at the beginning, scroll to the end
          track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
        } else {
          track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      });

      rightArrow.addEventListener("click", () => {
        const card = track.querySelector(".product-card-base");
        if (!card) return;
        const cardStyle = getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const cardMargin =
          parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
        const gap = parseFloat(getComputedStyle(track).gap);
        const scrollAmount = (cardWidth + cardMargin + gap) * 3;

        if (
          track.scrollLeft + track.clientWidth >=
          track.scrollWidth - cardWidth
        ) {
          // If at the end, scroll to the beginning
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      });

      renderCarousel();
    } catch (err) {
      track.textContent = "Failed to load products.";
    }

    return section;
  }

  createNewArrivalsCarousel().then((carousel) => {
    const infoSection = document.querySelector(".landing-info-section");
    infoSection.insertBefore(carousel, infoSection.firstChild);
  });

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
      // Bestsellers
      const bestsellers = products
        .filter((p) => p.reviews && p.reviews.length > 0)
        .map((p) => ({
          ...p,
          avgRating:
            p.reviews.reduce((a, r) => a + (r.rating || 0), 0) /
            p.reviews.length,
        }))
        .filter((p) => p.avgRating >= 4)
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 12);
      const bestsellerGrid = document.querySelector(".bestseller-grid");
      bestsellers.forEach((product) => {
        bestsellerGrid.appendChild(createProductCard(product, "bestseller"));
      });
    })
    .catch((err) => {
      //I have no idea if this is how youre supposed to show error messages. Clicking inspect on random websites seems to confirm it but there were several different ways of doing it
      const bestsellerGrid = document.querySelector(".bestseller-grid");
      if (bestsellerGrid)
        bestsellerGrid.textContent = "Failed to load products.";
    });
});
