document.addEventListener("DOMContentLoaded", () => {
  const main = document.createElement("main");
  main.className = "contact-main";

  const left = document.createElement("div");
  left.className = "contact-left";
  const formSection = document.createElement("section");
  formSection.className = "contact-form-section";

  const h1 = document.createElement("h1");
  h1.textContent = "Contact Us";
  formSection.appendChild(h1);

  const form = document.createElement("form");
  form.className = "contact-form";

  const labelEmail = document.createElement("label");
  labelEmail.htmlFor = "contact-email";
  labelEmail.textContent = "Email";
  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "contact-email";
  inputEmail.name = "email";
  inputEmail.required = true;
  inputEmail.placeholder = "Your email address";

  const labelSubject = document.createElement("label");
  labelSubject.htmlFor = "contact-subject";
  labelSubject.textContent = "Subject";
  const inputSubject = document.createElement("input");
  inputSubject.type = "text";
  inputSubject.id = "contact-subject";
  inputSubject.name = "subject";
  inputSubject.required = true;
  inputSubject.placeholder = "Subject";

  const labelMessage = document.createElement("label");
  labelMessage.htmlFor = "contact-message";
  labelMessage.textContent = "Message";
  const textareaMessage = document.createElement("textarea");
  textareaMessage.id = "contact-message";
  textareaMessage.name = "message";
  textareaMessage.required = true;
  textareaMessage.placeholder = "Type your message here...";
  textareaMessage.rows = 6;

  const btnSend = document.createElement("button");
  btnSend.type = "submit";
  btnSend.className = "btn-large";
  btnSend.textContent = "Send Message";

  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.setAttribute("aria-live", "polite");

  form.appendChild(labelEmail);
  form.appendChild(inputEmail);
  form.appendChild(labelSubject);
  form.appendChild(inputSubject);
  form.appendChild(labelMessage);
  form.appendChild(textareaMessage);
  form.appendChild(btnSend);
  form.appendChild(messageContainer);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageContainer.textContent = "";
    messageContainer.classList.remove("error", "success");
    if (!inputEmail.value.trim()) {
      messageContainer.textContent = "Email is required.";
      messageContainer.classList.add("error");
      inputEmail.focus();
      return;
    }
    if (!inputSubject.value.trim()) {
      messageContainer.textContent = "Subject is required.";
      messageContainer.classList.add("error");
      inputSubject.focus();
      return;
    }
    if (!textareaMessage.value.trim()) {
      messageContainer.textContent = "Message is required.";
      messageContainer.classList.add("error");
      textareaMessage.focus();
      return;
    }
    messageContainer.textContent =
      "Message sent! (This is a mockup, no message will be delivered.)";
    messageContainer.classList.add("success");
    form.reset();
  });

  formSection.appendChild(form);
  left.appendChild(formSection);

  const right = document.createElement("div");
  right.className = "contact-right";
  const infoSection = document.createElement("section");
  infoSection.className = "contact-info-section";
  const infoH2 = document.createElement("h2");
  infoH2.textContent = "We're here to help!";
  const infoP = document.createElement("p");
  infoP.textContent =
    "Feel free to contact us for any questions, feedback, or support. Our team is always happy to assist you with your orders, account, or anything else related to E.CO. Just fill out the form and we'll get back to you as soon as possible.";
  infoSection.appendChild(infoH2);
  infoSection.appendChild(infoP);
  right.appendChild(infoSection);

  main.appendChild(left);
  main.appendChild(right);
  const nav = document.querySelector("nav.breadcrumb");
  if (nav && nav.nextSibling) {
    nav.parentNode.insertBefore(main, nav.nextSibling);
  } else {
    document.body.append(main);
  }
  import("./utils/footer.js").then((mod) => {
    const footer = mod.buildFooter();
    document.body.append(footer);
  });
});
