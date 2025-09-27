import { fetchAllProducts } from "./api/api.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { createProductCarousel } from "./utils/carousel.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearCart,
} from "./utils/cart.js";
import { getUserProfile } from "./utils/user.js";

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
    text: item.tags ? item.tags.join(", ") : "",
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
  deleteBtn.addEventListener("click", () => {
    removeFromCart(item.id);
    renderCart();
  });

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
    updateItemQuantity(item.id, item.quantity + 1);
    renderCart();
  });

  minusBtn.addEventListener("click", () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
    renderCart();
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

  updateOrderSummary(items, summaryDetails);

  const deliveryInfo = createEl("div", { class: "delivery-info" });
  const mapIcon = createEl("img", {
    attrs: { src: "/public/assets/icons/icons-svg/black/map.svg" },
  });
  const user = getUserProfile();
  const userName = user?.name || "Guest";
  deliveryInfo.append(
    mapIcon,
    `Deliver to ${userName}, Karl Johans Gate 1, Oslo`
  );
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

  const messageContainer = createEl("div", { class: "message-container" });
  messageContainer.setAttribute("aria-live", "assertive");

  const checkoutBtn = createEl("button", {
    class: "btn-large",
    text: "Go to Checkout",
    attrs: { type: "button" },
  });
  checkoutBtn.onclick = () => {
    if (!items || items.length === 0) {
      messageContainer.textContent = "Your cart is empty.";
      messageContainer.classList.remove("success");
      messageContainer.classList.add("error");
      return;
    }
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (isLoggedIn) {
      window.location.href = "/src/pages/checkout.html";
    } else {
      window.location.href = "/src/pages/log-in.html";
    }
  };
  section.appendChild(checkoutBtn);
  section.appendChild(messageContainer);

  return section;
}

function updateOrderSummary(items, summaryDetailsElement) {
  while (summaryDetailsElement.firstChild) {
    summaryDetailsElement.removeChild(summaryDetailsElement.firstChild);
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = items.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );
  const deliveryFee = items.length === 0 ? 0.0 : 250.0;
  const total = subtotal - discount + deliveryFee;

  const createRow = (label, value, valueClass = "") => {
    const row = createEl("div", { class: "summary-row" });
    const labelSpan = createEl("span", { text: label });
    const valueSpan = createEl("span", { text: value, class: valueClass });
    row.append(labelSpan, valueSpan);
    return row;
  };

  const subtotalRow = createRow("Subtotal", `${subtotal.toFixed(2)},-`);
  const discountRow = createRow(
    "Discount",
    `-${discount.toFixed(2)},-`,
    "discount-value"
  );
  const deliveryRow = createRow("Delivery Fee", `${deliveryFee.toFixed(2)},-`);
  const separator = createEl("hr", { class: "summary-separator" });
  const totalRow = createRow("Total", `${total.toFixed(2)},-`);
  totalRow.classList.add("total");

  summaryDetailsElement.append(
    subtotalRow,
    discountRow,
    deliveryRow,
    separator,
    totalRow
  );
}

async function createRecommendationsSection() {
  const carouselSection = await createProductCarousel({
    title: "You might also like",
    maxCards: 5,
  });
  return carouselSection;
}

function renderCart() {
  const cartItems = getCart();
  let mainContainer = document.querySelector("main");
  if (!mainContainer) {
    mainContainer = createEl("main");
    document.body.insertBefore(
      mainContainer,
      document.querySelector(".recommendations-section") ||
        document.querySelector("footer")
    );
  }
  mainContainer.innerHTML = "";

  const cartAndSummaryWrapper = createEl("div", {
    class: "cart-summary-wrapper",
  });

  const yourCartSection = createYourCartSection(cartItems);
  const orderSummarySection = createOrderSummarySection(cartItems);

  cartAndSummaryWrapper.append(yourCartSection, orderSummarySection);
  mainContainer.append(cartAndSummaryWrapper);
}

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.body;
  showLoader();
  if (!document.querySelector("header")) {
    await import("./utils/header.js");
  }

  const breadcrumb = document.querySelector(".breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = "";
    const ol = createEl("ol", { class: "breadcrumb-list" });
    const homeLi = createEl("li");
    const homeA = createEl("a", { href: "/index.html", text: "Home" });
    homeLi.appendChild(homeA);
    ol.appendChild(homeLi);
    const cartLi = createEl("li", { text: "Cart" });
    cartLi.setAttribute("aria-current", "page");
    ol.appendChild(cartLi);
    breadcrumb.appendChild(ol);
  }

  renderCart();

  const recommendationsSection = await createRecommendationsSection();
  body.appendChild(recommendationsSection);

  if (!document.querySelector("footer")) {
    import("./utils/footer.js").then((mod) => {
      const footer = mod.buildFooter();
      document.body.appendChild(footer);
    });
  }
  hideLoader();
});
