// =================================================================
// MOCK DATA & SHARED UTILITIES
// =================================================================

// Mock data for cart items - will be replaced with real data later
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

// =================================================================
// CHECKOUT STEP CONTENT BUILDERS
// =================================================================

function createAddressBox() {
  const container = createEl("div", { class: "address-box" });
  container.innerHTML = `
        <p>John Doe</p>
        <p>Karl Johans gate 1</p>
        <p>0159 Oslo</p>
        <p>Norway</p>
        <div class="address-actions">
            <button><img src="/public/assets/icons/icons-svg/black/edit.svg" alt="Edit"></button>
            <button><img src="/public/assets/icons/icons-svg/black/trash.svg" alt="Delete"></button>
        </div>
    `;
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
// MOBILE CHECKOUT BUILDER
// =================================================================

function buildMobileCheckout() {
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
  addressStep.append(
    createEl("h3", { text: "Confirm Delivery Address" }),
    createAddressBox(),
    createEl("button", {
      class: "btn-large continue-btn",
      text: "Continue",
      attrs: { "data-next-step": 2 },
    }),
    createEl("button", {
      class: "btn-large-white",
      text: "Change Delivery Address",
    })
  );
  addressStep.querySelector(".btn-large-white").onclick = () =>
    (window.location.href = "/src/pages/address.html");

  // --- Step 2: Shipping ---
  const shippingStep = createEl("div", {
    class: "checkout-step",
    attrs: { "data-step": 2 },
  });
  shippingStep.append(
    createEl("h3", { text: "Shipping Options" }),
    createShippingOptions(),
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
  paymentStep.append(
    createEl("h3", { text: "Select Payment Method" }),
    createEl("p", { class: "payment-sub", text: "Saved payment options" }),
    createPaymentOptions(),
    createEl("button", {
      class: "btn-large-white",
      text: "Add Payment Option",
    }),
    createEl("button", { class: "btn-large", text: "Place Order" })
  );
  paymentStep.querySelector(".btn-large-white").onclick = () =>
    (window.location.href = "/src/pages/payment.html");

  stepsWrapper.append(addressStep, shippingStep, paymentStep);
  mainContainer.append(tabsContainer, stepsWrapper);

  // --- Navigation Logic ---
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

  // Initial state
  showStep(1);

  return mainContainer;
}

// =================================================================
// DESKTOP CHECKOUT BUILDER
// =================================================================

function buildDesktopCheckout() {
  const mainContainer = createEl("main", {
    class: "checkout-container-desktop",
  });
  const leftColumn = createEl("div", { class: "checkout-desktop-left" });
  const rightColumn = createEl("div", { class: "checkout-desktop-right" });

  // --- Left Column ---
  leftColumn.appendChild(createEl("h2", { text: "Checkout" }));

  const steps = [
    {
      title: "Confirm Delivery Address",
      content: createAddressBox(),
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
    if (index < 2) {
      // Add continue button for first two steps
      const continueBtn = createEl("button", {
        class: "btn-large continue-btn",
        text: step.buttonText,
      });
      content.appendChild(continueBtn);
    } else {
      // Add extra buttons for payment step
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
      content.append(addPaymentBtn, placeOrderBtn);
    }

    stepContainer.append(header, content);
    leftColumn.appendChild(stepContainer);
  });

  // --- Right Column ---
  rightColumn.appendChild(createYourCartSection(mockCartItems));

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

  // --- Locking Logic ---
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

// --- Functions for Right Column (from cart.js) ---
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
// DOMContentLoaded
// =================================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.appendChild(buildMobileCheckout());
  body.appendChild(buildDesktopCheckout());
});
