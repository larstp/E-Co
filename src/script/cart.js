import { fetchAllProducts } from "./api/api.js";
import { createProductCarousel } from "./utils/carousel.js";

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

// --------------------------------Mock data for cart items - we will replace this with real data later!
const mockCartItems = [
  {
    id: "c0d245f1-58fa-4b15-aa0c-a704772a122b",
    title: "Radiant Glow Serum",
    tags: ["Beauty", "Skincare"],
    price: 89.99,
    discountedPrice: 79.99,
    image: {
      url: "/public/assets/img/products/serum.jpg",
      alt: "Radiant Glow Serum",
    },
    quantity: 1,
  },
  {
    id: "159fdd2f-2b12-46de-9654-d9139525ba87",
    title: "Eco-buds",
    tags: ["Electronics", "Audio"],
    price: 129.99,
    discountedPrice: 129.99,
    image: {
      url: "/public/assets/img/products/buds.jpg",
      alt: "Eco-buds",
    },
    quantity: 1,
  },
];

function createCartItemCard(item) {
  const card = createEl("div", { class: "cart-item-card" });

  // 1. Image Container
  const imgContainer = createEl("div", { class: "cart-item-img-container" });
  const img = createEl("img", {
    attrs: {
      src: item.image.url || "/public/assets/img/placeholder.jpg",
      alt: item.image.alt || item.title,
    },
  });
  imgContainer.appendChild(img);

  // 2. Info Container
  const infoContainer = createEl("div", { class: "cart-item-info-container" });
  const title = createEl("h4", { class: "cart-item-title", text: item.title });
  const tags = createEl("p", {
    class: "cart-item-tags",
    text: item.tags.join(", "),
  });
  const price = createEl("p", { class: "cart-item-price" });
  if (item.discountedPrice < item.price) {
    const oldPrice = createEl("span", {
      class: "old-price",
      text: `${item.price.toFixed(2)},-`,
    });
    const discounted = createEl("span", {
      class: "discounted-price",
      text: ` ${item.discountedPrice.toFixed(2)},-`,
    });
    price.append(oldPrice, discounted);
  } else {
    price.textContent = `${item.price.toFixed(2)},-`;
  }
  infoContainer.append(title, tags, price);

  // 3. Buttons etc. container
  const actionsContainer = createEl("div", {
    class: "cart-item-actions-container",
  });
  const deleteBtn = createEl("button", { class: "delete-item-btn" });
  const deleteIcon = createEl("img", {
    attrs: {
      src: "/public/assets/icons/icons-svg/black/trash.svg",
      alt: "Remove item",
    },
  });
  deleteBtn.appendChild(deleteIcon);

  const quantitySelector = createEl("div", { class: "product-counter-row" });
  const minusBtn = createEl("button", {
    class: "product-counter-btn",
    text: "-",
  });
  const quantityDisplay = createEl("span", {
    class: "product-counter-val",
    text: item.quantity,
  });
  const plusBtn = createEl("button", {
    class: "product-counter-btn",
    text: "+",
  });

  plusBtn.addEventListener("click", () => {
    item.quantity++;
    quantityDisplay.textContent = item.quantity;
    const summaryDetails = document.querySelector(".summary-details");
    if (summaryDetails) {
      updateOrderSummary(mockCartItems, summaryDetails);
    }
  });

  minusBtn.addEventListener("click", () => {
    if (item.quantity > 1) {
      item.quantity--;
      quantityDisplay.textContent = item.quantity;
      const summaryDetails = document.querySelector(".summary-details");
      if (summaryDetails) {
        updateOrderSummary(mockCartItems, summaryDetails);
      }
    }
  });

  quantitySelector.append(minusBtn, quantityDisplay, plusBtn);

  actionsContainer.append(deleteBtn, quantitySelector);

  card.append(imgContainer, infoContainer, actionsContainer);
  return card;
}

function createYourCartSection(items) {
  const section = createEl("div", { class: "your-cart-container" });
  const heading = createEl("h3", { text: "Your Cart" });
  section.appendChild(heading);

  if (items.length === 0) {
    section.appendChild(createEl("p", { text: "Your cart is empty." }));
  } else {
    items.forEach((item) => {
      section.appendChild(createCartItemCard(item));
    });
  }
  return section;
}

function createOrderSummarySection(items) {
  const section = createEl("div", { class: "order-summary-container" });
  section.appendChild(createEl("h3", { text: "Order Summary" }));

  const summaryDetails = createEl("div", { class: "summary-details" });
  section.appendChild(summaryDetails);

  // Initial render
  updateOrderSummary(items, summaryDetails);

  const deliveryInfo = createEl("div", { class: "delivery-info" });
  const mapIcon = createEl("img", {
    attrs: { src: "/public/assets/icons/icons-svg/black/map.svg" },
  });
  deliveryInfo.append(mapIcon, "Deliver to USER, ADDRESS"); //------------------------------ Placeholder
  section.appendChild(deliveryInfo);

  const changeAddressBtn = createEl("button", {
    class: "btn-large-white",
    text: "Change Delivery Address",
  });
  changeAddressBtn.onclick = () =>
    (window.location.href = "/src/pages/address.html");
  section.appendChild(changeAddressBtn);

  const promoContainer = createEl("div", { class: "promo-container" });
  const promoInput = createEl("input", {
    attrs: { type: "text", placeholder: "Add promo code" },
  });
  const applyBtn = createEl("button", { class: "btn-small", text: "Apply" });
  promoContainer.append(promoInput, applyBtn);
  section.appendChild(promoContainer);

  const checkoutBtn = createEl("button", {
    class: "btn-large",
    text: "Go to Checkout",
  });
  section.appendChild(checkoutBtn);

  return section;
}

function updateOrderSummary(items, summaryDetailsElement) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = items.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );
  const deliveryFee = 250.0;
  const total = subtotal - discount + deliveryFee;

  summaryDetailsElement.innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(
      2
    )},-</span></div>
    <div class="summary-row"><span>Discount</span><span>-${discount.toFixed(
      2
    )},-</span></div>
    <div class="summary-row"><span>Delivery Fee</span><span>${deliveryFee.toFixed(
      2
    )},-</span></div>
    <hr class="separator">
    <div class="summary-row total"><span>Total</span><span>${total.toFixed(
      2
    )},-</span></div>
    <hr class="separator">
  `;
}

async function createRecommendationsSection() {
  const carouselSection = await createProductCarousel({
    title: "You might also like",
    maxCards: 5,
  });
  return carouselSection;
}

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.body;

  const breadcrumb = document.querySelector(".breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = ""; // Clear existing
    const homeLink = createEl("a", { href: "/index.html", text: "Home" });
    const separator = createEl("span", { text: " / " });
    const currentPage = createEl("span", {
      text: "Cart",
      attrs: { "aria-current": "page" },
    });
    breadcrumb.append(homeLink, separator, currentPage);
  }

  const mainContainer = createEl("main");
  const cartAndSummaryWrapper = createEl("div", {
    class: "cart-summary-wrapper",
  });

  const yourCartSection = createYourCartSection(mockCartItems);
  const orderSummarySection = createOrderSummarySection(mockCartItems);
  cartAndSummaryWrapper.append(yourCartSection, orderSummarySection);

  const recommendationsSection = await createRecommendationsSection();

  mainContainer.append(cartAndSummaryWrapper, recommendationsSection);
  body.appendChild(mainContainer);

  import("./utils/footer.js").then((mod) => {
    const footer = mod.buildFooter();
    body.appendChild(footer);
  });
});
