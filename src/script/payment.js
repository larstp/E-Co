document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("payment-container");
  if (!root) return;

  // Heading
  const h1 = document.createElement("h1");
  h1.textContent = "Add new payment method";
  root.appendChild(h1);

  const paymentOptions = [
    {
      id: "card",
      label: "Card",
      icons: [
        "../../public/assets/icons/icons-svg/payment/visa.svg",
        "../../public/assets/icons/icons-svg/payment/mastercard.svg",
      ],
      form: () => {
        const container = document.createElement("div");
        container.className = "payment-form-fields";

        // Card number

        const labelNum = document.createElement("label");
        labelNum.htmlFor = "card-number";
        labelNum.textContent = "Card Number";
        const inputNum = document.createElement("input");
        inputNum.type = "text";
        inputNum.id = "card-number";
        inputNum.name = "card-number";
        inputNum.placeholder = "1234 5678 9012 3456";
        inputNum.required = true;

        // Name on card

        const labelName = document.createElement("label");
        labelName.htmlFor = "card-name";
        labelName.textContent = "Name on Card";
        const inputName = document.createElement("input");
        inputName.type = "text";
        inputName.id = "card-name";
        inputName.name = "card-name";
        inputName.placeholder = "John Doe";
        inputName.required = true;

        // Expieieyiery

        const labelExp = document.createElement("label");
        labelExp.htmlFor = "card-expiry";
        labelExp.textContent = "Expiry Date";
        const inputExp = document.createElement("input");
        inputExp.type = "text";
        inputExp.id = "card-expiry";
        inputExp.name = "card-expiry";
        inputExp.placeholder = "MM/YY";
        inputExp.required = true;

        // CVC (sec code)

        const labelCvc = document.createElement("label");
        labelCvc.htmlFor = "card-cvc";
        labelCvc.textContent = "CVC";
        const inputCvc = document.createElement("input");
        inputCvc.type = "text";
        inputCvc.id = "card-cvc";
        inputCvc.name = "card-cvc";
        inputCvc.placeholder = "123";
        inputCvc.required = true;
        container.append(
          labelNum,
          inputNum,
          labelName,
          inputName,
          labelExp,
          inputExp,
          labelCvc,
          inputCvc
        );
        return container;
      },
    },
    {
      id: "klarna",
      label: "Klarna",
      icons: ["../../public/assets/icons/icons-svg/payment/klarna.svg"],
      form: () => {
        const container = document.createElement("div");
        container.className = "payment-form-fields";
        const labelEmail = document.createElement("label");
        labelEmail.htmlFor = "klarna-email";
        labelEmail.textContent = "Klarna E-Mail";
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.id = "klarna-email";
        inputEmail.name = "klarna-email";
        inputEmail.placeholder = "user@email.com";
        inputEmail.required = true;
        container.append(labelEmail, inputEmail);
        return container;
      },
    },
    {
      id: "paypal",
      label: "PayPal",
      icons: ["../../public/assets/icons/icons-svg/payment/paypal.svg"],
      form: () => {
        const container = document.createElement("div");
        container.className = "payment-form-fields";
        const labelEmail = document.createElement("label");
        labelEmail.htmlFor = "paypal-email";
        labelEmail.textContent = "PayPal E-Mail";
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.id = "paypal-email";
        inputEmail.name = "paypal-email";
        inputEmail.placeholder = "user@email.com";
        inputEmail.required = true;
        container.append(labelEmail, inputEmail);
        return container;
      },
    },
    {
      id: "vipps",
      label: "Vipps",
      icons: ["../../public/assets/icons/icons-svg/payment/vipps.svg"],
      form: () => {
        const container = document.createElement("div");
        container.className = "payment-form-fields";
        const labelPhone = document.createElement("label");
        labelPhone.htmlFor = "vipps-phone";
        labelPhone.textContent = "Vipps Phone Number";
        const inputPhone = document.createElement("input");
        inputPhone.type = "text";
        inputPhone.id = "vipps-phone";
        inputPhone.name = "vipps-phone";
        inputPhone.placeholder = "+47 123 45 678";
        inputPhone.required = true;
        container.append(labelPhone, inputPhone);
        return container;
      },
    },
  ];

  // Payment options list
  const optionsList = document.createElement("ul");
  optionsList.className = "payment-options-list";

  let openFormIndex = null;

  paymentOptions.forEach((option, idx) => {
    const li = document.createElement("li");
    li.className = "payment-option-item";

    const row = document.createElement("div");
    row.className = "payment-option-row";
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.width = "100%";

    // Checkbox (acts as toggle hopefully)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `payment-${option.id}`;
    checkbox.className = "payment-radio";

    // Label
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.className = "payment-label";
    label.textContent = option.label;

    // Icons
    option.icons.forEach((iconSrc) => {
      const icon = document.createElement("img");
      icon.src = iconSrc;
      icon.alt = `${option.label} icon`;
      icon.className = "payment-icon";
      label.appendChild(icon);
    });

    row.appendChild(checkbox);
    row.appendChild(label);
    li.appendChild(row);

    // Form container (SHOULD be hidden if I can MAKE THIS WORK AAH)
    const formContainer = document.createElement("div");
    formContainer.className = "payment-form-container";
    formContainer.style.display = "none";
    li.appendChild(formContainer);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        optionsList.querySelectorAll(".payment-radio").forEach((el, i) => {
          if (el !== checkbox) {
            el.checked = false;
            const fc = optionsList.querySelectorAll(".payment-form-container")[
              i
            ];
            fc.style.display = "none";
            if (fc.firstChild) fc.removeChild(fc.firstChild);
          }
        });
        formContainer.style.display = "block";
        formContainer.appendChild(option.form());
      } else {
        formContainer.style.display = "none";
        if (formContainer.firstChild)
          formContainer.removeChild(formContainer.firstChild);
      }
    });

    optionsList.appendChild(li);
  });

  root.appendChild(optionsList);

  // Save button
  const btnSave = document.createElement("button");
  btnSave.type = "button";
  btnSave.className = "btn-large";
  btnSave.textContent = "Save Payment Method";
  btnSave.addEventListener("click", () => {
    window.history.back();
  });
  root.appendChild(btnSave);

  // This section is a mockup of how it would be if the user had saved different payment methods. Its pulling from the JSON file in /components

  fetch("../components/payment-options.json")
    .then((res) => res.json())
    .then((options) => {
      const savedSection = document.createElement("section");
      savedSection.className = "saved-payment-section";
      savedSection.style.display = "none";
      const h2 = document.createElement("h2");
      h2.textContent = "Saved payment options";
      h2.className = "section-heading";
      savedSection.appendChild(h2);
      options.forEach((opt) => {
        const container = document.createElement("div");
        container.className = "saved-payment-container";
        const titleRow = document.createElement("div");
        titleRow.className = "saved-payment-title-row";
        const icon = document.createElement("img");
        icon.src = opt.icon;
        icon.alt = `${opt.type} icon`;
        icon.className = "saved-payment-icon";
        const title = document.createElement("p");
        title.className = "saved-payment-title";
        title.textContent = opt.type;
        const spacer = document.createElement("span");
        spacer.className = "spacer";
        const editIcon = document.createElement("img");
        editIcon.src = "../../public/assets/icons/icons-svg/black/edit.svg";
        editIcon.alt = "Edit";
        editIcon.className = "saved-payment-action-icon";
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "../../public/assets/icons/icons-svg/black/trash.svg";
        deleteIcon.alt = "Delete";
        deleteIcon.className = "saved-payment-action-icon";
        titleRow.appendChild(icon);
        titleRow.appendChild(title);
        titleRow.appendChild(spacer);
        titleRow.appendChild(editIcon);
        titleRow.appendChild(deleteIcon);
        container.appendChild(titleRow);
        Object.entries(opt.info).forEach(([key, value]) => {
          const infoRow = document.createElement("p");
          infoRow.className = "saved-payment-info";
          infoRow.textContent = `${key}: ${value}`;
          container.appendChild(infoRow);
        });
        savedSection.appendChild(container);
      });

      function handleDesktopSection() {
        if (window.matchMedia("(min-width: 900px)").matches) {
          savedSection.style.display = "block";
          let wrapper = document.getElementById("payment-flex-wrapper");
          if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.id = "payment-flex-wrapper";
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "row";
            wrapper.style.gap = "2.5rem";
            root.parentNode.insertBefore(wrapper, root);
            wrapper.appendChild(root);
          }
          if (!wrapper.contains(savedSection)) {
            wrapper.appendChild(savedSection);
          }
        } else {
          savedSection.style.display = "none";
        }
      }
      handleDesktopSection();
      window.addEventListener("resize", handleDesktopSection);
    });
});

import("../script/utils/footer.js").then((mod) => {
  const footer = mod.buildFooter();
  document.body.appendChild(footer);
});
