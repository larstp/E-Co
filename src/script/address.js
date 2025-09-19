document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;

  // Outer flex container for desktop layout
  const flexContainer = document.createElement("div");
  flexContainer.className = "address-flex-container";

  // Address form section
  const container = document.createElement("section");

  // Heading
  const h1 = document.createElement("h1");
  h1.textContent = "Create a new address";
  container.appendChild(h1);

  // Form
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

  // Button
  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.className = "btn-large";
  btnSave.textContent = "Save address";

  // Form append
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

  // Spacer
  const spacer = document.createElement("div");
  spacer.style.height = "32px";
  form.appendChild(spacer);
  form.appendChild(btnSave);

  container.appendChild(form);
  flexContainer.appendChild(container);

  // Google Maps embed (desktop only)
  const mapWrapper = document.createElement("div");
  mapWrapper.className = "address-map-wrapper";
  // Map markup
  mapWrapper.innerHTML = `
    <gmp-map center="59.9139,10.7522" zoom="12" map-id="DEMO_MAP_ID" style="width: 350px; height: 400px; border-radius: 18px;" loading="async">
      <gmp-advanced-marker position="59.9139,10.7522" title="Oslo"></gmp-advanced-marker>
    </gmp-map>
  `;
  flexContainer.appendChild(mapWrapper);

  main.appendChild(flexContainer);

  // Add Google Maps API script
  if (!document.getElementById("google-maps-api")) {
    const script = document.createElement("script");
    script.id = "google-maps-api";
    script.async = true;
    script.setAttribute("loading", "async");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJjm1cj6il__JSEZEsPNvop2a0VZ77YIc&callback=console.debug&libraries=maps,marker&v=beta";
    document.head.appendChild(script);
  }
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
