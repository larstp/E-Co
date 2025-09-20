import { fetchProductById } from "./api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("register-container");
  if (!main) return;

  // Get product ID
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    main.textContent = "No product ID provided.";
    return;
  }

  // Fetch data
  let product;
  try {
    product = await fetchProductById(productId);
  } catch (err) {
    main.textContent = "Failed to load product.";
    return;
  }

  // Top section container
  const topSection = document.createElement("section");
  topSection.className = "product-top-section";

  // Image gallery
  const gallery = document.createElement("div");
  gallery.className = "product-gallery";

  // Main image
  const mainImg = document.createElement("img");
  mainImg.className = "product-main-img";
  mainImg.src = product.image?.url || "";
  mainImg.alt = product.image?.alt || product.title;
  mainImg.width = 350;
  mainImg.height = 290;
  gallery.appendChild(mainImg);

  // Thumbnails
  const thumbs = document.createElement("div");
  thumbs.className = "product-thumbnails";
  for (let i = 0; i < 3; i++) {
    const thumb = document.createElement("img");
    thumb.className = "product-thumb";
    thumb.src = product.image?.url || "";
    thumb.alt = product.image?.alt || product.title + " thumbnail";
    thumb.width = 80;
    thumb.height = 80;
    if (i === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;
      thumbs
        .querySelectorAll(".product-thumb")
        .forEach((el) => el.classList.remove("active"));
      thumb.classList.add("active");
    });
    thumbs.appendChild(thumb);
  }
  gallery.appendChild(thumbs);
  topSection.appendChild(gallery);

  // Price and icon row container
  const priceIconRow = document.createElement("div");
  priceIconRow.className = "product-price-icon-row";

  // Price
  const price = document.createElement("h1");
  price.className = "product-price";
  if (product.discountedPrice < product.price) {
    price.innerHTML = `<span class='old-price'>${product.price.toFixed(
      2
    )},-</span> <span class='discounted-price'>${product.discountedPrice.toFixed(
      2
    )},-</span>`;
  } else {
    price.textContent = `${product.price.toFixed(2)},-`;
  }
  priceIconRow.appendChild(price);

  // Wishlist and share icons
  const iconRow = document.createElement("div");
  iconRow.className = "product-icon-row";
  // Wishlist
  const wishlistIcon = document.createElement("img");
  wishlistIcon.className = "product-wishlist-icon";
  wishlistIcon.src = "../../public/assets/icons/icons-svg/black/line-heart.svg";
  wishlistIcon.alt = "Add to wishlist";
  wishlistIcon.tabIndex = 0;
  wishlistIcon.addEventListener("click", () => {
    if (wishlistIcon.src.includes("line-heart")) {
      wishlistIcon.src =
        "../../public/assets/icons/icons-svg/black/filled-heart.svg";
    } else {
      wishlistIcon.src =
        "../../public/assets/icons/icons-svg/black/line-heart.svg";
    }
  });
  // Share
  const shareIcon = document.createElement("img");
  shareIcon.className = "product-share-icon";
  shareIcon.src = "../../public/assets/icons/icons-svg/black/share.svg";
  shareIcon.alt = "Share product";
  shareIcon.tabIndex = 0;
  shareIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    shareIcon.title = "Link copied!";
    setTimeout(() => (shareIcon.title = "Share product"), 1500);
  });
  iconRow.appendChild(wishlistIcon);
  iconRow.appendChild(shareIcon);
  priceIconRow.appendChild(iconRow);
  topSection.appendChild(priceIconRow);

  // Title
  const title = document.createElement("h2");
  title.textContent = product.title;
  topSection.appendChild(title);

  // Rating (short form)
  const ratingDiv = document.createElement("div");
  ratingDiv.className = "product-rating";
  const ratingValue = product.rating ? product.rating.toFixed(1) : "-";
  ratingDiv.innerHTML = `<span class='star'>★</span> <span class='rating-number'>${ratingValue}</span>`;
  topSection.appendChild(ratingDiv);

  // Description
  const desc = document.createElement("p");
  desc.className = "product-desc product-info-block";
  desc.textContent = product.description;
  topSection.appendChild(desc);

  // Tags
  if (Array.isArray(product.tags) && product.tags.length) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags product-info-block";
    product.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "product-tag product-info-block";

      // I have to capitalize the first letters of the tags, it looks weird without I think

      tagSpan.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
      tagsDiv.appendChild(tagSpan);
    });
    topSection.appendChild(tagsDiv);
  }

  // Separation line
  const separator = document.createElement("hr");
  separator.className = "product-separator";
  topSection.appendChild(separator);

  // Select colours (mockup)
  const colorDiv = document.createElement("div");
  colorDiv.className = "product-colors product-info-block";
  const colorLabel = document.createElement("p");
  colorLabel.textContent = "Select colour:";
  colorLabel.style.marginBottom = "0.5rem";
  colorDiv.appendChild(colorLabel);
  const circlesRow = document.createElement("div");
  circlesRow.className = "product-colors-row";
  const colors = ["#000", "#d32f2f", "#1976d2", "#fbc02d"];
  colors.forEach((color, idx) => {
    const circle = document.createElement("span");
    circle.className = "product-color-circle product-info-block";
    circle.style.background = color;
    if (idx === 0) {
      circle.classList.add("selected");
      circle.innerHTML =
        "<svg width='18' height='18'><polyline points='4,10 8,14 14,6' style='fill:none;stroke:white;stroke-width:2'/></svg>";
    }
    circlesRow.appendChild(circle);
  });
  colorDiv.appendChild(circlesRow);
  topSection.appendChild(colorDiv);

  // Separation line
  const separator2 = document.createElement("hr");
  separator2.className = "product-separator";
  topSection.appendChild(separator2);

  // In Stock
  const inStock = document.createElement("p");
  inStock.className = "product-in-stock product-info-block";
  inStock.textContent = "In Stock";
  topSection.appendChild(inStock);

  // Deliver-to section
  const deliverRow = document.createElement("div");
  deliverRow.className = "product-deliver-row product-info-block";
  // Map icon
  const mapIcon = document.createElement("img");
  mapIcon.src = "../../public/assets/icons/icons-svg/black/map.svg";
  mapIcon.alt = "Map";
  mapIcon.className = "product-map-icon";
  // Geolocate user and show city-based address
  const addressText = document.createElement("span");
  addressText.className = "product-address-text product-info-block";
  addressText.textContent = "Loading address...";
  deliverRow.appendChild(mapIcon);
  deliverRow.appendChild(addressText);
  topSection.appendChild(deliverRow);

  // Use ipinfo.io to get city
  try {
    const geoRes = await fetch("https://ipinfo.io/json?token=2e6e7e7e7e7e7e");
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      const city = geoData.city || "your city";
      addressText.textContent = `Main Street 1, ${city}`;
    } else {
      addressText.textContent = "Main Street 1, your city";
    }
  } catch (e) {
    addressText.textContent = "Main Street 1, your city";
  }

  // Delivery time
  const deliveryTime = document.createElement("p");
  deliveryTime.className = "product-delivery-time product-info-block";
  deliveryTime.innerHTML =
    "Will be delivered within <strong>5 to 7 business days</strong>";
  topSection.appendChild(deliveryTime);

  // Separation line
  const separator3 = document.createElement("hr");
  separator3.className = "product-separator";
  topSection.appendChild(separator3);

  // Counter and Add to cart row
  const actionRow = document.createElement("div");
  actionRow.className = "product-action-row";
  actionRow.style.display = "flex";
  actionRow.style.alignItems = "center";
  actionRow.style.gap = "1.2rem";

  const counterRow = document.createElement("div");
  counterRow.className = "product-counter-row";
  const btnMinus = document.createElement("button");
  btnMinus.type = "button";
  btnMinus.className = "product-counter-btn";
  btnMinus.textContent = "-";
  const counterVal = document.createElement("span");
  counterVal.className = "product-counter-val";
  counterVal.textContent = "1";
  const btnPlus = document.createElement("button");
  btnPlus.type = "button";
  btnPlus.className = "product-counter-btn";
  btnPlus.textContent = "+";
  counterRow.appendChild(btnMinus);
  counterRow.appendChild(counterVal);
  counterRow.appendChild(btnPlus);
  // Counter logic
  btnMinus.addEventListener("click", () => {
    let val = parseInt(counterVal.textContent);
    if (val > 1) counterVal.textContent = val - 1;
  });
  btnPlus.addEventListener("click", () => {
    let val = parseInt(counterVal.textContent);
    counterVal.textContent = val + 1;
  });
  actionRow.appendChild(counterRow);

  // Add to cart button
  const btnAdd = document.createElement("button");
  btnAdd.type = "button";
  btnAdd.className = "btn-large product-add-to-cart-btn";
  btnAdd.textContent = "Add to cart";
  actionRow.appendChild(btnAdd);
  topSection.appendChild(actionRow);

  main.appendChild(topSection);
});
