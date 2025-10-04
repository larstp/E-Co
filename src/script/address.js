import { displayMessage } from "./utils/displayMessage.js";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;

  const flexContainer = document.createElement("div");
  flexContainer.className = "address-flex-container";

  // Address form section
  const container = document.createElement("section");

  // Heading
  const h1 = document.createElement("h1");
  h1.textContent = "Create a new address";
  container.appendChild(h1);

  // Form -------------------------------- (Double check when NOROFF API webpage wants to feckin open!)
  const form = document.createElement("form");
  form.className = "form address-form";
  form.autocomplete = "on";

  // Name*
  const labelName = document.createElement("label");
  labelName.htmlFor = "address-name";
  labelName.textContent = "Name";
  const asteriskName = document.createElement("span");
  asteriskName.className = "required-asterisk";
  asteriskName.textContent = "*";
  labelName.appendChild(asteriskName);
  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.id = "address-name";
  inputName.name = "name";
  inputName.required = true;
  inputName.placeholder = "Full Name";

  // Street*
  const labelStreet = document.createElement("label");
  labelStreet.htmlFor = "address-street";
  labelStreet.textContent = "Street";
  const asteriskStreet = document.createElement("span");
  asteriskStreet.className = "required-asterisk";
  asteriskStreet.textContent = "*";
  labelStreet.appendChild(asteriskStreet);
  const inputStreet = document.createElement("input");
  inputStreet.type = "text";
  inputStreet.id = "address-street";
  inputStreet.name = "street";
  inputStreet.required = true;
  inputStreet.placeholder = "Street Address";

  // Apt.
  const labelApt = document.createElement("label");
  labelApt.htmlFor = "address-apt";
  labelApt.textContent = "Apt.";
  const inputApt = document.createElement("input");
  inputApt.type = "text";
  inputApt.id = "address-apt";
  inputApt.name = "apt";
  inputApt.placeholder = "Apartment, suite, etc. (optional)";

  // Postal Code*
  const labelPostal = document.createElement("label");
  labelPostal.htmlFor = "address-postal";
  labelPostal.textContent = "Postal Code";
  const asteriskPostal = document.createElement("span");
  asteriskPostal.className = "required-asterisk";
  asteriskPostal.textContent = "*";
  labelPostal.appendChild(asteriskPostal);
  const inputPostal = document.createElement("input");
  inputPostal.type = "text";
  inputPostal.id = "address-postal";
  inputPostal.name = "postal";
  inputPostal.required = true;
  inputPostal.placeholder = "1234";

  // City*
  const labelCity = document.createElement("label");
  labelCity.htmlFor = "address-city";
  labelCity.textContent = "City";
  const asteriskCity = document.createElement("span");
  asteriskCity.className = "required-asterisk";
  asteriskCity.textContent = "*";
  labelCity.appendChild(asteriskCity);
  const inputCity = document.createElement("input");
  inputCity.type = "text";
  inputCity.id = "address-city";
  inputCity.name = "city";
  inputCity.required = true;
  inputCity.placeholder = "City";

  // Country*
  const labelCountry = document.createElement("label");
  labelCountry.htmlFor = "address-country";
  labelCountry.textContent = "Country";
  const asteriskCountry = document.createElement("span");
  asteriskCountry.className = "required-asterisk";
  asteriskCountry.textContent = "*";
  labelCountry.appendChild(asteriskCountry);
  const inputCountry = document.createElement("input");
  inputCountry.type = "text";
  inputCountry.id = "address-country";
  inputCountry.name = "country";
  inputCountry.required = true;
  inputCountry.placeholder = "Country";

  //  error message container
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.setAttribute("aria-live", "polite");

  // Button
  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.className = "btn-large";
  btnSave.textContent = "Save address";

  form.appendChild(labelName);
  form.appendChild(inputName);
  form.appendChild(labelStreet);
  form.appendChild(inputStreet);
  form.appendChild(labelApt);
  form.appendChild(inputApt);
  form.appendChild(labelPostal);
  form.appendChild(inputPostal);
  form.appendChild(labelCity);
  form.appendChild(inputCity);
  form.appendChild(labelCountry);
  form.appendChild(inputCountry);

  // Spacer for layout
  const spacer = document.createElement("div");
  spacer.style.height = "32px";
  form.appendChild(spacer);
  form.appendChild(btnSave);
  form.appendChild(messageContainer);

  //  validation and feedback ----------------------- now less angry hihi
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputName.value.trim()) {
      displayMessage(".message-container", "Name is required.", "error");
      inputName.focus();
      return;
    }
    if (!inputStreet.value.trim()) {
      displayMessage(".message-container", "Street is required.", "error");
      inputStreet.focus();
      return;
    }
    if (!inputPostal.value.trim()) {
      displayMessage(".message-container", "Postal code is required.", "error");
      inputPostal.focus();
      return;
    }
    if (!inputCity.value.trim()) {
      displayMessage(".message-container", "City is required.", "error");
      inputCity.focus();
      return;
    }
    if (!inputCountry.value.trim()) {
      displayMessage(".message-container", "Country is required.", "error");
      inputCountry.focus();
      return;
    }
    displayMessage(
      ".message-container",
      "Address saved! (This is a mockup just so you know ;) )",
      "success"
    );
  });

  container.appendChild(form);
  flexContainer.appendChild(container);

  const mapWrapper = document.createElement("div");
  mapWrapper.className = "address-map-wrapper";
  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7992.512448471522!2d10.756177007904084!3d59.94660872660287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e1a46dfd989%3A0x7232661852a89a8b!2sNydalsveien%2016%2C%200484%20Oslo!5e0!3m2!1sen!2sno!4v1739882828838!5m2!1sen!2sno";
  iframe.width = "390";
  iframe.height = "390";
  iframe.style.border = "0";
  iframe.style.borderRadius = "25px";
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  mapWrapper.appendChild(iframe);
  flexContainer.appendChild(mapWrapper);
  main.appendChild(flexContainer);
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
