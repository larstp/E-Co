import { isLoggedIn, getUserProfile, logout } from "./utils/user.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!isLoggedIn()) {
    window.location.href = "/src/pages/log-in.html";
    return;
  }

  const main = document.querySelector("main");
  if (!main) return;

  const container = document.createElement("section");
  container.className = "user-container";

  // Welcome section
  const welcomeSection = document.createElement("section");
  welcomeSection.className = "user-welcome";

  const h2 = document.createElement("h2");
  const user = getUserProfile();
  h2.textContent = `Hi, ${user?.name || "user"}`;
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

  const logoutSection = document.createElement("section");
  logoutSection.className = "user-logout-section";
  const btnLogout = document.createElement("button");
  btnLogout.className = "btn-large-white";
  btnLogout.textContent = "Log Out";
  btnLogout.addEventListener("click", logout);
  logoutSection.appendChild(btnLogout);

  container.appendChild(welcomeSection);
  container.appendChild(addressSection);
  container.appendChild(paymentSection);
  container.appendChild(logoutSection);

  main.appendChild(container);
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
