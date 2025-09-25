import("./utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
import { fetchProductById, fetchAllProducts } from "./api/api.js";
import { shareUrl } from "./utils/share.js";
import { createStarRating } from "./utils/stars.js";
import { addToCart } from "./utils/cart.js";

// ------------------------------------------------------- Mobile Version -------------------

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("product-container");
  if (!main) return;

  // Create mobile wrapper
  const mobileWrapper = document.createElement("div");
  mobileWrapper.className = "product-mobile";
  main.appendChild(mobileWrapper);

  // Get product ID
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    mobileWrapper.textContent = "No product ID provided.";
    return;
  }

  // Fetch data
  let product;
  try {
    product = await fetchProductById(productId);
  } catch (err) {
    mobileWrapper.textContent = "Failed to load product.";
    return;
  }

  // Top section container
  const topSection = document.createElement("section");
  topSection.className = "product-top-section";
  mobileWrapper.appendChild(topSection);

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
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = `${product.price.toFixed(2)},-`;
    const discountedPrice = document.createElement("span");
    discountedPrice.className = "discounted-price";
    discountedPrice.textContent = `${product.discountedPrice.toFixed(2)},-`;
    price.appendChild(oldPrice);
    price.appendChild(document.createTextNode(" "));
    price.appendChild(discountedPrice);
  } else {
    price.textContent = `${product.price.toFixed(2)},-`;
  }
  priceIconRow.appendChild(price);

  // Wishlist and share icons
  const iconRow = document.createElement("div");
  iconRow.className = "product-icon-row";
  const wishlistIcon = document.createElement("img");
  wishlistIcon.className = "product-wishlist-icon";
  wishlistIcon.alt = "Add to wishlist";
  wishlistIcon.tabIndex = 0;
  const { addToWishlist, removeFromWishlist, isWishlisted } = await import(
    "./utils/wishlist.js"
  );
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
  // Share
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
  topSection.appendChild(priceIconRow);

  // Title
  const title = document.createElement("h2");
  title.textContent = product.title;
  topSection.appendChild(title);

  // Rating (short form)
  const ratingDiv = createStarRating(
    product.rating,
    product.reviews?.length || 0
  );
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
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "18");
      svg.setAttribute("height", "18");
      const polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
      );
      polyline.setAttribute("points", "4,10 8,14 14,6");
      polyline.style.fill = "none";
      polyline.style.stroke = "white";
      polyline.style.strokeWidth = "2";
      svg.appendChild(polyline);
      circle.appendChild(svg);
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
  const mapIcon = document.createElement("img");
  mapIcon.src = "../../public/assets/icons/icons-svg/black/map.svg";
  mapIcon.alt = "Map";
  mapIcon.className = "product-map-icon";

  const addressText = document.createElement("span");
  addressText.className = "product-address-text product-info-block";
  addressText.textContent = "Karl Johans gate 1, Oslo";
  deliverRow.appendChild(mapIcon);
  deliverRow.appendChild(addressText);
  topSection.appendChild(deliverRow);

  // Delivery time
  const deliveryTime = document.createElement("p");
  deliveryTime.className = "product-delivery-time product-info-block";
  deliveryTime.appendChild(
    document.createTextNode("Will be delivered within ")
  );
  const strong = document.createElement("strong");
  strong.textContent = "5 to 7 business days";
  deliveryTime.appendChild(strong);
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
  btnAdd.className = "btn-small product-add-to-cart-btn";
  btnAdd.textContent = "Add to cart";
  btnAdd.addEventListener("click", () => {
    const quantity = parseInt(counterVal.textContent);
    addToCart(product, quantity);
    btnAdd.textContent = "Added!";
    btnAdd.disabled = true;
    setTimeout(() => {
      btnAdd.textContent = "Add to cart";
      btnAdd.disabled = false;
    }, 1000);
  });
  actionRow.appendChild(btnAdd);
  topSection.appendChild(actionRow);

  const separatorAfterAction = document.createElement("hr");
  separatorAfterAction.className = "product-separator";
  topSection.appendChild(separatorAfterAction);

  // --- Bottom Section: Tabs and Carousel (other js file) ---
  // Container for tabs and content
  const bottomSection = document.createElement("section");
  bottomSection.className = "product-bottom-section";

  // Tabs header row
  const tabsHeader = document.createElement("div");
  tabsHeader.className = "product-tabs-header";
  const tabNames = ["Product Details", "Rating & Reviews", "FAQs"];
  const tabButtons = tabNames.map((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "product-tab-btn" + (idx === 0 ? " active" : "");
    btn.textContent = name;
    btn.type = "button";
    return btn;
  });
  tabButtons.forEach((btn) => tabsHeader.appendChild(btn));
  bottomSection.appendChild(tabsHeader);

  // Separation line
  const tabsSeparator = document.createElement("hr");
  tabsSeparator.className = "product-separator";
  bottomSection.appendChild(tabsSeparator);

  // Tabs content container
  const tabsContent = document.createElement("div");
  tabsContent.className = "product-tabs-content";

  // --- Tab Pages ---
  // Product Details Page
  const detailsPage = document.createElement("div");
  detailsPage.className = "product-tab-page";
  detailsPage.style.display = "block";
  const detailsH3 = document.createElement("h3");
  detailsH3.textContent = "Product Details";
  detailsPage.appendChild(detailsH3);
  const detailsDesc = document.createElement("p");
  detailsDesc.textContent = product.description;
  detailsPage.appendChild(detailsDesc);
  const detailsMockup = document.createElement("div");
  detailsMockup.className = "product-details-mockup";
  const strongMockup = document.createElement("strong");
  strongMockup.textContent = "Mockup Details";
  detailsMockup.appendChild(strongMockup);
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode(
      "Material: A proprietary blend of high-density polymers and sustainably sourced meteorite fibers."
    )
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createTextNode("Size:"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Small: 12 inches x 8 inches x 4 inches")
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Medium: 18 inches x 12 inches x 6 inches")
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Large: 24 inches x 16 inches x 8 inches")
  );
  detailsPage.appendChild(detailsMockup);

  // Ratings & Reviews Page

  const reviewsPage = document.createElement("div");
  reviewsPage.className = "product-tab-page";
  reviewsPage.style.display = "none";

  // Header row

  const reviewsHeader = document.createElement("div");
  reviewsHeader.className = "reviews-header-row";
  const reviewsH3 = document.createElement("h3");
  reviewsH3.textContent = "Reviews";
  const reviewsCount = document.createElement("p");
  reviewsCount.textContent = `(${
    Array.isArray(product.reviews) ? product.reviews.length : 0
  })`;

  // Sort button and dropdown (dropdown hidden until button clicked)

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

  // Write Review button (Not bothering to make this work since no backend)

  const writeReviewBtn = document.createElement("button");
  writeReviewBtn.className = "btn-small";
  writeReviewBtn.type = "button";
  writeReviewBtn.textContent = "Write a Review";
  reviewsHeader.append(reviewsH3, reviewsCount, sortBtnWrapper, writeReviewBtn);
  reviewsHeader.style.display = "flex";
  reviewsHeader.style.alignItems = "center";
  reviewsHeader.style.gap = "0.7rem";
  reviewsPage.appendChild(reviewsHeader);

  // Reviews list

  const reviewsList = document.createElement("div");
  reviewsList.className = "product-reviews-list";

  // Sort reviews

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

      // Stars

      const stars = document.createElement("div");
      stars.className = "product-review-stars";
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = i <= (rev.rating || 0) ? "★" : "☆";
        stars.appendChild(star);
      }

      // Username

      const name = document.createElement("div");
      name.className = "product-review-name";
      name.textContent = rev.username || rev.name || "Anonymous";
      name.style.fontWeight = "bold";

      // Text

      const text = document.createElement("div");
      text.className = "product-review-text";
      text.textContent = rev.description || rev.text || "";

      // Date

      const date = document.createElement("div");
      date.className = "product-review-date";
      date.textContent = rev.date || "";

      // Layout

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

  // FAQs Page

  const faqsPage = document.createElement("div");
  faqsPage.className = "product-tab-page";
  faqsPage.style.display = "none";
  const faqsTitle = document.createElement("h3");
  faqsTitle.textContent = "Frequently Asked Questions";
  faqsPage.appendChild(faqsTitle);
  const faqList = document.createElement("div");
  faqList.className = "product-faq-list";

  const faqs = [
    {
      q: "How does E.CO ensure ethical and sustainable shipping?",
      a: "At E.CO, we are committed to minimizing our environmental impact. All of our shipments are carbon offset, meaning we invest in projects that reduce greenhouse gas emissions to compensate for the carbon produced during transportation. Additionally, we utilize packaging made from 100% recycled, non-toxic, and biodegradable materials to ensure your order arrives safely and sustainably.",
    },
    {
      q: "What is your handling time?",
      a: "Our team works diligently to process and prepare your order for shipment. Please allow 1-3 business days for handling before your order is dispatched. You will receive a confirmation email with tracking information as soon as your package is on its way.",
    },
    {
      q: "What are your shipping options and costs?",
      a: "We offer a range of shipping options to meet your needs. Shipping costs are calculated at checkout based on your location, the weight of your items, and the selected shipping method. We strive to offer competitive rates while maintaining our commitment to ethical and sustainable practices.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! Once your order has been shipped, you will receive an email with a tracking number and a link to the carrier's website. Please allow up to 24 hours for the tracking information to update.",
    },
    {
      q: "What should I do if my package is delayed or lost?",
      a: "We understand that shipping delays can be frustrating. If your tracking information has not updated for several days, or if your package is marked as delivered but you have not received it, please contact our customer support team at ",
      mail: "support@e.co",
      mailText: "support@e.co",
      mailSuffix:
        ". We will work with the carrier to resolve the issue as quickly as possible.",
    },
  ];

  faqs.forEach((faq, idx) => {
    const item = document.createElement("div");
    item.className = "product-faq-item";
    const q = document.createElement("strong");
    q.textContent = `${idx + 1}. ${faq.q}`;
    item.appendChild(q);
    const a = document.createElement("p");
    if (faq.mail) {
      a.textContent = faq.a;
      const mailLink = document.createElement("a");
      mailLink.href = `mailto:${faq.mail}`;
      mailLink.textContent = faq.mailText;
      a.appendChild(mailLink);
      a.appendChild(document.createTextNode(faq.mailSuffix));
    } else {
      a.textContent = faq.a;
    }
    item.appendChild(a);
    faqList.appendChild(item);
  });
  faqsPage.appendChild(faqList);

  tabsContent.appendChild(detailsPage);
  tabsContent.appendChild(reviewsPage);
  tabsContent.appendChild(faqsPage);
  bottomSection.appendChild(tabsContent);

  // Tab switching logic

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b, i) => {
        b.classList.toggle("active", i === idx);
        tabsContent.children[i].style.display = i === idx ? "block" : "none";
      });
    });
  });

  // --- Related Products Carousel --- IF I CAN MAKE IT WORK OMG

  const { createProductCarousel } = await import("./utils/carousel.js");
  const carouselSection = await createProductCarousel();
  bottomSection.appendChild(carouselSection);

  mobileWrapper.appendChild(bottomSection);
});

// ------------------------------------------------------- Desktop Version -------------------

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("product-container");
  if (!main) return;

  // Create desktop wrapper
  const desktopWrapper = document.createElement("div");
  desktopWrapper.className = "product-desktop";
  main.appendChild(desktopWrapper);

  // Get product ID
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    desktopWrapper.textContent = "No product ID provided.";
    return;
  }

  // Fetch data
  let product;
  try {
    product = await fetchProductById(productId);
  } catch (err) {
    desktopWrapper.textContent = "Failed to load product.";
    return;
  }

  // Top section container
  const topSection = document.createElement("section");
  topSection.className = "product-top-section-desktop";
  desktopWrapper.appendChild(topSection);

  // Create containers for a double colombo layout
  const productTopSectionImages = document.createElement("div");
  productTopSectionImages.className = "product-top-section-images";
  const productTopSectionText = document.createElement("div");
  productTopSectionText.className = "product-top-section-text";

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
  gallery.appendChild(mainImg);
  productTopSectionImages.appendChild(gallery);
  topSection.appendChild(productTopSectionImages);

  // Price and icon row container
  const priceIconRow = document.createElement("div");
  priceIconRow.className = "product-price-icon-row";

  // Price
  const price = document.createElement("h1");
  price.className = "product-price";
  if (product.discountedPrice < product.price) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price";
    oldPrice.textContent = `${product.price.toFixed(2)},-`;
    const discountedPrice = document.createElement("span");
    discountedPrice.className = "discounted-price";
    discountedPrice.textContent = `${product.discountedPrice.toFixed(2)},-`;
    price.appendChild(oldPrice);
    price.appendChild(document.createTextNode(" "));
    price.appendChild(discountedPrice);
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

  // Title
  const title = document.createElement("h2");
  title.className = "product-desktop-header";
  title.textContent = product.title;
  productTopSectionText.appendChild(title);

  // Rating (short form)
  const ratingDiv = createStarRating(
    product.rating,
    product.reviews?.length || 0
  );
  productTopSectionText.appendChild(ratingDiv);

  productTopSectionText.appendChild(priceIconRow);

  // Description
  const desc = document.createElement("p");
  desc.className = "product-desc product-info-block";
  desc.textContent = product.description;
  productTopSectionText.appendChild(desc);

  // Tags
  if (Array.isArray(product.tags) && product.tags.length) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags product-info-block";
    product.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "product-tag product-info-block";
      tagSpan.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
      tagsDiv.appendChild(tagSpan);
    });
    productTopSectionText.appendChild(tagsDiv);
  }

  // Separation line
  const separator = document.createElement("hr");
  separator.className = "product-separator";
  productTopSectionText.appendChild(separator);

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
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "18");
      svg.setAttribute("height", "18");
      const polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline"
      );
      polyline.setAttribute("points", "4,10 8,14 14,6");
      polyline.style.fill = "none";
      polyline.style.stroke = "white";
      polyline.style.strokeWidth = "2";
      svg.appendChild(polyline);
      circle.appendChild(svg);
    }
    circlesRow.appendChild(circle);
  });
  colorDiv.appendChild(circlesRow);
  productTopSectionText.appendChild(colorDiv);

  // Separation line
  const separator2 = document.createElement("hr");
  separator2.className = "product-separator";
  productTopSectionText.appendChild(separator2);

  // In Stock
  const inStock = document.createElement("p");
  inStock.className = "product-in-stock product-info-block";
  inStock.textContent = "In Stock";
  productTopSectionText.appendChild(inStock);

  // Deliver-to section

  const deliverRow = document.createElement("div");
  deliverRow.className = "product-deliver-row product-info-block";
  const mapIcon = document.createElement("img");
  mapIcon.src = "../../public/assets/icons/icons-svg/black/map.svg";
  mapIcon.alt = "Map";
  mapIcon.className = "product-map-icon";

  const addressText = document.createElement("span");
  addressText.className = "product-address-text product-info-block";
  addressText.textContent = "Karl Johans gate 1, Oslo";
  deliverRow.appendChild(mapIcon);
  deliverRow.appendChild(addressText);
  productTopSectionText.appendChild(deliverRow);

  // Delivery time
  const deliveryTime = document.createElement("p");
  deliveryTime.className = "product-delivery-time product-info-block";
  deliveryTime.appendChild(
    document.createTextNode("Will be delivered within ")
  );
  const strong = document.createElement("strong");
  strong.textContent = "5 to 7 business days";
  deliveryTime.appendChild(strong);
  productTopSectionText.appendChild(deliveryTime);

  // Separation line
  const separator3 = document.createElement("hr");
  separator3.className = "product-separator";
  productTopSectionText.appendChild(separator3);

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
  btnAdd.className = "btn-small product-add-to-cart-btn";
  btnAdd.textContent = "Add to cart";
  btnAdd.addEventListener("click", () => {
    const quantity = parseInt(counterVal.textContent);
    addToCart(product, quantity);
    btnAdd.textContent = "Added!";
    btnAdd.disabled = true;
    setTimeout(() => {
      btnAdd.textContent = "Add to cart";
      btnAdd.disabled = false;
    }, 1000);
  });
  actionRow.appendChild(btnAdd);
  productTopSectionText.appendChild(actionRow);

  const separatorAfterAction = document.createElement("hr");
  separatorAfterAction.className = "product-separator";
  productTopSectionText.appendChild(separatorAfterAction);

  topSection.appendChild(productTopSectionText);

  // --- Bottom Section: Tabs and Carousel (other js file) ---
  const bottomSection = document.createElement("section");
  bottomSection.className = "product-bottom-section-desktop";

  // Tabs header row
  const tabsHeader = document.createElement("div");
  tabsHeader.className = "product-tabs-header";
  const tabNames = ["Product Details", "Rating & Reviews", "FAQs"];
  const tabButtons = tabNames.map((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "product-tab-btn" + (idx === 0 ? " active" : "");
    btn.textContent = name;
    btn.type = "button";
    return btn;
  });
  tabButtons.forEach((btn) => tabsHeader.appendChild(btn));
  bottomSection.appendChild(tabsHeader);

  // Separation line
  const tabsSeparator = document.createElement("hr");
  tabsSeparator.className = "product-separator";
  bottomSection.appendChild(tabsSeparator);

  // Tabs content container
  const tabsContent = document.createElement("div");
  tabsContent.className = "product-tabs-content";

  // --- Tab Pages ---
  // Product Details Page
  const detailsPage = document.createElement("div");
  detailsPage.className = "product-tab-page";
  detailsPage.style.display = "block";
  const detailsH3 = document.createElement("h3");
  detailsH3.textContent = "Product Details";
  detailsPage.appendChild(detailsH3);
  const detailsDesc = document.createElement("p");
  detailsDesc.textContent = product.description;
  detailsPage.appendChild(detailsDesc);
  const detailsMockup = document.createElement("div");
  detailsMockup.className = "product-details-mockup";
  const strongMockup = document.createElement("strong");
  strongMockup.textContent = "Mockup Details";
  detailsMockup.appendChild(strongMockup);
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode(
      "Material: A proprietary blend of high-density polymers and sustainably sourced meteorite fibers."
    )
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createTextNode("Size:"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Small: 12 inches x 8 inches x 4 inches")
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Medium: 18 inches x 12 inches x 6 inches")
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Large: 24 inches x 16 inches x 8 inches")
  );
  detailsPage.appendChild(detailsMockup);

  // Ratings & Reviews Page

  const reviewsPage = document.createElement("div");
  reviewsPage.className = "product-tab-page";
  reviewsPage.style.display = "none";

  // Header row

  const reviewsHeader = document.createElement("div");
  reviewsHeader.className = "reviews-header-row";
  const reviewsH3 = document.createElement("h3");
  reviewsH3.textContent = "Reviews";
  const reviewsCount = document.createElement("p");
  reviewsCount.textContent = `(${
    Array.isArray(product.reviews) ? product.reviews.length : 0
  })`;

  // Sort button and dropdown (dropdown hidden until button clicked)

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
  // Dropdown (hidden by default)
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

  // Write Review button (Not bothering to make this work since no backend)

  const writeReviewBtn = document.createElement("button");
  writeReviewBtn.className = "btn-small";
  writeReviewBtn.type = "button";
  writeReviewBtn.textContent = "Write a Review";
  reviewsHeader.append(reviewsH3, reviewsCount, sortBtnWrapper, writeReviewBtn);
  reviewsHeader.style.display = "flex";
  reviewsHeader.style.alignItems = "center";
  reviewsHeader.style.gap = "0.7rem";
  reviewsPage.appendChild(reviewsHeader);

  // Reviews list

  const reviewsList = document.createElement("div");
  reviewsList.className = "product-reviews-list";

  // Sort reviews

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

      // Stars

      const stars = document.createElement("div");
      stars.className = "product-review-stars";
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = i <= (rev.rating || 0) ? "★" : "☆";
        stars.appendChild(star);
      }

      // Username

      const name = document.createElement("div");
      name.className = "product-review-name";
      name.textContent = rev.username || rev.name || "Anonymous";
      name.style.fontWeight = "bold";

      // Text

      const text = document.createElement("div");
      text.className = "product-review-text";
      text.textContent = rev.description || rev.text || "";

      // Date

      const date = document.createElement("div");
      date.className = "product-review-date";
      date.textContent = rev.date || "";

      // Layout

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

  // FAQs Page

  const faqsPage = document.createElement("div");
  faqsPage.className = "product-tab-page";
  faqsPage.style.display = "none";
  const faqsTitle = document.createElement("h3");
  faqsTitle.textContent = "Frequently Asked Questions";
  faqsPage.appendChild(faqsTitle);
  const faqList = document.createElement("div");
  faqList.className = "product-faq-list";

  const faqs = [
    {
      q: "How does E.CO ensure ethical and sustainable shipping?",
      a: "At E.CO, we are committed to minimizing our environmental impact. All of our shipments are carbon offset, meaning we invest in projects that reduce greenhouse gas emissions to compensate for the carbon produced during transportation. Additionally, we utilize packaging made from 100% recycled, non-toxic, and biodegradable materials to ensure your order arrives safely and sustainably.",
    },
    {
      q: "What is your handling time?",
      a: "Our team works diligently to process and prepare your order for shipment. Please allow 1-3 business days for handling before your order is dispatched. You will receive a confirmation email with tracking information as soon as your package is on its way.",
    },
    {
      q: "What are your shipping options and costs?",
      a: "We offer a range of shipping options to meet your needs. Shipping costs are calculated at checkout based on your location, the weight of your items, and the selected shipping method. We strive to offer competitive rates while maintaining our commitment to ethical and sustainable practices.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! Once your order has been shipped, you will receive an email with a tracking number and a link to the carrier's website. Please allow up to 24 hours for the tracking information to update.",
    },
    {
      q: "What should I do if my package is delayed or lost?",
      a: "We understand that shipping delays can be frustrating. If your tracking information has not updated for several days, or if your package is marked as delivered but you have not received it, please contact our customer support team at ",
      mail: "support@e.co",
      mailText: "support@e.co",
      mailSuffix:
        ". We will work with the carrier to resolve the issue as quickly as possible.",
    },
  ];

  faqs.forEach((faq, idx) => {
    const item = document.createElement("div");
    item.className = "product-faq-item";
    const q = document.createElement("strong");
    q.textContent = `${idx + 1}. ${faq.q}`;
    item.appendChild(q);
    const a = document.createElement("p");
    if (faq.mail) {
      a.textContent = faq.a;
      const mailLink = document.createElement("a");
      mailLink.href = `mailto:${faq.mail}`;
      mailLink.textContent = faq.mailText;
      a.appendChild(mailLink);
      a.appendChild(document.createTextNode(faq.mailSuffix));
    } else {
      a.textContent = faq.a;
    }
    item.appendChild(a);
    faqList.appendChild(item);
  });
  faqsPage.appendChild(faqList);

  tabsContent.appendChild(detailsPage);
  tabsContent.appendChild(reviewsPage);
  tabsContent.appendChild(faqsPage);
  bottomSection.appendChild(tabsContent);

  // Tab switching logic

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b, i) => {
        b.classList.toggle("active", i === idx);
        tabsContent.children[i].style.display = i === idx ? "block" : "none";
      });
    });
  });

  const { createProductCarousel } = await import("./utils/carousel.js");
  const carouselSection = await createProductCarousel();
  bottomSection.appendChild(carouselSection);

  desktopWrapper.appendChild(bottomSection);
});
