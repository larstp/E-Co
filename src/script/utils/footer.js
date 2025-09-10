// Constants (to make stuff easier to reuse)

const FOOTER_NAV_ITEMS = [
  { text: "About us", href: "/src/pages/about.html" },
  { text: "Contact", href: "/src/pages/contact.html" },
  { text: "Return Policy", href: "#" },
  { text: "E.Co Partners", href: "#" },
];

const FOOTER_SOCIAL = [
  { name: "bluesky", href: "https://bsky.app" },
  { name: "mastodon", href: "https://mastodon.social/" },
  { name: "reddit", href: "https://reddit.com/" },
  { name: "stackexchange", href: "https://stackexchange.com/" },
];

const FOOTER_LEGAL = {
  privacy: { text: "Privacy Policy", href: "#" },
  copyright: "© 2025 E.CO inc.",
};

function createFooterNavItem({ text, href }, isDesktop = false) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = href;
  a.className = isDesktop ? "" : "footer-mobile__nav-link";
  if (isDesktop && href === "#")
    a.classList.add("footer-desktop__nav-link--no-link");
  const itemContainer = document.createElement(isDesktop ? "span" : "div");
  itemContainer.className = isDesktop ? "" : "footer-mobile__nav-item";
  if (!isDesktop && href === "#")
    itemContainer.classList.add("footer-mobile__nav-item--no-link");
  const label = document.createElement("span");
  label.textContent = text;
  const icon = document.createElement("img");
  icon.src = "/public/assets/icons/icons-svg/black/plus.svg";
  icon.alt = "Expand";
  if (isDesktop) icon.className = "footer-desktop__nav-icon";
  itemContainer.appendChild(label);
  itemContainer.appendChild(icon);
  a.appendChild(itemContainer);
  li.appendChild(a);
  return li;
}

function createFooterSocialIcon({ name, href }, isDesktop = false) {
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("aria-label", `Visit our ${name} page`);
  link.target = "_blank";
  link.rel = "noopener noreferrer"; // I have no idea if this works??
  const icon = document.createElement("img");
  icon.src = `/public/assets/icons/icons-svg/white/${name}.svg`;
  icon.alt = `${name} logo`;
  link.appendChild(icon);
  return link;
}

function createFooterLogo(tag = "h1") {
  const logo = document.createElement(tag);
  logo.className = "site-logo-text";
  logo.textContent = "E.CO";
  return logo;
}

// Builder Functions

function buildMobileFooter() {
  const mobileFooter = document.createElement("div");
  mobileFooter.className = "footer-mobile";

  // Upper part above the line thingy

  const upperPart = document.createElement("div");
  upperPart.className = "site-footer__upper";
  const navList = document.createElement("ul");
  navList.className = "footer-mobile__nav-list";
  FOOTER_NAV_ITEMS.forEach((item) =>
    navList.appendChild(createFooterNavItem(item))
  );
  upperPart.appendChild(navList);

  // Line thingy!

  const separator = document.createElement("hr");
  separator.className = "site-footer__separator";

  // Lower part below the line thingy

  const lowerPart = document.createElement("div");
  lowerPart.className = "site-footer__lower";
  const socialSection = document.createElement("div");
  socialSection.className = "footer-mobile__social-section";
  socialSection.appendChild(createFooterLogo("h1"));
  const socialIcons = document.createElement("div");
  socialIcons.className = "footer-mobile__social-icons";
  FOOTER_SOCIAL.forEach((data) =>
    socialIcons.appendChild(createFooterSocialIcon(data))
  );
  socialSection.appendChild(socialIcons);
  const legalSection = document.createElement("div");
  legalSection.className = "footer-mobile__legal-section";
  const privacyLink = document.createElement("a");
  privacyLink.href = FOOTER_LEGAL.privacy.href;
  privacyLink.textContent = FOOTER_LEGAL.privacy.text;
  privacyLink.className = "footer-mobile__legal-link";
  const copyright = document.createElement("span");
  copyright.textContent = FOOTER_LEGAL.copyright;
  legalSection.appendChild(privacyLink);
  legalSection.appendChild(copyright);
  lowerPart.appendChild(socialSection);
  lowerPart.appendChild(legalSection);
  mobileFooter.appendChild(upperPart);
  mobileFooter.appendChild(separator);
  mobileFooter.appendChild(lowerPart);
  return mobileFooter;
}

function buildDesktopFooter() {
  const desktopFooter = document.createElement("div");
  desktopFooter.className = "footer-desktop";
  const desktopUpper = document.createElement("div");
  desktopUpper.className = "site-footer__upper";

  // Left: Nav elements

  const desktopNav = document.createElement("nav");
  desktopNav.className = "footer-desktop__nav";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className = "footer-desktop__nav-list";
  FOOTER_NAV_ITEMS.forEach((item) =>
    desktopNavList.appendChild(createFooterNavItem(item, true))
  );
  desktopNav.appendChild(desktopNavList);

  // Center: img Logo ------------------------------------------------------(CHANGE THIS?)

  const desktopCenter = document.createElement("div");
  desktopCenter.className = "footer-desktop__center";
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = "/public/assets/img/logo/logo.webp";
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "footer-desktop__logo-img";
  desktopCenter.appendChild(desktopLogoImg);

  // Right: Text Logo + Socials

  const desktopRight = document.createElement("div");
  desktopRight.className = "footer-desktop__right";
  desktopRight.appendChild(createFooterLogo("h1"));
  const desktopSocialIcons = document.createElement("div");
  desktopSocialIcons.className = "footer-desktop__social-icons";
  FOOTER_SOCIAL.forEach((data) =>
    desktopSocialIcons.appendChild(createFooterSocialIcon(data, true))
  );
  desktopRight.appendChild(desktopSocialIcons);
  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopCenter);
  desktopUpper.appendChild(desktopRight);

  // Line thingy again!

  const desktopSeparator = document.createElement("hr");
  desktopSeparator.className = "site-footer__separator";

  // Lower part below the line thingy

  const desktopLower = document.createElement("div");
  desktopLower.className = "site-footer__lower";
  const desktopLegal = document.createElement("div");
  desktopLegal.className = "footer-desktop__legal-section";
  const desktopPrivacyLink = document.createElement("a");
  desktopPrivacyLink.href = FOOTER_LEGAL.privacy.href;
  desktopPrivacyLink.textContent = FOOTER_LEGAL.privacy.text;
  desktopPrivacyLink.className = "footer-desktop__legal-link";
  const desktopCopyright = document.createElement("span");
  desktopCopyright.textContent = FOOTER_LEGAL.copyright;
  desktopLegal.appendChild(desktopPrivacyLink);
  desktopLegal.appendChild(desktopCopyright);
  desktopLower.appendChild(desktopLegal);
  desktopFooter.appendChild(desktopUpper);
  desktopFooter.appendChild(desktopSeparator);
  desktopFooter.appendChild(desktopLower);
  return desktopFooter;
}

export function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.appendChild(buildMobileFooter());
  footer.appendChild(buildDesktopFooter());
  return footer;
}
