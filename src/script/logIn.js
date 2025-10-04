import { loginUser } from "./api/api.js";
import { showLoader, hideLoader } from "./utils/loader.js";
import { displayMessage } from "./utils/displayMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("login-container");
  if (!root) return;

  const welcomeSection = document.createElement("section");
  welcomeSection.className = "login-welcome";

  const logoImg = document.createElement("img");
  logoImg.src = "../../public/assets/img/logo/logo.webp";
  logoImg.alt = "E.CO Logo";
  logoImg.className = "login-logo";
  logoImg.width = 100;
  logoImg.height = 100;

  const welcomeText = document.createElement("div");
  welcomeText.className = "login-welcome-text";

  const h2 = document.createElement("h2");
  h2.textContent = "Welcome back!";
  const pWelcome = document.createElement("p");
  pWelcome.textContent = "It's good to see you again";

  welcomeText.appendChild(h2);
  welcomeText.appendChild(pWelcome);

  welcomeSection.appendChild(logoImg);
  welcomeSection.appendChild(welcomeText);

  const h3 = document.createElement("h3");
  h3.className = "login-heading";
  h3.textContent = "Log In";

  const form = document.createElement("form");
  form.className = "form login-form";
  form.autocomplete = "on";

  const labelUser = document.createElement("label");
  labelUser.htmlFor = "login-email";
  labelUser.textContent = "E-Mail";
  const inputUser = document.createElement("input");
  inputUser.type = "email";
  inputUser.id = "login-email";
  inputUser.name = "email";
  inputUser.autocomplete = "email";
  inputUser.required = true;
  inputUser.placeholder = "john-doe@email.com";

  const labelPass = document.createElement("label");
  labelPass.htmlFor = "login-password";
  labelPass.textContent = "Password";
  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.id = "login-password";
  inputPass.name = "password";
  inputPass.autocomplete = "current-password";
  inputPass.required = true;
  inputPass.placeholder = "*******";

  const btnLogin = document.createElement("button");
  btnLogin.type = "submit";
  btnLogin.className = "btn-large";
  btnLogin.textContent = "Log in";

  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const credentials = {
      email: inputUser.value,
      password: inputPass.value,
    };

    try {
      btnLogin.disabled = true;
      btnLogin.textContent = "Logging in...";
      showLoader();
      const userData = await loginUser(credentials);

      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("userProfile", JSON.stringify(userData));

      displayMessage(
        ".message-container",
        "Login successful! Redirecting...",
        "success"
      );
      setTimeout(() => {
        hideLoader();
        window.location.href = "../../index.html";
      }, 2000);
    } catch (error) {
      displayMessage(".message-container", error.message, "error");
      hideLoader();
    } finally {
      btnLogin.disabled = false;
      btnLogin.textContent = "Log in";
    }
  });

  form.appendChild(labelUser);
  form.appendChild(inputUser);
  form.appendChild(labelPass);
  form.appendChild(inputPass);
  form.appendChild(btnLogin);
  form.appendChild(messageContainer);

  const orText = document.createElement("p");
  orText.textContent = "or";
  orText.className = "login-or";

  const btnCreate = document.createElement("a");
  btnCreate.href = "register.html";
  btnCreate.className = "btn-large-white";
  btnCreate.textContent = "Create an account";

  root.appendChild(welcomeSection);
  root.appendChild(h3);
  root.appendChild(form);
  root.appendChild(orText);
  root.appendChild(btnCreate);
});

import("./utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
