const IS_ROOT_PAGE =
  window.location.pathname.endsWith("/index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === "/E-Co/" ||
  window.location.pathname.endsWith("/E-Co/index.html");

function getFooterPath(target) {
  if (IS_ROOT_PAGE) {
    return `./${target}`;
  } else {
    if (target.startsWith("src/pages/")) {
      return target.replace("src/pages/", "");
    }
    return `../../${target}`;
  }
}

// Constants (to make stuff easier to reuse)

const FOOTER_NAV_ITEMS = [
  { text: "About us", href: getFooterPath("src/pages/about.html") },
  { text: "Contact", href: getFooterPath("src/pages/contact.html") },
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
  a.className = isDesktop ? "" : "no-underline text-inherit block";
  if (isDesktop && href === "#") a.classList.add("cursor-pointer");
  const itemContainer = document.createElement(isDesktop ? "span" : "div");
  itemContainer.className = isDesktop
    ? ""
    : "flex justify-between items-center text-base [&>img]:brightness-0 [&>img]:invert";
  if (!isDesktop && href === "#") itemContainer.classList.add("cursor-pointer");
  const label = document.createElement("span");
  label.textContent = text;
  const icon = document.createElement("img");
  icon.src = getFooterPath("public/assets/icons/icons-svg/black/plus.svg");
  icon.alt = "Expand";
  if (isDesktop) icon.className = "brightness-0 invert w-4 h-4";
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
  icon.src = getFooterPath(`public/assets/icons/icons-svg/white/${name}.svg`);
  icon.alt = `${name} logo`;
  link.appendChild(icon);
  return link;
}

function createFooterLogo(tag = "h1") {
  const logo = document.createElement(tag);
  logo.className =
    "font-bebas text-[2.2rem] text-white leading-none font-normal no-underline";
  logo.textContent = "E.CO";
  return logo;
}

// Builder Functions

function buildMobileFooter() {
  const mobileFooter = document.createElement("div");
  mobileFooter.className = "lg:hidden";

  // Upper part above the line thingy

  const upperPart = document.createElement("div");
  upperPart.className = "w-full max-w-[340px]";
  const navList = document.createElement("ul");
  navList.className = "list-none p-0 m-0 [&_li]:list-none";
  FOOTER_NAV_ITEMS.forEach((item) =>
    navList.appendChild(createFooterNavItem(item)),
  );
  upperPart.appendChild(navList);

  // Line thingy!

  const separator = document.createElement("hr");
  separator.className =
    "border-none h-px bg-white/30 w-full max-w-[340px] my-4";

  // Lower part below the line thingy

  const lowerPart = document.createElement("div");
  lowerPart.className =
    "w-full max-w-[340px] flex flex-col items-center text-center";
  const socialSection = document.createElement("div");
  socialSection.className =
    "flex flex-row items-center gap-4 w-full justify-between";
  socialSection.appendChild(createFooterLogo("h1"));
  const socialIcons = document.createElement("div");
  socialIcons.className = "flex gap-4 [&_a]:block [&_img]:w-6 [&_img]:h-6";
  FOOTER_SOCIAL.forEach((data) =>
    socialIcons.appendChild(createFooterSocialIcon(data)),
  );
  socialSection.appendChild(socialIcons);
  const legalSection = document.createElement("div");
  legalSection.className =
    "flex flex-row items-center gap-[90px] mt-6 text-sm justify-between";
  const privacyLink = document.createElement("a");
  privacyLink.href = FOOTER_LEGAL.privacy.href;
  privacyLink.textContent = FOOTER_LEGAL.privacy.text;
  privacyLink.className = "cursor-pointer no-underline text-white";
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
  desktopFooter.className =
    "hidden lg:flex lg:w-full lg:flex-col lg:items-center";
  const desktopUpper = document.createElement("div");
  desktopUpper.className =
    "flex justify-between items-center w-full max-w-[1200px] py-10";

  // Left: Nav elements

  const desktopNav = document.createElement("nav");
  desktopNav.className = "";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className =
    "list-none p-0 m-0 [&_a]:text-white [&_a]:no-underline [&_a]:text-base [&_a]:leading-8 [&_a]:flex [&_a]:items-center [&_a]:justify-between [&_a]:gap-4";
  FOOTER_NAV_ITEMS.forEach((item) =>
    desktopNavList.appendChild(createFooterNavItem(item, true)),
  );
  desktopNav.appendChild(desktopNavList);

  // Center: img Logo ------------------------------------------------------(CHANGE THIS?)

  const desktopCenter = document.createElement("div");
  desktopCenter.className = "text-center";
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = getFooterPath("public/assets/img/logo/logo.webp");
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "w-[100px] h-[100px] brightness-0 invert";
  desktopCenter.appendChild(desktopLogoImg);

  // Right: Text Logo + Socials

  const desktopRight = document.createElement("div");
  desktopRight.className = "flex flex-col items-end gap-4";
  desktopRight.appendChild(createFooterLogo("h1"));
  const desktopSocialIcons = document.createElement("div");
  desktopSocialIcons.className = "flex gap-4 [&_img]:w-6 [&_img]:h-6";
  FOOTER_SOCIAL.forEach((data) =>
    desktopSocialIcons.appendChild(createFooterSocialIcon(data, true)),
  );
  desktopRight.appendChild(desktopSocialIcons);
  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopCenter);
  desktopUpper.appendChild(desktopRight);

  // Line thingy again!

  const desktopSeparator = document.createElement("hr");
  desktopSeparator.className =
    "border-none h-px bg-white/30 w-full max-w-[1200px] my-4";

  // Lower part below the line thingy

  const desktopLower = document.createElement("div");
  desktopLower.className = "w-full max-w-[1200px] py-6";
  const desktopLegal = document.createElement("div");
  desktopLegal.className = "flex justify-around w-full text-sm";
  const desktopPrivacyLink = document.createElement("a");
  desktopPrivacyLink.href = FOOTER_LEGAL.privacy.href;
  desktopPrivacyLink.textContent = FOOTER_LEGAL.privacy.text;
  desktopPrivacyLink.className = "cursor-pointer no-underline text-white";
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
  footer.className =
    "bg-brand-blue text-white flex flex-col items-center p-6 font-roboto mt-auto";
  footer.appendChild(buildMobileFooter());
  footer.appendChild(buildDesktopFooter());
  return footer;
}
