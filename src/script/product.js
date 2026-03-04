import("./utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
import { fetchProductById } from "./api/api.js";
import { addToCart } from "./utils/cart.js";
import { createProductGallery } from "./utils/product/productGallery.js";
import { createProductHeader } from "./utils/product/productHeader.js";
import { createProductInfo } from "./utils/product/productInfo.js";
import { createQuantityCounter } from "./utils/product/quantityCounter.js";
import { createReviewsSection } from "./utils/product/reviewsSection.js";
import { createFaqSection } from "./utils/product/faqSection.js";
import {
  createProductTabs,
  createProductTabsDesktop,
} from "./utils/product/productTabs.js";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("product-container");
  if (!main) return;

  const mobileWrapper = document.createElement("div");
  mobileWrapper.className = "product-mobile";
  main.appendChild(mobileWrapper);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    mobileWrapper.textContent = "No product ID provided.";
    return;
  }

  let product;
  try {
    product = await fetchProductById(productId);
  } catch (err) {
    mobileWrapper.textContent = "Failed to load product.";
    return;
  }

  const topSection = document.createElement("section");
  topSection.className = "product-top-section";
  mobileWrapper.appendChild(topSection);

  const gallery = createProductGallery(product, false);
  topSection.appendChild(gallery);

  const { priceIconRow, title, ratingDiv } = await createProductHeader(
    product,
    false,
  );
  topSection.appendChild(priceIconRow);
  topSection.appendChild(title);
  topSection.appendChild(ratingDiv);

  const infoElements = createProductInfo(product);
  infoElements.forEach((el) => topSection.appendChild(el));

  const actionRow = document.createElement("div");
  actionRow.className = "product-action-row";
  actionRow.style.display = "flex";
  actionRow.style.alignItems = "center";
  actionRow.style.gap = "1.2rem";

  const counter = createQuantityCounter();
  actionRow.appendChild(counter.element);

  const btnAdd = document.createElement("button");
  btnAdd.type = "button";
  btnAdd.className =
    "min-w-20 h-12 px-6 rounded-full bg-blue-600 text-white font-semibold border-none shadow-md inline-flex items-center justify-center whitespace-nowrap cursor-pointer transition-all duration-150 hover:bg-blue-700 hover:shadow-lg product-add-to-cart-btn";
  btnAdd.textContent = "Add to cart";
  btnAdd.addEventListener("click", () => {
    const quantity = counter.getValue();
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

  const reviewsPage = createReviewsSection(product);
  const faqsPage = createFaqSection();
  const bottomSection = createProductTabs(product, reviewsPage, faqsPage);

  const { createProductCarousel } = await import("./utils/carousel.js");
  const carouselSection = await createProductCarousel();
  bottomSection.appendChild(carouselSection);

  mobileWrapper.appendChild(bottomSection);
});

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("product-container");
  if (!main) return;

  const desktopWrapper = document.createElement("div");
  desktopWrapper.className = "product-desktop";
  main.appendChild(desktopWrapper);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    desktopWrapper.textContent = "No product ID provided.";
    return;
  }

  let product;
  try {
    product = await fetchProductById(productId);
  } catch (err) {
    desktopWrapper.textContent = "Failed to load product.";
    return;
  }

  const topSection = document.createElement("section");
  topSection.className = "product-top-section-desktop";
  desktopWrapper.appendChild(topSection);

  const productTopSectionImages = document.createElement("div");
  productTopSectionImages.className = "product-top-section-images";
  const productTopSectionText = document.createElement("div");
  productTopSectionText.className = "product-top-section-text";

  const gallery = createProductGallery(product, true);
  productTopSectionImages.appendChild(gallery);
  topSection.appendChild(productTopSectionImages);

  const { priceIconRow, title, ratingDiv } = await createProductHeader(
    product,
    true,
  );

  productTopSectionText.appendChild(title);
  productTopSectionText.appendChild(ratingDiv);
  productTopSectionText.appendChild(priceIconRow);

  const infoElements = createProductInfo(product);
  infoElements.forEach((el) => productTopSectionText.appendChild(el));

  const actionRow = document.createElement("div");
  actionRow.className = "product-action-row";
  actionRow.style.display = "flex";
  actionRow.style.alignItems = "center";
  actionRow.style.gap = "1.2rem";

  const counter = createQuantityCounter();
  actionRow.appendChild(counter.element);

  const btnAdd = document.createElement("button");
  btnAdd.type = "button";
  btnAdd.className =
    "min-w-20 h-12 px-6 rounded-full bg-blue-600 text-white font-semibold border-none shadow-md inline-flex items-center justify-center whitespace-nowrap cursor-pointer transition-all duration-150 hover:bg-blue-700 hover:shadow-lg product-add-to-cart-btn";
  btnAdd.textContent = "Add to cart";
  btnAdd.addEventListener("click", () => {
    const quantity = counter.getValue();
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

  const reviewsPage = createReviewsSection(product);
  const faqsPage = createFaqSection();
  const bottomSection = createProductTabsDesktop(
    product,
    reviewsPage,
    faqsPage,
  );

  const { createProductCarousel } = await import("./utils/carousel.js");
  const carouselSection = await createProductCarousel();
  bottomSection.appendChild(carouselSection);

  desktopWrapper.appendChild(bottomSection);
});
