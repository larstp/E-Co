import { getCart } from "./utils/cart.js";

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

function createOrderSummarySection(items) {
  const section = createEl("div", { class: "order-summary-container" });
  section.appendChild(createEl("h3", { text: "Order Summary" }));

  const summaryDetails = createEl("div", { class: "summary-details" });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = items.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );
  const deliveryFee = 250.0; // Mock fee
  const total = subtotal - discount + deliveryFee;

  const createRow = (label, value) => {
    const row = createEl("div", { class: "summary-row" });
    row.append(
      createEl("span", { text: label }),
      createEl("span", { text: value })
    );
    return row;
  };

  summaryDetails.append(
    createRow("Subtotal", `${subtotal.toFixed(2)},-`),
    createRow("Discount", `-${discount.toFixed(2)},-`),
    createRow("Delivery Fee", `${deliveryFee.toFixed(2)},-`),
    createEl("hr", { class: "separator" })
  );

  const totalRow = createRow("Total", `${total.toFixed(2)},-`);
  totalRow.classList.add("total");
  summaryDetails.appendChild(totalRow);

  section.appendChild(summaryDetails);
  return section;
}

// =================================================================
// CHECKOUT STEP CONTENT
// =================================================================

async function createAddressBox() {
  const container = createEl("div", { class: "address-box-list" });
  let addresses = [];
  let selectedIdx = parseInt(localStorage.getItem("selectedAddressIdx")) || 0;
  let showAll = false;
  try {
    const res = await fetch("/src/components/address.json");
    addresses = await res.json();
  } catch (e) {
    container.append(createEl("p", { text: "Failed to load addresses." }));
    return container;
  }

  if (!Array.isArray(addresses) || addresses.length === 0) {
    container.append(createEl("p", { text: "No addresses found." }));
    return container;
  }

  function renderAddresses() {
    container.innerHTML = "";
    if (!showAll) {
      const addr = addresses[selectedIdx];
      const box = createEl("div", { class: "address-box selected" });
      const label = createEl("label", { class: "address-label" });
      label.append(
        createEl("p", { text: addr.name }),
        createEl("p", {
          text: addr.street + (addr.apt ? ", " + addr.apt : ""),
        }),
        createEl("p", { text: `${addr.postal} ${addr.city}` }),
        createEl("p", { text: addr.country })
      );
      box.append(label);
      container.appendChild(box);
    } else {
      addresses.forEach((addr, idx) => {
        const box = createEl("div", { class: "address-box" });
        if (idx === selectedIdx) box.classList.add("selected");
        const radio = createEl("input", {
          class: "address-radio",
          attrs: {
            type: "radio",
            name: "delivery-address",
            value: idx,
            ...(idx === selectedIdx ? { checked: true } : {}),
          },
        });
        // Trash icon (bottom right)
        const trash = createEl("img", {
          class: "address-trash",
          attrs: {
            src: "/public/assets/icons/icons-svg/black/trash.svg",
            alt: "Delete address (mock)",
            tabindex: 0,
          },
        });
        // No real delete, just mock hover/click! Dont know if we can save this to the API
        trash.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        trash.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            trash.click();
          }
        });
        box.addEventListener("click", (e) => {
          if (!radio.checked) {
            radio.checked = true;
            radio.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        radio.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        radio.addEventListener("change", () => {
          localStorage.setItem("selectedAddressIdx", idx);
          selectedIdx = idx;
          showAll = false;
          renderAddresses();
        });
        const label = createEl("label", { class: "address-label" });
        label.append(
          createEl("p", { text: addr.name }),
          createEl("p", {
            text: addr.street + (addr.apt ? ", " + addr.apt : ""),
          }),
          createEl("p", { text: `${addr.postal} ${addr.city}` }),
          createEl("p", { text: addr.country })
        );
        box.append(label, radio, trash);
        container.appendChild(box);
      });
    }
  }

  container.showAllAddresses = () => {
    showAll = true;
    renderAddresses();
  };

  renderAddresses();
  return container;
}

function createShippingOptions() {
  const container = createEl("div", { class: "shipping-options" });
  const options = ["Mailbox", "Pickup-Point", "In front of door"];
  options.forEach((opt, index) => {
    const label = createEl("label", { class: "shipping-option" });
    const radio = createEl("input", {
      attrs: { type: "radio", name: "shipping" },
    });
    if (index === 0) radio.checked = true;
    label.append(radio, opt);
    container.appendChild(label);
  });
  return container;
}

function createPaymentOptions() {
  const container = createEl("div", { class: "payment-options" });
  const options = ["Card", "Vipps"];
  options.forEach((opt, index) => {
    const label = createEl("label", { class: "payment-option" });
    const radio = createEl("input", {
      attrs: { type: "radio", name: "payment" },
    });
    if (index === 0) radio.checked = true;
    label.append(radio, opt);
    container.appendChild(label);
  });
  return container;
}

// =================================================================
// MOBILE CHECKOUT
// =================================================================

async function buildMobileCheckout(cartItems) {
  const mainContainer = createEl("main", {
    class: "checkout-container-mobile",
  });

  // --- Progress Tabs ---
  const tabsContainer = createEl("div", { class: "checkout-tabs" });
  const tabNames = ["Address", "Shipping", "Payment"];
  const progressLines = [];
  const tabButtons = tabNames.map((name, index) => {
    const tabWrapper = createEl("div", { class: "tab-wrapper" });
    const button = createEl("button", {
      class: "tab-btn",
      text: name,
      attrs: { "data-step": index + 1 },
    });
    const progressLine = createEl("div", { class: "progress-line" });
    progressLines.push(progressLine);
    tabWrapper.append(button, progressLine);
    return tabWrapper;
  });
  tabsContainer.append(...tabButtons);

  // --- Steps Wrapper (Slideshow) ---
  const stepsWrapper = createEl("div", { class: "checkout-steps-wrapper" });

  // --- Step 1: Address ---
  const addressStep = createEl("div", {
    class: "checkout-step active-step",
    attrs: { "data-step": 1 },
  });
  let addressBox;
  try {
    addressBox = await createAddressBox();
  } catch (e) {
    addressBox = createEl("p", { text: "Failed to load addresses." });
  }
  addressStep.append(
    createEl("h3", { text: "Confirm Delivery Address" }),
    addressBox,
    createOrderSummarySection(cartItems),
    createEl("button", {
      class: "btn-large continue-btn",
      text: "Continue",
      attrs: { "data-next-step": 2 },
    }),
    createEl("button", {
      class: "btn-large-white",
      text: "Change Delivery Address",
      attrs: { id: "change-address-btn-mobile" },
    })
  );
  addressStep.querySelector("#change-address-btn-mobile").onclick = () => {
    if (addressBox && addressBox.showAllAddresses)
      addressBox.showAllAddresses();
  };

  // --- Step 2: Shipping ---
  const shippingStep = createEl("div", {
    class: "checkout-step",
    attrs: { "data-step": 2 },
  });
  shippingStep.append(
    createEl("h3", { text: "Shipping Options" }),
    createShippingOptions(),
    createOrderSummarySection(cartItems),
    createEl("p", {
      class: "shipping-note",
      text: "* Parcel will be delivered to nearest pickup point if it cannot fit in the mailbox",
    }),
    createEl("button", {
      class: "btn-large continue-btn",
      text: "Continue",
      attrs: { "data-next-step": 3 },
    })
  );

  // --- Step 3: Payment ---
  const paymentStep = createEl("div", {
    class: "checkout-step",
    attrs: { "data-step": 3 },
  });
  const placeOrderBtn = createEl("button", {
    class: "btn-large",
    text: "Place Order",
  });
  placeOrderBtn.addEventListener("click", () => {
    const popup = createConfirmationPopup();
    document.body.appendChild(popup);
  });

  paymentStep.append(
    createEl("h3", { text: "Select Payment Method" }),
    createEl("p", { class: "payment-sub", text: "Saved payment options" }),
    createPaymentOptions(),
    createOrderSummarySection(cartItems),
    createEl("button", {
      class: "btn-large-white",
      text: "Add Payment Option",
    }),
    placeOrderBtn
  );
  paymentStep.querySelector(".btn-large-white").onclick = () =>
    (window.location.href = "/src/pages/payment.html");

  stepsWrapper.append(addressStep, shippingStep, paymentStep);
  mainContainer.append(tabsContainer, stepsWrapper);

  // --- Navigation  ---
  let currentStep = 1;

  function updateTabs() {
    const allTabButtons = tabsContainer.querySelectorAll(".tab-btn");
    allTabButtons.forEach((btn, index) => {
      if (index + 1 === currentStep) {
        btn.classList.add("active");
        progressLines[index].classList.add("active");
      } else {
        btn.classList.remove("active");
        progressLines[index].classList.remove("active");
      }
      if (index + 1 < currentStep) {
        progressLines[index].classList.add("completed");
      } else {
        progressLines[index].classList.remove("completed");
      }
    });
  }

  function showStep(stepNumber) {
    currentStep = stepNumber;
    const steps = stepsWrapper.querySelectorAll(".checkout-step");
    steps.forEach((step) => {
      step.classList.remove("active-step");
      if (parseInt(step.dataset.step) === currentStep) {
        step.classList.add("active-step");
      }
    });
    stepsWrapper.style.transform = `translateX(-${(currentStep - 1) * 100}%)`;
    updateTabs();
  }

  tabsContainer.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const step = parseInt(e.target.dataset.step);
      showStep(step);
    });
  });

  stepsWrapper.querySelectorAll(".continue-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const nextStep = parseInt(e.target.dataset.nextStep);
      showStep(nextStep);
    });
  });

  showStep(1);

  return mainContainer;
}

// =================================================================
// DESKTOP CHECKOUT
// =================================================================

async function buildDesktopCheckout(cartItems) {
  const mainContainer = createEl("main", {
    class: "checkout-container-desktop",
  });
  const leftColumn = createEl("div", { class: "checkout-desktop-left" });
  const rightColumn = createEl("div", { class: "checkout-desktop-right" });

  // --- Left Column ---
  leftColumn.appendChild(createEl("h2", { text: "Checkout" }));

  let addressBox;
  try {
    addressBox = await createAddressBox();
  } catch (e) {
    addressBox = createEl("p", { text: "Failed to load addresses." });
  }
  const steps = [
    {
      title: "Confirm Delivery Address",
      content: addressBox,
      buttonText: "Continue",
    },
    {
      title: "Shipping Options",
      content: createShippingOptions(),
      buttonText: "Continue",
    },
    {
      title: "Select Payment Method",
      content: createPaymentOptions(),
      buttonText: "Place Order",
    },
  ];

  steps.forEach((step, index) => {
    const stepContainer = createEl("div", {
      class: "desktop-step-container",
      attrs: { "data-step": index + 1 },
    });
    const header = createEl("div", { class: "desktop-step-header" });
    const number = createEl("div", { class: "step-number", text: index + 1 });
    const title = createEl("h3", { text: step.title });
    header.append(number, title);

    const content = createEl("div", { class: "desktop-step-content" });
    content.appendChild(step.content);

    const buttonContainer = createEl("div", {
      class: "desktop-button-container",
    });

    if (index === 0) {
      // Address step
      const changeAddressBtn = createEl("button", {
        class: "btn-large-white",
        text: "Change Delivery Address",
        attrs: { id: "change-address-btn-desktop" },
      });
      changeAddressBtn.onclick = () => {
        if (addressBox && addressBox.showAllAddresses)
          addressBox.showAllAddresses();
      };
      const continueBtn = createEl("button", {
        class: "btn-large continue-btn",
        text: step.buttonText,
      });
      buttonContainer.append(continueBtn, changeAddressBtn);
    } else if (index === 1) {
      // Shipping step
      const continueBtn = createEl("button", {
        class: "btn-large continue-btn",
        text: step.buttonText,
      });
      buttonContainer.appendChild(continueBtn);
    } else {
      // Payment step
      const addPaymentBtn = createEl("button", {
        class: "btn-large-white",
        text: "Add Payment Option",
      });
      addPaymentBtn.onclick = () =>
        (window.location.href = "/src/pages/payment.html");
      const placeOrderBtn = createEl("button", {
        class: "btn-large",
        text: step.buttonText,
      });
      placeOrderBtn.addEventListener("click", () => {
        if (!document.querySelector(".confirmation-popup-overlay")) {
          const popup = createConfirmationPopup();
          document.body.appendChild(popup);
        }
      });
      buttonContainer.append(placeOrderBtn, addPaymentBtn);
    }
    content.appendChild(buttonContainer);

    stepContainer.append(header, content);
    leftColumn.appendChild(stepContainer);
  });

  // ------------------------------ Right Column -------------------------

  rightColumn.appendChild(createYourCartSection(cartItems));
  rightColumn.appendChild(createOrderSummarySection(cartItems));

  const newsletter = createEl("label", { class: "newsletter-checkbox" });
  const checkbox = createEl("input", { attrs: { type: "checkbox" } });
  newsletter.append(
    checkbox,
    "Yes, please contact me with recommendations and offers"
  );
  rightColumn.appendChild(newsletter);

  const backBtn = createEl("button", {
    class: "btn-large",
    text: "Back to store",
  });
  backBtn.onclick = () => (window.location.href = "/");
  rightColumn.appendChild(backBtn);

  // --- Locking Logic -------------------------------------------------------------- Check if works
  let currentStep = 1;
  const stepContainers = leftColumn.querySelectorAll(".desktop-step-container");

  function updateDesktopSteps() {
    stepContainers.forEach((container) => {
      const stepNum = parseInt(container.dataset.step);
      if (stepNum === currentStep) {
        container.classList.add("active");
        container.classList.remove("disabled");
      } else {
        container.classList.remove("active");
        container.classList.add("disabled");
      }
    });
  }

  leftColumn.querySelectorAll(".continue-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      stepContainers[index].classList.remove("active");
      stepContainers[index].classList.add("completed");
      currentStep++;
      updateDesktopSteps();
    });
  });

  mainContainer.append(leftColumn, rightColumn);
  updateDesktopSteps();
  return mainContainer;
}

// --- Functions for Right Column (from cart.js) ------------------------------- !!
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

function createCartItemCard(item) {
  const card = createEl("div", { class: "cart-item-card" });
  const imgContainer = createEl("div", { class: "cart-item-img-container" });
  const img = createEl("img", {
    attrs: {
      src: item.image.url || "/public/assets/img/placeholder.jpg",
      alt: item.image.alt || item.title,
    },
  });
  imgContainer.appendChild(img);

  const infoContainer = createEl("div", { class: "cart-item-info-container" });
  const title = createEl("h4", { class: "cart-item-title", text: item.title });
  const price = createEl("p", {
    class: "cart-item-price",
    text: `${item.price.toFixed(2)},-`,
  });
  infoContainer.append(title, price);

  const quantityDisplay = createEl("div", {
    class: "cart-item-quantity",
    text: `Qty: ${item.quantity}`,
  });

  card.append(imgContainer, infoContainer, quantityDisplay);
  return card;
}

// =================================================================
// CONFIRMATION POP-UP
// =================================================================

function createConfirmationPopup() {
  const overlay = createEl("div", { class: "confirmation-popup-overlay" });
  const content = createEl("div", { class: "confirmation-popup-content" });

  const heading = createEl("h2", { text: "Thank you for your order!" });

  const checkIcon = createEl("img", {
    class: "confirmation-icon",
    attrs: {
      src: "/public/assets/icons/icons-svg/payment/check.svg",
      alt: "Order confirmed",
    },
  });

  const homeButton = createEl("button", { class: "btn-large", text: "Home" });
  homeButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    window.location.href = "/";
  });

  const logo = createEl("img", {
    class: "confirmation-logo",
    attrs: {
      src: "/public/assets/img/logo/logo.webp",
      alt: "E.CO Logo",
    },
  });

  content.append(heading, checkIcon, homeButton, logo);
  overlay.appendChild(content);
  return overlay;
}

// =================================================================
// DOMContentLoaded
// =================================================================

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const body = document.body;
    const cartItems = getCart();
    body.appendChild(await buildMobileCheckout(cartItems));
    body.appendChild(await buildDesktopCheckout(cartItems));
    import("./utils/footer.js").then((mod) => {
      const footer = mod.buildFooter();
      document.body.appendChild(footer);
    });
  })();
});
