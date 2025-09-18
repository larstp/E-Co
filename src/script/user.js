document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;

  const container = document.createElement("section");
  container.className = "user-container";

  // Welcome section
  const welcomeSection = document.createElement("section");
  welcomeSection.className = "user-welcome";

  const h2 = document.createElement("h2");
  h2.textContent = "Hi, user"; // Replace with dynamic username/email when available ---------------------!
  const pWelcome = document.createElement("p");
  pWelcome.textContent = "Use this page to change your account settings";

  welcomeSection.appendChild(h2);
  welcomeSection.appendChild(pWelcome);

  // Address section
  const addressSection = document.createElement("section");
  addressSection.className = "user-address-section";
  const h3Address = document.createElement("h3");
  h3Address.textContent = "Address";
  const btnAddress = document.createElement("a");
  btnAddress.className = "btn-large";
  btnAddress.href = "address.html";
  btnAddress.textContent = "Create new address";
  addressSection.appendChild(h3Address);
  addressSection.appendChild(btnAddress);

  // Payment section
  const paymentSection = document.createElement("section");
  paymentSection.className = "user-payment-section";
  const h4Payment = document.createElement("h4");
  h4Payment.textContent = "Payment";
  const btnPayment = document.createElement("a");
  btnPayment.className = "btn-large";
  btnPayment.href = "payment.html";
  btnPayment.textContent = "Add new Payment Method";
  paymentSection.appendChild(h4Payment);
  paymentSection.appendChild(btnPayment);

  container.appendChild(welcomeSection);
  container.appendChild(addressSection);
  container.appendChild(paymentSection);

  main.appendChild(container);
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
