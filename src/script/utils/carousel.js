import { fetchAllProducts } from "../api/api.js";
import { shareUrl } from "./share.js";

export async function createProductCarousel(options = {}) {
  const section = document.createElement("section");
  section.className = "product-carousel-section";
  const carouselTitle = document.createElement("h3");
  carouselTitle.textContent = options.title || "You might also like";
  section.appendChild(carouselTitle);

  // Controls
  const controls = document.createElement("div");
  controls.className = "carousel-controls";
  controls.style.display = "flex";
  controls.style.justifyContent = "center";
  controls.style.alignItems = "center";
  controls.style.gap = "1.2rem";
  controls.style.marginTop = "0.7rem";

  // Left arrow
  const leftArrow = document.createElement("button");
  leftArrow.className = "carousel-arrow carousel-arrow-left";
  leftArrow.type = "button";
  leftArrow.style.background = "none";
  leftArrow.style.border = "none";
  leftArrow.style.cursor = "pointer";
  leftArrow.style.padding = "0";
  const leftArrowImg = document.createElement("img");
  leftArrowImg.src = "../../public/assets/icons/icons-svg/black/left.svg";
  leftArrowImg.alt = "Left";
  leftArrowImg.style.width = "32px";
  leftArrowImg.style.height = "32px";
  leftArrow.appendChild(leftArrowImg);
  controls.appendChild(leftArrow);

  // Dots
  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  controls.appendChild(dots);

  // Right arrow
  const rightArrow = document.createElement("button");
  rightArrow.className = "carousel-arrow carousel-arrow-right";
  rightArrow.type = "button";
  rightArrow.style.background = "none";
  rightArrow.style.border = "none";
  rightArrow.style.cursor = "pointer";
  rightArrow.style.padding = "0";
  const rightArrowImg = document.createElement("img");
  rightArrowImg.src = "../../public/assets/icons/icons-svg/black/right.svg";
  rightArrowImg.alt = "Right";
  rightArrowImg.style.width = "32px";
  rightArrowImg.style.height = "32px";
  rightArrow.appendChild(rightArrowImg);
  controls.appendChild(rightArrow);

  const track = document.createElement("div");
  track.className = "product-carousel-track";

  // Get products
  let products = options.products;
  if (!products) {
    try {
      const allProducts = await fetchAllProducts();
      products = allProducts.slice(0, options.maxCards || 5);
    } catch {
      products = [];
    }
  }

  function createProductCard(prod) {
    const card = document.createElement("div");
    card.className = "product-card-base product-card";
    const imgLink = document.createElement("a");
    imgLink.href = `product.html?id=${prod.id}`;
    imgLink.className = "product-img-link";
    const img = document.createElement("img");
    img.className = "product-img";
    img.src = prod.image?.url || "../public/assets/img/placeholder.jpg";
    img.alt = prod.image?.alt || prod.title;
    imgLink.appendChild(img);
    card.appendChild(imgLink);
    const titleLink = document.createElement("a");
    titleLink.className = "product-title-carousel-link";
    titleLink.href = `product.html?id=${prod.id}`;
    const title = document.createElement("h2");
    title.className = "product-title-carousel";
    title.textContent = prod.title;
    titleLink.appendChild(title);
    card.appendChild(titleLink);

    if (prod.tags && Array.isArray(prod.tags) && prod.tags.length > 0) {
      const tagsDiv = document.createElement("div");
      tagsDiv.className = "product-tags";
      tagsDiv.textContent = prod.tags
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
        .join(", ");
      card.appendChild(tagsDiv);
    }

    const ratingAndIconsRow = document.createElement("div");
    ratingAndIconsRow.className = "product-card-rating-row";

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = "flex";
    ratingContainer.style.alignItems = "center";
    ratingContainer.style.gap = "0.5rem";

    let ratingValue = prod.rating;
    if (prod.reviews && prod.reviews.length > 0) {
      ratingValue =
        prod.reviews.reduce((a, r) => a + (r.rating || 0), 0) /
        prod.reviews.length;
    }
    ratingValue = ratingValue || 0;

    const starContainer = document.createElement("div");
    starContainer.className = "star-rating-container";

    const starsBackground = document.createElement("div");
    starsBackground.className = "stars-background";
    starsBackground.textContent = "★★★★★";
    starContainer.appendChild(starsBackground);

    const starsForeground = document.createElement("div");
    starsForeground.className = "stars-foreground";
    starsForeground.textContent = "★★★★★";
    const percentage = (ratingValue / 5) * 100;
    starsForeground.style.width = `${percentage}%`;
    starContainer.appendChild(starsForeground);

    ratingContainer.appendChild(starContainer);

    const ratingNum = document.createElement("span");
    ratingNum.className = "rating-number";
    ratingNum.textContent = ratingValue.toFixed(1);
    ratingNum.style.fontFamily = `"Roboto", Arial, sans-serif`;
    ratingNum.style.fontSize = "1rem";
    ratingNum.style.color = "#555";
    ratingContainer.appendChild(ratingNum);

    ratingAndIconsRow.appendChild(ratingContainer);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "product-card-icon-row";

    const wishlistIcon = document.createElement("img");
    wishlistIcon.className = "product-card-wishlist-icon";
    wishlistIcon.alt = "Add to wishlist"; //Hihihi cheeky
    import("./wishlist.js").then(
      ({ addToWishlist, removeFromWishlist, isWishlisted }) => {
        function updateWishlistIcon() {
          wishlistIcon.src = isWishlisted(prod.id)
            ? "../../public/assets/icons/icons-svg/black/filled-heart.svg"
            : "../../public/assets/icons/icons-svg/black/line-heart.svg";
        }
        updateWishlistIcon();
        wishlistIcon.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isWishlisted(prod.id)) {
            removeFromWishlist(prod.id);
          } else {
            addToWishlist(prod);
          }
          updateWishlistIcon();
        });
      }
    );
    iconsDiv.appendChild(wishlistIcon);

    const shareIcon = document.createElement("img");
    shareIcon.className = "product-card-share-icon";
    shareIcon.src = "../../public/assets/icons/icons-svg/black/share.svg";
    shareIcon.alt = "Share product";
    shareIcon.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = titleLink.href;
      const titleText = prod.title || "Product";
      const result = await shareUrl(url, titleText, "Check out this product!");
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
    card.appendChild(ratingAndIconsRow);

    const reviewCount = prod.reviews?.length || 0;
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review-count";
    reviewDiv.textContent = `${reviewCount} review${
      reviewCount === 1 ? "" : "s"
    }`;
    card.appendChild(reviewDiv);
    const priceSpan = document.createElement("span");
    priceSpan.className = "product-price-carousel";
    if (prod.discountedPrice && prod.discountedPrice < prod.price) {
      const oldPrice = document.createElement("span");
      oldPrice.className = "old-price-carousel";
      oldPrice.textContent = `${prod.price.toFixed(0)},-`;
      priceSpan.appendChild(oldPrice);
      priceSpan.appendChild(document.createTextNode(" "));
      const discounted = document.createElement("span");
      discounted.className = "discounted-price-carousel";
      discounted.textContent = `${prod.discountedPrice.toFixed(0)},-`;
      priceSpan.appendChild(discounted);
    } else {
      priceSpan.textContent = `${prod.price.toFixed(0)},-`;
    }
    const pricesDiv = document.createElement("div");
    pricesDiv.className = "product-prices";
    pricesDiv.appendChild(priceSpan);
    card.appendChild(pricesDiv);
    const btn = document.createElement("button");
    btn.className = "btn-small";
    btn.type = "button";
    btn.textContent = "Add to cart";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      import("./cart.js").then(({ addToCart }) => {
        addToCart(prod);
        btn.textContent = "Added!";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = "Add to cart";
          btn.disabled = false;
        }, 1000);
      });
    });
    card.appendChild(btn);
    return card;
  }

  let currentIndex = 0;
  function renderCarousel() {
    while (track.firstChild) {
      track.removeChild(track.firstChild);
    }
    let cardsToShow = [];
    if (products.length < 3) {
      cardsToShow = products;
    } else {
      for (let i = 0; i < 3; i++) {
        let idx = (currentIndex + i) % products.length;
        cardsToShow.push(products[idx]);
      }
    }
    cardsToShow.forEach((prod) => {
      track.appendChild(createProductCard(prod));
    });
    renderDots();
  }

  function renderDots() {
    while (dots.firstChild) {
      dots.removeChild(dots.firstChild);
    }
    for (let i = 0; i < products.length; i++) {
      const dot = document.createElement("span");
      dot.className = "carousel-dot" + (i === currentIndex ? " active" : "");
      dot.addEventListener("click", () => {
        currentIndex = i;
        renderCarousel();
      });
      dots.appendChild(dot);
    }
  }

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    renderCarousel();
  });
  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % products.length;
    renderCarousel();
  });

  renderCarousel();

  section.appendChild(track);
  section.appendChild(controls);
  return section;
}
