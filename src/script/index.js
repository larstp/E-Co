import { fetchAllProducts } from "./api/api.js";
import { shareUrl } from "./utils/share.js";
import { addToCart } from "./utils/cart.js";
import { buildFooter } from "./utils/footer.js";

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
  link.className = "product-link product-card-base";
  if (size === "huge") {
    link.classList.add("product-card-huge");
  } else {
    link.classList.add("product-card-small");
  }
  link.href = `./src/pages/product.html?id=${product.id}`;

  const detailsContainer = document.createElement("div");
  if (size === "huge") {
    detailsContainer.className = "product-details-container";
  }

  const img = document.createElement("img");
  img.className = "product-img";
  img.src =
    product.image?.url ||
    product.imageUrl ||
    product.image ||
    "../public/assets/img/placeholder.jpg";
  img.alt = product.image?.alt || product.title;
  link.appendChild(img);

  const titleRow = createEl("div", { class: "product-title-row" });
  const title = document.createElement("h2");
  title.className = "product-title";
  title.textContent = product.title;
  titleRow.appendChild(title);

  const iconsDiv = createEl("div", { class: "product-icon-row" });
  const shareIcon = createEl("img", {
    class: "product-share-icon",
    attrs: {
      src: "./public/assets/icons/icons-svg/black/share.svg",
      alt: "Share product",
    },
  });
  shareIcon.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = link.href;
    const productTitle = product.title || "Product";
    const result = await shareUrl(url, productTitle, "Check out this product!");
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
  if (size === "huge") {
    titleRow.appendChild(iconsDiv);
  }
  detailsContainer.appendChild(titleRow);

  if (product.tags && Array.isArray(product.tags) && product.tags.length > 0) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags";
    tagsDiv.textContent = product.tags
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .join(", ");
    detailsContainer.appendChild(tagsDiv);
  }

  if (size !== "huge") {
    const spacer = document.createElement("div");
    spacer.className = "product-card-spacer";
    detailsContainer.appendChild(spacer);
  }

  if (size === "huge") {
    if (product.description) {
      const description = createEl("p", {
        class: "product-description",
        text: product.description,
      });
      detailsContainer.appendChild(description);
    }
  } else {
    const ratingAndIconsRow = createEl("div", {
      class: "product-card-rating-row",
    });

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

    // Icons container for wishlist and share
    const iconsContainer = createEl("div", {
      class: "product-card-icons-container",
    });

    import("./utils/wishlist.js").then(
      ({ addToWishlist, removeFromWishlist, isWishlisted }) => {
        // Only insert one wishlist icon per card
        const wishlistIcon = createEl("img", {
          class: "product-card-wishlist-icon",
          attrs: {
            alt: "Add to wishlist",
            tabIndex: 0,
            style: "width:24px;height:24px;cursor:pointer;",
          },
        });
        function updateWishlistIcon() {
          wishlistIcon.src = isWishlisted(product.id)
            ? "./public/assets/icons/icons-svg/black/filled-heart.svg"
            : "./public/assets/icons/icons-svg/black/line-heart.svg";
        }
        updateWishlistIcon();
        wishlistIcon.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isWishlisted(product.id)) {
            removeFromWishlist(product.id);
          } else {
            addToWishlist(product);
          }
          updateWishlistIcon();
        });
        // Insert wishlist icon before share icon in iconsDiv
        iconsDiv.insertBefore(wishlistIcon, iconsDiv.firstChild);
      }
    );

    iconsContainer.appendChild(iconsDiv);
    ratingAndIconsRow.appendChild(iconsContainer);

    detailsContainer.appendChild(ratingAndIconsRow);
  }

  const priceSpan = document.createElement("span");
  priceSpan.className = "product-price";
  if (product.discountedPrice && product.discountedPrice < product.price) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = `${product.price.toFixed(0)},-`;
    priceSpan.appendChild(oldPrice);
    priceSpan.appendChild(document.createTextNode(" "));
    const discounted = document.createElement("span");
    discounted.className = "discounted-price";
    discounted.textContent = `${product.discountedPrice.toFixed(0)},-`;
    priceSpan.appendChild(discounted);
  } else {
    priceSpan.textContent = `${product.price.toFixed(0)},-`;
  }
  const pricesDiv = document.createElement("div");
  pricesDiv.className = "product-prices";
  pricesDiv.appendChild(priceSpan);
  detailsContainer.appendChild(pricesDiv);

  if (size !== "huge") {
    const btn = document.createElement("button");
    btn.className = "add-to-cart-btn btn-xsmall";
    btn.type = "button";
    btn.textContent = "Add to cart";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product);
      btn.textContent = "Added!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to cart";
        btn.disabled = false;
      }, 1000);
    });
    detailsContainer.appendChild(btn);
  }

  if (size === "huge") {
    link.appendChild(detailsContainer);
  } else {
    while (detailsContainer.firstChild) {
      link.appendChild(detailsContainer.firstChild);
    }
  }

  return link;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Summer Ad
  const summerAd = createEl("section", {
    class: "landing-summer-ad",
    attrs: {
      style: "background-image: url('./public/assets/img/summer-sale.webp')",
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
    () => (window.location.href = "./src/pages/storefront.html?sale")
  );
  summerAdContent.append(summerAdText, summerAdBtn);
  summerAd.appendChild(summerAdContent);
  main.appendChild(summerAd);

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
  main.appendChild(infoSection);

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
        src: "./public/assets/icons/icons-svg/black/left.svg",
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
      () => (window.location.href = "./src/pages/storefront.html?new")
    );

    const mediaQuery = window.matchMedia("(min-width: 900px)");
    function handleBtnClass(mq) {
      if (mq.matches) {
        viewAllBtn.className = "btn-large";
      } else {
        viewAllBtn.className = "btn-small";
      }
    }
    mediaQuery.addEventListener("change", handleBtnClass);
    handleBtnClass(mediaQuery);

    const rightArrow = createEl("button", {
      class: "carousel-arrow right",
      attrs: { "aria-label": "Next" },
    });
    const rightArrowImg = createEl("img", {
      attrs: {
        src: "./public/assets/icons/icons-svg/black/right.svg",
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
      const newArrivals = allProducts
        .filter((p) => !p.reviews || p.reviews.length === 0)
        .slice(0, 3);

      if (newArrivals.length === 0) {
        track.textContent = "No new arrivals to show.";
        return section;
      }

      let currentIndex = 0;

      function renderCarousel(isInitial = false) {
        const transitionDuration = isInitial ? 0 : 300;

        track.style.opacity = 0;

        setTimeout(() => {
          while (track.firstChild) {
            track.removeChild(track.firstChild);
          }

          const product = newArrivals[currentIndex];
          const card = createProductCard(product, "huge");
          track.appendChild(card);
          track.style.justifyContent = "center";

          track.style.opacity = 1;
        }, transitionDuration);
      }

      leftArrow.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + newArrivals.length) % newArrivals.length;
        renderCarousel();
      });

      rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % newArrivals.length;
        renderCarousel();
      });

      renderCarousel(true);
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
  main.appendChild(categoryHeader);

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
      card.href = `./src/pages/storefront.html?tag=${encodeURIComponent(
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
        img.src = "./public/assets/img/placeholder.jpg";
        img.alt = cat.name;
      }
      img.style.marginLeft = "auto";
      img.style.objectFit = "cover";
      card.appendChild(img);
      categoryList.appendChild(card);
    });
  });
  categorySection.appendChild(categoryList);
  main.appendChild(categorySection);

  // Cleaning Ad Section
  const cleaningAdSection = createEl("section", { class: "cleaning-ad" });
  const cleaningAdLeft = createEl("div", { class: "cleaning-ad-left" });
  const cleaningAdImg = createEl("img", {
    attrs: {
      src: "./public/assets/img/clean-living.webp",
      alt: "Clean living products",
    },
  });
  cleaningAdLeft.appendChild(cleaningAdImg);

  const cleaningAdRight = createEl("div", { class: "cleaning-ad-right" });
  const cleaningAdHeading = createEl("h2");
  cleaningAdHeading.textContent = "CLEAN LIVING ";
  const saleSpan = createEl("span", { class: "sale-text", text: "SALE" });
  cleaningAdHeading.appendChild(saleSpan);

  const p1 = createEl("p", {
    text: "Stock up and save on a cleaner home with Clean Living's sale section.",
  });
  const p2 = createEl("p", {
    text: "Refresh your home with this bio-enzymatic odor and spot remover. Made with non-toxic, plant-based ingredients, it's safe for your family and pets. Tackle even the toughest messes without harsh chemicals. \n\nShop our sale section today and discover the power of a truly clean home.",
  });
  const cleaningAdBtn = createEl("button", {
    class: "btn-large-white",
    text: "Shop Sale",
  });
  cleaningAdBtn.addEventListener(
    "click",
    () => (window.location.href = "./src/pages/storefront.html?tag=beauty")
  );

  cleaningAdRight.append(cleaningAdHeading, p1, p2, cleaningAdBtn);
  cleaningAdSection.append(cleaningAdLeft, cleaningAdRight);
  main.appendChild(cleaningAdSection);

  // Bestseller Section
  const bestsellersHeading = createEl("h2", {
    class: "bestseller-heading",
    text: "Bestsellers",
  });
  main.appendChild(bestsellersHeading);

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
    window.location.href = "./src/pages/storefront.html";
  });
  bestsellerFooter.appendChild(viewAllBtn);
  bestsellerSection.appendChild(bestsellerFooter);
  main.appendChild(bestsellerSection);

  // Newsletter Section
  const newsletterSection = createEl("section", {
    class: "landing-newsletter-section",
    attrs: {
      style: "background-image: url('./public/assets/img/newsletter.webp')",
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
  main.appendChild(newsletterSection);

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
      const bestsellerGrid = document.querySelector(".bestseller-grid");
      if (bestsellerGrid)
        bestsellerGrid.textContent = "Failed to load products.";
    });
});

const siteFooter = document.getElementById("site-footer");
if (siteFooter) {
  const footer = buildFooter();
  footer.id = "site-footer";
  siteFooter.replaceWith(footer);
}
