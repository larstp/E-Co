document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.className = "site-footer";

  // --- Mobile Footer ---
  const mobileFooter = document.createElement("div");
  mobileFooter.className = "footer-mobile";

  const upperPart = document.createElement("div");
  upperPart.className = "site-footer__upper";

  const navList = document.createElement("ul");
  navList.className = "footer-mobile__nav-list";

  const navItems = [
    { text: "About us", href: "/src/pages/about.html" },
    { text: "Contact", href: "/src/pages/contact.html" },
    { text: "Return Policy", href: "#" },
    { text: "E.Co Partners", href: "#" },
  ];

  navItems.forEach((itemData) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = itemData.href;
    link.className = "footer-mobile__nav-link";

    const itemContainer = document.createElement("div");
    itemContainer.className = "footer-mobile__nav-item";

    if (itemData.href === "#") {
      itemContainer.classList.add("footer-mobile__nav-item--no-link");
    }

    const text = document.createElement("span");
    text.textContent = itemData.text;

    const icon = document.createElement("img");
    icon.src = "/public/assets/icons/icons-svg/black/plus.svg";
    icon.alt = "Expand";

    itemContainer.appendChild(text);
    itemContainer.appendChild(icon);
    link.appendChild(itemContainer);
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  upperPart.appendChild(navList);

  const separator = document.createElement("hr");
  separator.className = "site-footer__separator";

  const lowerPart = document.createElement("div");
  lowerPart.className = "site-footer__lower";

  const socialSection = document.createElement("div");
  socialSection.className = "footer-mobile__social-section";

  const logo = document.createElement("h1");
  logo.className = "site-footer__logo";
  logo.textContent = "E.CO";

  const socialIcons = document.createElement("div");
  socialIcons.className = "footer-mobile__social-icons";

  const socialIconData = [
    { name: "bluesky", href: "https://bsky.app" },
    { name: "mastodon", href: "https://mastodon.social/" },
    { name: "reddit", href: "https://reddit.com/" },
    { name: "stackexchange", href: "https://stackexchange.com/" },
  ];

  socialIconData.forEach((data) => {
    const link = document.createElement("a");
    link.href = data.href;
    link.setAttribute("aria-label", `Visit our ${data.name} page`);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    const icon = document.createElement("img");
    icon.src = `/public/assets/icons/icons-svg/white/${data.name}.svg`;
    icon.alt = `${data.name} logo`;
    link.appendChild(icon);
    socialIcons.appendChild(link);
  });

  socialSection.appendChild(logo);
  socialSection.appendChild(socialIcons);

  const legalSection = document.createElement("div");
  legalSection.className = "footer-mobile__legal-section";

  const privacyLink = document.createElement("a");
  privacyLink.href = "#";
  privacyLink.textContent = "Privacy Policy";
  privacyLink.className = "footer-mobile__legal-link";

  const copyright = document.createElement("span");
  copyright.textContent = "© 2025 E.CO inc.";

  legalSection.appendChild(privacyLink);
  legalSection.appendChild(copyright);

  lowerPart.appendChild(socialSection);
  lowerPart.appendChild(legalSection);

  mobileFooter.appendChild(upperPart);
  mobileFooter.appendChild(separator);
  mobileFooter.appendChild(lowerPart);
  footer.appendChild(mobileFooter);

  // --- Desktop Footer ---
  const desktopFooter = document.createElement("div");
  desktopFooter.className = "footer-desktop";

  const desktopUpper = document.createElement("div");
  desktopUpper.className = "site-footer__upper";

  // Left
  const desktopNav = document.createElement("nav");
  desktopNav.className = "footer-desktop__nav";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className = "footer-desktop__nav-list";
  navItems.forEach((itemData) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = itemData.href;

    const text = document.createElement("span");
    text.textContent = itemData.text;

    const icon = document.createElement("img");
    icon.src = "/public/assets/icons/icons-svg/black/plus.svg";
    icon.alt = "Expand";
    icon.className = "footer-desktop__nav-icon";

    a.appendChild(text);
    a.appendChild(icon);

    if (itemData.href === "#") {
      a.classList.add("footer-desktop__nav-link--no-link");
    }
    li.appendChild(a);
    desktopNavList.appendChild(li);
  });
  desktopNav.appendChild(desktopNavList);

  // Center
  const desktopCenter = document.createElement("div");
  desktopCenter.className = "footer-desktop__center";
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = "/public/assets/img/logo/logo.webp";
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "footer-desktop__logo-img";
  desktopCenter.appendChild(desktopLogoImg);

  // Right
  const desktopRight = document.createElement("div");
  desktopRight.className = "footer-desktop__right";
  const desktopLogoText = document.createElement("h1");
  desktopLogoText.className = "site-footer__logo";
  desktopLogoText.textContent = "E.CO";
  const desktopSocialIcons = document.createElement("div");
  desktopSocialIcons.className = "footer-desktop__social-icons";
  socialIconData.forEach((data) => {
    const link = document.createElement("a");
    link.href = data.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer"; // I cant believe this worked
    link.setAttribute("aria-label", `Visit our ${data.name} page`);
    const icon = document.createElement("img");
    icon.src = `/public/assets/icons/icons-svg/white/${data.name}.svg`;
    icon.alt = `${data.name} logo`;
    link.appendChild(icon);
    desktopSocialIcons.appendChild(link);
  });
  desktopRight.appendChild(desktopLogoText);
  desktopRight.appendChild(desktopSocialIcons);

  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopCenter);
  desktopUpper.appendChild(desktopRight);

  const desktopSeparator = document.createElement("hr");
  desktopSeparator.className = "site-footer__separator";

  const desktopLower = document.createElement("div");
  desktopLower.className = "site-footer__lower";
  const desktopLegal = document.createElement("div");
  desktopLegal.className = "footer-desktop__legal-section";
  const desktopPrivacyLink = document.createElement("a");
  desktopPrivacyLink.href = "#";
  desktopPrivacyLink.textContent = "Privacy Policy";
  desktopPrivacyLink.className = "footer-desktop__legal-link";
  const desktopCopyright = document.createElement("span");
  desktopCopyright.textContent = "© 2025 E.CO inc.";
  desktopLegal.appendChild(desktopPrivacyLink);
  desktopLegal.appendChild(desktopCopyright);
  desktopLower.appendChild(desktopLegal);

  desktopFooter.appendChild(desktopUpper);
  desktopFooter.appendChild(desktopSeparator);
  desktopFooter.appendChild(desktopLower);
  footer.appendChild(desktopFooter);

  document.body.appendChild(footer);
});
