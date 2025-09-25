import { fetchAllProducts } from "./api/api.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { shareUrl } from "./utils/share.js";
import { setupFilterMenu } from "./utils/menus.js";
import { addToCart } from "./utils/cart.js";

let allCategories = [];
let allTags = [];
let allProducts = [];
let productsShown = 0;
const PRODUCTS_PER_PAGE = 16;

// Man I needed help from copilot for this. I feel we have learned nothing regarding how to do this in JS.

function getOrCreateProductGrid() {
  let grid = document.getElementById("product-grid");
  if (!grid) {
    let container = document.getElementById("storefront-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "storefront-container";
      container.className = "storefront-container";
      const footer = document.querySelector("footer.site-footer");
      if (footer) {
        document.body.insertBefore(container, footer);
      } else {
        document.body.appendChild(container);
      }
    }
    const headerRow = document.createElement("div");
    headerRow.className = "storefront-header-row";
    const h1 = document.createElement("h1");
    h1.id = "storefront-title";
    h1.className = "storefront-title";
    h1.textContent = "Products";
    const sortBtn = document.createElement("button");
    sortBtn.className = "storefront-sort-btn";
    sortBtn.setAttribute("aria-label", "Sort products");
    const sortIcon = document.createElement("img");
    sortIcon.src = "/public/assets/icons/icons-svg/black/sort.svg";
    sortIcon.alt = "Sort";
    sortIcon.className = "storefront-sort-icon";
    sortBtn.appendChild(sortIcon);
    headerRow.appendChild(h1);
    headerRow.appendChild(sortBtn);
    container.appendChild(headerRow);

    container.setStorefrontTitle = function (title) {
      h1.textContent = title;
    };

    grid = document.createElement("section");
    grid.id = "product-grid";
    grid.className = "product-grid";
    container.appendChild(grid);

    setupFilterMenu({
      allProductsRef: {
        get value() {
          return allProducts;
        },
        set value(v) {
          allProducts = v;
        },
      },
      allCategoriesRef: {
        get value() {
          return allCategories;
        },
        set value(v) {
          allCategories = v;
        },
      },
      allTagsRef: {
        get value() {
          return allTags;
        },
        set value(v) {
          allTags = v;
        },
      },
      productsShownRef: {
        get value() {
          return productsShown;
        },
        set value(v) {
          productsShown = v;
        },
      },
      PRODUCTS_PER_PAGE,
      renderProductsPage,
      setStorefrontTitle: (title) => {
        const container = document.getElementById("storefront-container");
        if (container && container.setStorefrontTitle) {
          container.setStorefrontTitle(title);
        }
      },
    });
  }
  return document.getElementById("product-grid");
}

function createEl(tag, { className, attrs = {}, text, children = [] } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (text !== undefined) el.textContent = text;
  children.forEach((child) => el.appendChild(child));
  return el;
}

function createProductCard(product) {
  const link = createEl("a", {
    className: "product-link product-card-base product-card-small",
    attrs: {
      href: `product.html?id=${product.id}`,
      style: "display:flex;flex-direction:column;align-items:flex-start;",
    },
  });

  // Product image
  const img = createEl("img", {
    className: "product-img",
    attrs: {
      src: product.image?.url || "",
      alt: product.image?.alt || product.title,
    },
  });

  // Product title
  const title = createEl("h2", {
    className: "product-title",
    text: product.title,
  });

  const tagsDiv = createEl("div", {
    className: "product-tags",
    text:
      product.tags && product.tags.length > 0
        ? product.tags
            .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
            .join(", ")
        : "",
  });

  // Spacer
  const spacer = createEl("div", {
    className: "product-card-spacer",
    attrs: { style: "flex:1 1 auto;width:100%" },
  });

  // Rating and Icons Row
  const ratingRow = createEl("div", {
    className: "product-card-rating-row",
  });

  const ratingValue = product.rating ? product.rating.toFixed(1) : "-";
  const ratingDiv = createEl("div", {
    className: "product-rating",
    children: [
      createEl("span", { className: "star", text: "★" }),
      createEl("span", { className: "rating-number", text: ratingValue }),
    ],
  });
  ratingRow.appendChild(ratingDiv);

  const iconRow = createEl("div", {
    className: "product-card-icon-row-storefront",
  });

  // Wishlist icon
  import("./utils/wishlist.js").then(
    ({ addToWishlist, removeFromWishlist, isWishlisted }) => {
      const wishlistIcon = createEl("img", {
        className: "product-card-wishlist-icon",
        attrs: {
          alt: "Add to wishlist",
          tabIndex: 0,
          style: "width:24px;height:24px;cursor:pointer;",
        },
      });
      function updateWishlistIcon() {
        wishlistIcon.src = isWishlisted(product.id)
          ? "../../public/assets/icons/icons-svg/black/filled-heart.svg"
          : "../../public/assets/icons/icons-svg/black/line-heart.svg";
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
      iconRow.appendChild(wishlistIcon);
    }
  );

  // Share icon
  const shareIcon = createEl("img", {
    className: "product-share-icon",
    attrs: {
      src: "../../public/assets/icons/icons-svg/black/share.svg",
      alt: "Share product",
      tabIndex: 0,
      style: "width:24px;height:24px;cursor:pointer;",
    },
  });
  shareIcon.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + "/product.html?id=" + product.id;
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
  iconRow.appendChild(shareIcon);
  ratingRow.appendChild(iconRow);

  // Review count
  const reviewCount = product.reviews?.length || 0;
  const reviewDiv = createEl("div", {
    className: "review-count",
    text: `${reviewCount} review${reviewCount === 1 ? "" : "s"}`,
  });

  // Prices
  const priceSpan = createEl("span", { className: "product-price" });
  if (product.discountedPrice < product.price) {
    priceSpan.appendChild(
      createEl("span", {
        className: "old-price",
        text: `${product.price.toFixed(2)},-`,
      })
    );
    priceSpan.appendChild(document.createTextNode(" "));
    priceSpan.appendChild(
      createEl("span", {
        className: "discounted-price",
        text: `${product.discountedPrice.toFixed(2)},-`,
      })
    );
  } else {
    priceSpan.textContent = `${product.price.toFixed(2)},-`;
  }
  const pricesDiv = createEl("div", {
    className: "product-prices",
    children: [priceSpan],
  });

  // Add to cart button
  const btn = createEl("button", {
    className: "add-to-cart-btn btn-xsmall",
    attrs: { type: "button" },
    text: "Add to cart",
  });
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

  [img, title, tagsDiv, ratingRow, reviewDiv, pricesDiv, btn].forEach((el) =>
    link.appendChild(el)
  );

  return link;
}

function renderProductsPage(products = null) {
  const grid = getOrCreateProductGrid();
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  const fragment = document.createDocumentFragment();
  const toShow = (products || allProducts).slice(0, productsShown);
  toShow.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });
  grid.appendChild(fragment);

  const oldCta = document.querySelector(".load-more-CTA");
  if (oldCta) oldCta.remove();

  if (productsShown < (products ? products.length : allProducts.length)) {
    const ctaDiv = createEl("div", { className: "load-more-CTA" });
    const loadMoreBtn = createEl("button", {
      className: "btn-large",
      attrs: { id: "load-more-products-btn", type: "button" },
      text: "Load more products",
    });
    loadMoreBtn.addEventListener("click", () => {
      productsShown = Math.min(
        productsShown + PRODUCTS_PER_PAGE,
        products ? products.length : allProducts.length
      );
      renderProductsPage(products);
    });
    ctaDiv.appendChild(loadMoreBtn);
    grid.parentNode.appendChild(ctaDiv);
  }
}

async function loadProducts() {
  try {
    showLoader();
    allProducts = await fetchAllProducts();
    allCategories = Array.from(
      new Set(allProducts.map((p) => p.category).filter(Boolean))
    );
    allTags = Array.from(
      new Set(
        allProducts
          .flatMap((p) => (Array.isArray(p.tags) ? p.tags : []))
          .filter(Boolean)
      )
    );
    productsShown = Math.min(PRODUCTS_PER_PAGE, allProducts.length);
    const params = new URLSearchParams(window.location.search);
    let initialTitle = "Products";
    if (params.has("sale")) {
      initialTitle = "SALE!";
      productsShown = allProducts.length;
      renderProductsPage(
        allProducts.filter((p) => p.discountedPrice < p.price)
      );
    } else if (params.has("new")) {
      initialTitle = "New Arrivals";
      productsShown = allProducts.length;
      renderProductsPage(
        allProducts.filter((p) => !p.rating || p.rating === 0)
      );
    } else if (params.has("popular")) {
      initialTitle = "Most Popular";
      productsShown = allProducts.length;
      renderProductsPage(
        [...allProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      );
    } else if (params.has("category")) {
      const cat = params.get("category");
      initialTitle = cat;
      productsShown = allProducts.length;
      renderProductsPage(
        allProducts.filter(
          (p) =>
            Array.isArray(p.tags) &&
            p.tags.map((t) => t.toLowerCase()).includes(cat.toLowerCase())
        )
      );
    } else if (params.has("tag")) {
      const tag = params.get("tag");
      initialTitle = tag.charAt(0).toUpperCase() + tag.slice(1);
      productsShown = allProducts.length;
      renderProductsPage(
        allProducts.filter(
          (p) =>
            Array.isArray(p.tags) &&
            p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        )
      );
    } else if (params.has("search")) {
      const search = params.get("search").toLowerCase();
      initialTitle = `Search: "${params.get("search")}"`;
      productsShown = allProducts.length;
      renderProductsPage(
        allProducts.filter((p) => {
          const nameMatch = p.title && p.title.toLowerCase().includes(search);
          const tagMatch =
            Array.isArray(p.tags) &&
            p.tags.some((t) => t.toLowerCase().includes(search));
          return nameMatch || tagMatch;
        })
      );
    } else {
      renderProductsPage();
    }
    const container = document.getElementById("storefront-container");
    if (container && container.setStorefrontTitle) {
      container.setStorefrontTitle(initialTitle);
    }
    const filterMenu = document.querySelector(".mobile-filter-menu");
    if (filterMenu && filterMenu.renderContent) {
      filterMenu.renderContent(allCategories, allTags);
    }
    hideLoader();
  } catch (err) {
    hideLoader();
    const grid = getOrCreateProductGrid();
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    const errorDiv = createEl("div", {
      className: "error",
      text: "Failed to load products. Please try again later.",
    });
    grid.appendChild(errorDiv);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);

import("./utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
