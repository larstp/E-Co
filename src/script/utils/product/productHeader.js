import { shareUrl } from "../share.js";
import { createStarRating } from "../stars.js";

/**
 * Creates the product header with price, wishlist/share icons, title, and rating
 * @param {Object} product - The product object
 * @param {boolean} includeTitle - Whether to include the title in the header
 * @returns {Object} Object containing the priceIconRow, title, and ratingDiv elements
 */
export async function createProductHeader(product, includeTitle = false) {
  const priceIconRow = document.createElement("div");
  priceIconRow.className = "product-price-icon-row";

  const price = document.createElement("h1");
  price.className = "product-price";
  if (product.discountedPrice < product.price) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = `${product.price.toFixed(0)},-`;
    const discountedPrice = document.createElement("span");
    discountedPrice.className = "discounted-price";
    discountedPrice.textContent = `${product.discountedPrice.toFixed(0)},-`;
    price.appendChild(oldPrice);
    price.appendChild(document.createTextNode(" "));
    price.appendChild(discountedPrice);
  } else {
    price.textContent = `${product.price.toFixed(0)},-`;
  }
  priceIconRow.appendChild(price);

  const iconRow = document.createElement("div");
  iconRow.className = "product-icon-row";

  const wishlistIcon = document.createElement("img");
  wishlistIcon.className = "product-wishlist-icon";
  wishlistIcon.alt = "Add to wishlist";
  wishlistIcon.tabIndex = 0;

  const { addToWishlist, removeFromWishlist, isWishlisted } =
    await import("../wishlist.js");

  function updateWishlistIcon() {
    wishlistIcon.src = isWishlisted(product.id)
      ? "../../public/assets/icons/icons-svg/black/filled-heart.svg"
      : "../../public/assets/icons/icons-svg/black/line-heart.svg";
  }
  updateWishlistIcon();

  wishlistIcon.addEventListener("click", () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    updateWishlistIcon();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "wishlist") {
      updateWishlistIcon();
    }
  });

  const shareIcon = document.createElement("img");
  shareIcon.className = "product-share-icon";
  shareIcon.src = "../../public/assets/icons/icons-svg/black/share.svg";
  shareIcon.alt = "Share product";
  shareIcon.tabIndex = 0;
  shareIcon.addEventListener("click", async () => {
    const url = window.location.href;
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

  iconRow.appendChild(wishlistIcon);
  iconRow.appendChild(shareIcon);
  priceIconRow.appendChild(iconRow);

  const title = document.createElement("h2");
  if (!includeTitle) {
    title.textContent = product.title;
  } else {
    title.className = "product-desktop-header";
    title.textContent = product.title;
  }

  const ratingDiv = createStarRating(
    product.rating,
    product.reviews?.length || 0,
  );

  return { priceIconRow, title, ratingDiv };
}
