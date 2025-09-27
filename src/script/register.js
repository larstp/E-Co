import { registerUser } from "./api/api.js";
import { showLoader, hideLoader } from "./utils/loader.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("register-container");
  if (!root) return;

  const welcomeSection = document.createElement("section");
  welcomeSection.className = "register-welcome";

  const logoImg = document.createElement("img");
  logoImg.src = "../../public/assets/img/logo/logo.webp";
  logoImg.alt = "E.CO Logo";
  logoImg.className = "register-logo";
  logoImg.width = 100;
  logoImg.height = 100;

  const welcomeText = document.createElement("div");
  welcomeText.className = "register-welcome-text";

  const h2 = document.createElement("h2");
  h2.textContent = "Welcome to e.co!";
  const pWelcome = document.createElement("p");
  pWelcome.textContent = "Let the shopping begin!";

  welcomeText.appendChild(h2);
  welcomeText.appendChild(pWelcome);

  welcomeSection.appendChild(logoImg);
  welcomeSection.appendChild(welcomeText);

  const h3 = document.createElement("h3");
  h3.className = "register-heading";
  h3.textContent = "Create account";

  const form = document.createElement("form");
  form.className = "form register-form";
  form.autocomplete = "on";

  // E-Mail
  const labelEmail = document.createElement("label");
  labelEmail.htmlFor = "register-email";
  labelEmail.textContent = "E-Mail";
  const asteriskEmail = document.createElement("span");
  asteriskEmail.className = "required-asterisk";
  asteriskEmail.textContent = "*";
  labelEmail.appendChild(asteriskEmail);
  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "register-email";
  inputEmail.name = "email";
  inputEmail.autocomplete = "email";
  inputEmail.required = true;
  inputEmail.placeholder = "john-doe@email.com";

  // Username
  const labelUser = document.createElement("label");
  labelUser.htmlFor = "register-username";
  labelUser.textContent = "Username";
  const inputUser = document.createElement("input");
  inputUser.type = "text";
  inputUser.id = "register-username";
  inputUser.name = "username";
  inputUser.autocomplete = "username";
  inputUser.required = true;
  inputUser.placeholder = "johnny-boy";

  // Phone
  const labelPhone = document.createElement("label");
  labelPhone.htmlFor = "register-phone";
  labelPhone.textContent = "Phone (optional)";
  const inputPhone = document.createElement("input");
  inputPhone.type = "text";
  inputPhone.id = "register-phone";
  inputPhone.name = "phone";
  inputPhone.autocomplete = "tel";
  inputPhone.placeholder = "+47 123 45 678";

  // Password
  const labelPass = document.createElement("label");
  labelPass.htmlFor = "register-password";
  labelPass.textContent = "Password";
  const asteriskPass = document.createElement("span");
  asteriskPass.className = "required-asterisk";
  asteriskPass.textContent = "*";
  labelPass.appendChild(asteriskPass);
  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.id = "register-password";
  inputPass.name = "password";
  inputPass.autocomplete = "new-password";
  inputPass.required = true;
  inputPass.placeholder = "*******";

  // Repeat Password
  const labelRepeat = document.createElement("label");
  labelRepeat.htmlFor = "register-repeat-password";
  labelRepeat.textContent = "Repeat Password";
  const asteriskRepeat = document.createElement("span");
  asteriskRepeat.className = "required-asterisk";
  asteriskRepeat.textContent = "*";
  labelRepeat.appendChild(asteriskRepeat);
  const inputRepeat = document.createElement("input");
  inputRepeat.type = "password";
  inputRepeat.id = "register-repeat-password";
  inputRepeat.name = "repeat-password";
  inputRepeat.autocomplete = "new-password";
  inputRepeat.required = true;
  inputRepeat.placeholder = "*******";

  // Checkboxes
  const checkboxTermsContainer = document.createElement("div");
  checkboxTermsContainer.className = "register-checkbox-container";
  const checkboxTerms = document.createElement("input");
  checkboxTerms.type = "checkbox";
  checkboxTerms.id = "register-terms";
  checkboxTerms.name = "terms";
  const labelTerms = document.createElement("label");
  labelTerms.htmlFor = "register-terms";
  labelTerms.textContent = "I accept the Terms & Conditions";
  checkboxTermsContainer.appendChild(checkboxTerms);
  checkboxTermsContainer.appendChild(labelTerms);

  const checkboxNewsletterContainer = document.createElement("div");
  checkboxNewsletterContainer.className = "register-checkbox-container";
  const checkboxNewsletter = document.createElement("input");
  checkboxNewsletter.type = "checkbox";
  checkboxNewsletter.id = "register-newsletter";
  checkboxNewsletter.name = "newsletter";
  const labelNewsletter = document.createElement("label");
  labelNewsletter.htmlFor = "register-newsletter";
  labelNewsletter.textContent = "Subscribe to the newsletter (optional)";
  checkboxNewsletterContainer.appendChild(checkboxNewsletter);
  checkboxNewsletterContainer.appendChild(labelNewsletter);

  // Button
  const btnCreate = document.createElement("button");
  btnCreate.type = "submit";
  btnCreate.className = "btn-large";
  btnCreate.textContent = "Create account";

  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.setAttribute("aria-live", "assertive");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    messageContainer.textContent = "";
    messageContainer.classList.remove("success", "error");
    if (checkboxTerms.checked) {
      checkboxTerms.style.outline = "";
      checkboxTerms.style.outlineOffset = "";
    }

    // -------------------------------------------------------------------Noroff API restrictions
    if (!/^\w+$/.test(inputUser.value)) {
      messageContainer.textContent =
        "Username can only contain letters, numbers, and underscores (_).";
      messageContainer.classList.add("error");
      return;
    }

    if (!/^([a-zA-Z0-9_.+-]+)@stud\.noroff\.no$/.test(inputEmail.value)) {
      messageContainer.textContent =
        "Email must be a valid NOROFF address ending with @stud.noroff.no (e.g., yourname@stud.noroff.no).";
      messageContainer.classList.add("error");
      inputEmail.focus();
      return;
    }

    if (inputPass.value.length < 8) {
      messageContainer.textContent = "Password must be at least 8 characters.";
      messageContainer.classList.add("error");
      return;
    }

    if (inputPass.value !== inputRepeat.value) {
      messageContainer.textContent = "Passwords do not match.";
      messageContainer.classList.add("error");
      return;
    }

    if (!checkboxTerms.checked) {
      messageContainer.textContent = "You must accept the Terms & Conditions.";
      messageContainer.classList.add("error");
      checkboxTerms.style.outline = "2px solid red";
      checkboxTerms.style.outlineOffset = "2px";
      checkboxTerms.focus();
      return;
    }

    const userData = {
      name: inputUser.value,
      email: inputEmail.value,
      password: inputPass.value,
    };

    try {
      btnCreate.disabled = true;
      btnCreate.textContent = "Creating account...";
      showLoader();
      await registerUser(userData);
      messageContainer.textContent =
        "Registration successful! Redirecting to login...";
      messageContainer.classList.add("success");
      setTimeout(() => {
        window.location.href = "/src/pages/log-in.html";
      }, 2000);
    } catch (error) {
      let msg = error && error.message ? error.message : "Registration failed.";
      if (error instanceof TypeError || !msg || msg === "Failed to fetch") {
        msg = "Network error. Please try again later.";
      }
      if (
        msg.toLowerCase().includes("already exists") ||
        msg.toLowerCase().includes("profile already exists")
      ) {
        msg =
          "That account already exists. Please log in or use a different email/username.";
      }
      messageContainer.textContent = msg;
      messageContainer.classList.add("error");
    } finally {
      btnCreate.disabled = false;
      btnCreate.textContent = "Create account";
      hideLoader();
    }
  });

  form.appendChild(labelEmail);
  form.appendChild(inputEmail);
  form.appendChild(labelUser);
  form.appendChild(inputUser);
  form.appendChild(labelPhone);
  form.appendChild(inputPhone);
  form.appendChild(labelPass);
  form.appendChild(inputPass);
  form.appendChild(labelRepeat);
  form.appendChild(inputRepeat);
  form.appendChild(checkboxTermsContainer);
  form.appendChild(checkboxNewsletterContainer);
  form.appendChild(btnCreate);
  form.appendChild(messageContainer);

  root.appendChild(welcomeSection);
  root.appendChild(h3);
  root.appendChild(form);
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
