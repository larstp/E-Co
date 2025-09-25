import { isLoggedIn } from "./user.js";
import { getCartCount, updateCartBadges } from "./cartCounter.js";

// Note: I'm using caps to differentiate a bit because my brain gets fried by this...
// Data Constants (No idea if this is a good way to do it. Internet seems to think so)

const IS_INDEX_PAGE = window.location.pathname.endsWith("index.html");
const IS_LOGGED_IN = isLoggedIn();

const MOBILE_UPPER_LINKS = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: "/src/pages/wishlist.html",
          icon: "/public/assets/icons/icons-svg/black/line-heart.svg",
          alt: "Wishlist",
          aria: "View wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN ? "/src/pages/user.html" : "/src/pages/log-in.html",
    icon: "/public/assets/icons/icons-svg/black/line-user.svg",
    alt: "User Account",
    aria: "User account",
  },
  {
    href: "/src/pages/cart.html",
    icon: "/public/assets/icons/icons-svg/black/line-cart.svg",
    alt: "Cart",
    aria: "View cart",
  },
];

const MOBILE_NAV_UPPER = [
  {
    href: "/index.html",
    icon: "/public/assets/icons/icons-svg/black/line-home.svg",
    text: "Home",
  },
  {
    href: "/src/pages/storefront.html",
    icon: "/public/assets/icons/icons-svg/black/line-shopping.svg",
    text: "Shop",
  },
  {
    href: "/src/pages/storefront.html?sale=true",
    icon: "/public/assets/icons/icons-svg/black/line-sale.svg",
    text: "Sale",
  },
  {
    href: "/src/pages/about.html",
    icon: "/public/assets/icons/icons-svg/black/info.svg",
    text: "About",
  },
  {
    href: "/src/pages/contact.html",
    icon: "/public/assets/icons/icons-svg/black/headphones.svg",
    text: "Contact",
  },
];

const MOBILE_NAV_LOWER = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: "/src/pages/wishlist.html",
          icon: "/public/assets/icons/icons-svg/black/line-heart.svg",
          text: "Wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN ? "/src/pages/user.html" : "/src/pages/log-in.html",
    icon: "/public/assets/icons/icons-svg/black/line-user.svg",
    text: IS_LOGGED_IN ? "Account" : "Log In",
  },
];

const DESKTOP_NAV_ITEMS = [
  { text: "Home", href: "/index.html" },
  { text: "Shop", href: "/src/pages/storefront.html" },
  { text: "Sale", href: "/src/pages/storefront.html?sale=true" },
  { text: "About", href: "/src/pages/about.html" },
  { text: "Contact", href: "/src/pages/contact.html" },
];

const DESKTOP_ICONS = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: "/src/pages/wishlist.html",
          icon: "/public/assets/icons/icons-svg/black/line-heart.svg",
          alt: "Wishlist",
          aria: "View wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN ? "/src/pages/user.html" : "/src/pages/log-in.html",
    icon: "/public/assets/icons/icons-svg/black/line-user.svg",
    alt: "User Account",
    aria: "User account",
  },
  {
    href: "/src/pages/cart.html",
    icon: "/public/assets/icons/icons-svg/black/line-cart.svg",
    alt: "Cart",
    aria: "View cart",
  },
];

function createIconLink({ href, icon, alt, aria }) {
  const a = document.createElement("a");
  a.href = href;
  a.className = "header-mobile__icon";
  if (aria) a.setAttribute("aria-label", aria);
  const img = document.createElement("img");
  img.src = icon;
  img.alt = alt;
  a.appendChild(img);
  if (aria === "View cart") {
    const badge = document.createElement("span");
    badge.className = "cart-counter-badge";
    badge.setAttribute("aria-label", "Cart item count");
    badge.textContent = getCartCount();
    a.appendChild(badge);
    a._cartBadge = badge;
  }
  return a;
  function getCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (!Array.isArray(cart)) return 0;
      return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } catch {
      return 0;
    }
  }

  function updateCartBadges() {
    document
      .querySelectorAll(
        ".header-mobile__icon[aria-label='View cart'], .header-desktop__icons a[aria-label='View cart']"
      )
      .forEach((el) => {
        const badge = el.querySelector(".cart-counter-badge");
        if (badge) badge.textContent = getCartCount();
      });
  }
}

function createNavLink({ href, icon, text }) {
  const a = document.createElement("a");
  a.href = href;
  if (icon) {
    const img = document.createElement("img");
    img.src = icon;
    img.alt = "";
    a.appendChild(img);
  }
  a.appendChild(document.createTextNode(text));
  return a;
}

function createLogo({
  tag = "a",
  className = "site-logo-text",
  href = null,
  text = "E.CO",
  aria = null,
}) {
  const el = document.createElement(tag);
  el.className = className;
  if (href) el.href = href;
  if (aria) el.setAttribute("aria-label", aria);
  el.textContent = text;
  return el;
}

function buildMobileHeader() {
  const mobileHeader = document.createElement("header");
  mobileHeader.className = "header-mobile";

  // Ad banner always at the top because capitalism
  const adBanner = document.createElement("div");
  adBanner.className = "site-ad";
  adBanner.style.minHeight = "35px";
  adBanner.style.height = "35px";
  adBanner.style.display = "flex";
  adBanner.style.alignItems = "center";
  adBanner.style.justifyContent = "center";
  if (IS_LOGGED_IN) {
    const p = document.createElement("p");
    p.textContent = "Browse our ";
    const saleLink = document.createElement("a");
    saleLink.href = "/src/pages/storefront.html?sale=true";
    saleLink.textContent = "summer sale!";
    saleLink.style.color = "#fff";
    saleLink.style.fontWeight = "bold";
    saleLink.setAttribute("aria-label", "Browse summer sale");
    p.appendChild(saleLink);
    adBanner.appendChild(p);
  } else {
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.href = "/src/pages/register.html";
    a.textContent = "Sign up now";
    p.appendChild(a);
    p.appendChild(document.createTextNode(" and get 20% off your first order"));
    adBanner.appendChild(p);
  }
  mobileHeader.appendChild(adBanner);

  // Upper header (White part)
  const upper = document.createElement("div");
  upper.className = "header-mobile__upper";

  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "header-mobile__hamburger";
  hamburgerBtn.setAttribute("aria-label", "Open menu");
  const hamburgerImg = document.createElement("img");
  hamburgerImg.src = "/public/assets/icons/icons-svg/black/hamburger.svg";
  hamburgerImg.alt = "Menu";
  hamburgerBtn.appendChild(hamburgerImg);

  const logoLink = createLogo({
    tag: "a",
    className: "header-mobile__logo site-logo-text",
    href: "/index.html",
    text: "E.CO",
    aria: "Go to homepage",
  });

  const icons = document.createElement("div");
  icons.className = "header-mobile__icons";
  let mobileSearchIcon = null;
  if (!IS_INDEX_PAGE) {
    mobileSearchIcon = createIconLink({
      href: "#",
      icon: "/public/assets/icons/icons-svg/black/search.svg",
      alt: "Search",
      aria: "Search",
    });
    icons.appendChild(mobileSearchIcon);
  }
  MOBILE_UPPER_LINKS.forEach((link) => icons.appendChild(createIconLink(link)));

  upper.appendChild(hamburgerBtn);
  upper.appendChild(logoLink);
  upper.appendChild(icons);

  // Lower header (Blue part)
  const lower = document.createElement("div");
  lower.className = "header-mobile__lower";

  function buildMobileSearchForm() {
    const searchContainer = document.createElement("form");
    searchContainer.className = "site-search mobile-toggle-search";
    searchContainer.setAttribute("role", "search");
    searchContainer.setAttribute("aria-label", "Site search");
    searchContainer.action = "#";
    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "mobile-site-search-input";
    searchLabel.className = "visually-hidden";
    searchLabel.textContent = "Search products";
    searchContainer.appendChild(searchLabel);
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "site-search__input";
    searchInput.placeholder = "Search";
    searchInput.setAttribute("aria-label", "Search");
    searchInput.autocomplete = "off";
    searchInput.id = "mobile-site-search-input";
    searchContainer.appendChild(searchInput);
    const searchBtn = document.createElement("button");
    searchBtn.type = "submit";
    searchBtn.className = "site-search__btn";
    searchBtn.setAttribute("aria-label", "Submit search");
    const searchBtnImg = document.createElement("img");
    searchBtnImg.src = "/public/assets/icons/icons-svg/black/search.svg";
    searchBtnImg.alt = "Search";
    searchBtn.appendChild(searchBtnImg);
    searchContainer.appendChild(searchBtn);
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "mobile-search-close-btn";
    closeBtn.setAttribute("aria-label", "Close search");
    const closeIcon = document.createElement("img");
    closeIcon.src = "/public/assets/icons/icons-svg/black/x.svg";
    closeIcon.alt = "Close";
    closeBtn.appendChild(closeIcon);
    searchContainer.appendChild(closeBtn);
    searchContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/src/pages/storefront.html?search=${encodeURIComponent(
          query
        )}`;
      }
    });
    return { searchContainer, closeBtn };
  }

  let mobileSearchActive = false;
  let mobileSearchForm = null;
  let mobileBreadcrumbs = null;

  if (IS_INDEX_PAGE) {
    // On index, always show search
    const { searchContainer } = buildMobileSearchForm();
    lower.appendChild(searchContainer);
  } else {
    lower.classList.add("header-mobile__lower--breadcrumb");
    const breadcrumbNav = document.querySelector("nav.breadcrumb");
    let breadcrumbs;
    if (breadcrumbNav && breadcrumbNav.dataset.breadcrumb) {
      const breadcrumbData = breadcrumbNav.dataset.breadcrumb;
      const parts = breadcrumbData
        .split(">")
        .map((p) => p.trim())
        .filter(Boolean);
      breadcrumbs = buildBreadcrumbs(parts);
      if (window.innerWidth < 900) {
        breadcrumbNav.style.display = "none";
      }
    } else {
      const pageName =
        document.title.split("|")[1]?.trim() ||
        window.location.pathname.split("/").pop().replace(".html", "");
      breadcrumbs = buildBreadcrumbs([pageName]);
    }
    lower.appendChild(breadcrumbs);
    mobileBreadcrumbs = breadcrumbs;
  }

  if (mobileSearchIcon) {
    mobileSearchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (!mobileSearchActive) {
        const { searchContainer, closeBtn } = buildMobileSearchForm();
        if (mobileBreadcrumbs && lower.contains(mobileBreadcrumbs)) {
          mobileBreadcrumbs.style.display = "none";
        }
        lower.appendChild(searchContainer);
        closeBtn.addEventListener("click", () => {
          searchContainer.remove();
          if (mobileBreadcrumbs) mobileBreadcrumbs.style.display = "";
          mobileSearchActive = false;
        });
        mobileSearchForm = searchContainer;
        mobileSearchActive = true;
      } else {
        if (mobileSearchForm && lower.contains(mobileSearchForm)) {
          mobileSearchForm.remove();
        }
        if (mobileBreadcrumbs) mobileBreadcrumbs.style.display = "";
        mobileSearchActive = false;
      }
    });
  }

  mobileHeader.appendChild(upper);
  mobileHeader.appendChild(lower);
  return { mobileHeader, hamburgerBtn };
}

function buildBreadcrumbs(parts) {
  const breadcrumbs = document.createElement("nav");
  breadcrumbs.className = "header-mobile__breadcrumbs";
  breadcrumbs.setAttribute("aria-label", "Breadcrumb");
  const breadcrumbsList = document.createElement("ol");
  breadcrumbsList.className = "header-mobile__breadcrumbs-list";
  const homeItem = document.createElement("li");
  const homeLink = document.createElement("a");
  homeLink.href = "/index.html";
  homeLink.textContent = "Home";
  homeItem.appendChild(homeLink);
  breadcrumbsList.appendChild(homeItem);
  parts.forEach((part, index) => {
    const item = document.createElement("li");
    if ((part === "Shop" || part === "Store") && index < parts.length - 1) {
      const link = document.createElement("a");
      link.href = "/src/pages/storefront.html";
      link.textContent = "Shop";
      item.appendChild(link);
    } else if (part === "Account" && index < parts.length - 1) {
      const link = document.createElement("a");
      link.href = "/src/pages/user.html";
      link.textContent = "Account";
      item.appendChild(link);
    } else if (index < parts.length - 1) {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = part;
      item.appendChild(link);
    } else {
      item.textContent = part;
      item.setAttribute("aria-current", "page");
    }
    breadcrumbsList.appendChild(item);
  });
  breadcrumbs.appendChild(breadcrumbsList);
  return breadcrumbs;
}

function buildMobileNavMenu() {
  const navMenu = document.createElement("nav");
  navMenu.className = "mobile-nav";
  const navHeader = document.createElement("div");
  navHeader.className = "mobile-nav__header";
  const closeButton = document.createElement("button");
  closeButton.className = "mobile-nav__close";
  closeButton.setAttribute("aria-label", "Close menu");
  const closeButtonImg = document.createElement("img");
  closeButtonImg.src = "/public/assets/icons/icons-svg/black/x.svg";
  closeButtonImg.alt = "Close";
  closeButton.appendChild(closeButtonImg);
  const navLogo = document.createElement("div");
  navLogo.className = "mobile-nav__logo";
  const navLogoImg = document.createElement("img");
  navLogoImg.src = "/public/assets/img/logo/logo.webp";
  navLogoImg.alt = "E.CO logo";
  const navLogoH1 = createLogo({
    tag: "h1",
    className: "site-logo-text",
    text: "E.CO",
  });
  navLogo.appendChild(navLogoImg);
  navLogo.appendChild(navLogoH1);
  navHeader.appendChild(closeButton);
  navHeader.appendChild(navLogo);
  const navBody = document.createElement("div");
  navBody.className = "mobile-nav__body";
  const upperLinks = document.createElement("ul");
  upperLinks.className = "mobile-nav__links";
  MOBILE_NAV_UPPER.forEach((data) => {
    const li = document.createElement("li");
    li.appendChild(createNavLink(data));
    upperLinks.appendChild(li);
  });
  const lowerSection = document.createElement("div");
  lowerSection.className = "mobile-nav__lower-section";
  const lowerLinks = document.createElement("ul");
  lowerLinks.className = "mobile-nav__links";
  MOBILE_NAV_LOWER.forEach((data) => {
    const li = document.createElement("li");
    li.appendChild(createNavLink(data));
    lowerLinks.appendChild(li);
  });
  lowerSection.appendChild(lowerLinks);
  navBody.appendChild(upperLinks);
  navBody.appendChild(lowerSection);
  navMenu.appendChild(navHeader);
  navMenu.appendChild(navBody);
  return { navMenu, closeButton };
}

function buildDesktopHeader() {
  const desktopHeader = document.createElement("header");
  desktopHeader.className = "header-desktop";
  const adBanner = document.createElement("div");
  adBanner.className = "site-ad";
  adBanner.style.minHeight = "35px";
  adBanner.style.height = "35px";
  adBanner.style.display = "flex";
  adBanner.style.alignItems = "center";
  adBanner.style.justifyContent = "center";
  if (IS_LOGGED_IN) {
    const p = document.createElement("p");
    p.textContent = "Browse our ";
    const saleLink = document.createElement("a");
    saleLink.href = "/src/pages/storefront.html?sale=true";
    saleLink.textContent = "summer sale!";
    saleLink.style.color = "#fff";
    saleLink.style.fontWeight = "bold";
    saleLink.setAttribute("aria-label", "Browse summer sale");
    p.appendChild(saleLink);
    adBanner.appendChild(p);
  } else {
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.href = "/src/pages/register.html";
    a.textContent = "Sign up now";
    p.appendChild(a);
    p.appendChild(document.createTextNode(" and get 20% off your first order"));
    adBanner.appendChild(p);
  }
  desktopHeader.appendChild(adBanner);
  const desktopUpper = document.createElement("div");
  desktopUpper.className = "header-desktop__upper";
  const desktopLogoContainer = document.createElement("a");
  desktopLogoContainer.className = "header-desktop__logo-container";
  desktopLogoContainer.href = "/index.html";
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = "/public/assets/img/logo/logo.webp";
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "header-desktop__logo-img";
  const desktopLogoText = createLogo({
    tag: "span",
    className: "header-desktop__logo-text site-logo-text",
    text: "E.CO",
  });
  desktopLogoContainer.appendChild(desktopLogoImg);
  desktopLogoContainer.appendChild(desktopLogoText);
  const desktopNav = document.createElement("nav");
  desktopNav.className = "header-desktop__nav";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className = "header-desktop__nav-list";
  DESKTOP_NAV_ITEMS.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    desktopNavList.appendChild(li);
  });
  desktopNav.appendChild(desktopNavList);
  const desktopIcons = document.createElement("div");
  desktopIcons.className = "header-desktop__icons";
  DESKTOP_ICONS.forEach((data) =>
    desktopIcons.appendChild(createIconLink(data))
  );
  desktopUpper.appendChild(desktopLogoContainer);
  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopIcons);
  desktopHeader.appendChild(desktopUpper);

  // Lower

  const desktopLower = document.createElement("div");
  desktopLower.className = "header-desktop__lower";

  // Left: Category browser (I'll try to make this work, no promises)

  const categoryBrowser = document.createElement("button");
  categoryBrowser.className = "header-desktop__category-browser";
  const categoryIcon = document.createElement("img");
  categoryIcon.src =
    "/public/assets/icons/icons-svg/black/desktop-hamburger.svg";
  categoryIcon.alt = "Categories";
  const categoryText = document.createElement("span");
  categoryText.textContent = "Browse by category";
  const categoryArrow = document.createElement("img");
  categoryArrow.src = "/public/assets/icons/icons-svg/black/down-arrow.svg";
  categoryArrow.alt = "";
  categoryArrow.className = "header-desktop__category-arrow";
  categoryBrowser.appendChild(categoryIcon);
  categoryBrowser.appendChild(categoryText);
  categoryBrowser.appendChild(categoryArrow);

  // Center: Search bar (I'll try to make this work as well maybe)

  const desktopSearchContainer = document.createElement("form");
  desktopSearchContainer.className = "site-search";
  desktopSearchContainer.action = "#";
  const desktopSearchLabel = document.createElement("label");
  desktopSearchLabel.htmlFor = "desktop-site-search-input";
  desktopSearchLabel.className = "visually-hidden";
  desktopSearchLabel.textContent = "Search products";
  desktopSearchContainer.appendChild(desktopSearchLabel);
  const desktopSearchInput = document.createElement("input");
  desktopSearchInput.type = "search";
  desktopSearchInput.className = "site-search__input";
  desktopSearchInput.placeholder = "Search";
  desktopSearchInput.autocomplete = "off";
  desktopSearchInput.id = "desktop-site-search-input";
  desktopSearchContainer.appendChild(desktopSearchInput);
  const desktopSearchBtn = document.createElement("button");
  desktopSearchBtn.type = "submit";
  desktopSearchBtn.className = "site-search__btn";
  const desktopSearchBtnImg = document.createElement("img");
  desktopSearchBtnImg.src = "/public/assets/icons/icons-svg/black/search.svg";
  desktopSearchBtnImg.alt = "Search";
  desktopSearchBtn.appendChild(desktopSearchBtnImg);
  desktopSearchContainer.appendChild(desktopSearchBtn);

  // Search handler: redirect to storefront with search... words :)
  desktopSearchContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = desktopSearchInput.value.trim();
    if (query) {
      window.location.href = `/src/pages/storefront.html?search=${encodeURIComponent(
        query
      )}`;
    }
  });

  // Right: Contact info (I wont make any of this work. Not part of the assignment and cant be arsed)

  const contactInfo = document.createElement("div");
  contactInfo.className = "header-desktop__contact-info";
  const contactIcon = document.createElement("img");
  contactIcon.src = "/public/assets/icons/icons-svg/black/line-phone.svg";
  contactIcon.alt = "";
  const contactTextContainer = document.createElement("div");
  contactTextContainer.className = "header-desktop__contact-text-container";
  const contactText = document.createElement("span");
  contactText.className = "header-desktop__contact-text";
  contactText.textContent = "Questions? Give us a call!";
  const contactNumber = document.createElement("span");
  contactNumber.className = "header-desktop__contact-number";
  contactNumber.textContent = "+47 45612378";
  contactTextContainer.appendChild(contactText);
  contactTextContainer.appendChild(contactNumber);
  contactInfo.appendChild(contactIcon);
  contactInfo.appendChild(contactTextContainer);
  desktopLower.appendChild(categoryBrowser);
  desktopLower.appendChild(desktopSearchContainer);
  desktopLower.appendChild(contactInfo);
  desktopHeader.appendChild(desktopLower);
  return desktopHeader;
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("storage", (e) => {
    if (e.key === "cart") updateCartBadges();
  });
  setTimeout(updateCartBadges, 100);
  const { mobileHeader, hamburgerBtn } = buildMobileHeader();
  const { navMenu, closeButton } = buildMobileNavMenu();
  const navOverlay = document.createElement("div");
  navOverlay.className = "mobile-nav-overlay";

  // Hamburger menu (mobile)
  const openMenu = () => {
    navMenu.classList.add("is-open");
    navOverlay.classList.add("is-open");
    const adBannerEl = document.querySelector(".site-ad");
    const adBannerHeight = adBannerEl ? adBannerEl.offsetHeight : 0;
    navMenu.style.top = `${adBannerHeight}px`;
    navMenu.style.height = `calc(100% - ${adBannerHeight}px)`;
  };
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navOverlay.classList.remove("is-open");
  };
  hamburgerBtn.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  navOverlay.addEventListener("click", closeMenu);

  // Desktop filter menu (hamburger from left, no overlay. Hopefully it works as intended because I'm done fidgeting with this...)
  const desktopFilterMenu = document.createElement("div");
  desktopFilterMenu.className = "desktop-filter-menu";
  const desktopFilterMenuInner = document.createElement("div");
  desktopFilterMenuInner.className = "desktop-filter-menu__inner";
  desktopFilterMenu.appendChild(desktopFilterMenuInner);
  document.body.appendChild(desktopFilterMenu);

  function openDesktopFilterMenu() {
    desktopFilterMenu.classList.add("is-open");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.marginRight = "";
  }
  function closeDesktopFilterMenu() {
    desktopFilterMenu.classList.remove("is-open");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.marginRight = "";
  }

  document.addEventListener("click", function (e) {
    const target = e.target.closest(".header-desktop__category-browser");
    if (target) {
      if (desktopFilterMenu.classList.contains("is-open")) {
        closeDesktopFilterMenu();
      } else {
        openDesktopFilterMenu();
      }
    }
  });

  function renderDesktopFilterMenu(categories = [], tags = []) {
    const inner = desktopFilterMenu.querySelector(
      ".desktop-filter-menu__inner"
    );
    while (inner.firstChild) {
      inner.removeChild(inner.firstChild);
    }
    const headingRow = document.createElement("div");
    headingRow.className = "filter-menu-heading-row-desktop";
    const heading = document.createElement("h1");
    heading.textContent = "Filters";
    heading.className = "storefront-title";
    const closeBtn = document.createElement("button");
    closeBtn.className = "filter-menu-close-btn-desktop";
    const closeIcon = document.createElement("img");
    closeIcon.src = "/public/assets/icons/icons-svg/black/x.svg";
    closeIcon.alt = "Close filters menu";
    closeBtn.appendChild(closeIcon);
    closeBtn.addEventListener("click", closeDesktopFilterMenu);
    headingRow.appendChild(heading);
    headingRow.appendChild(closeBtn);
    inner.appendChild(headingRow);
    inner.appendChild(document.createElement("hr"));

    // Categories

    const catSection = document.createElement("div");
    catSection.className = "filter-section-desktop";

    // SALE!

    const saleBtn = document.createElement("button");
    saleBtn.className = "filter-sale-btn-desktop";
    saleBtn.textContent = "SALE!";
    saleBtn.style.color = "#d32f2f";
    saleBtn.addEventListener("click", () => {
      if (!window.location.pathname.endsWith("storefront.html")) {
        window.location.href = "/src/pages/storefront.html?sale=true";
      } else {
        window.location.search = "?sale=true";
      }
      closeDesktopFilterMenu();
    });
    catSection.appendChild(saleBtn);

    // New Arrivals

    const newBtn = document.createElement("button");
    newBtn.className = "filter-btn-desktop";
    newBtn.textContent = "New Arrivals";
    newBtn.addEventListener("click", () => {
      if (!window.location.pathname.endsWith("storefront.html")) {
        window.location.href = "/src/pages/storefront.html?new=true";
      } else {
        window.location.search = "?new=true";
      }
      closeDesktopFilterMenu();
    });
    catSection.appendChild(newBtn);

    // Most Popular

    const popBtn = document.createElement("button");
    popBtn.className = "filter-btn-desktop";
    popBtn.textContent = "Most Popular";
    popBtn.addEventListener("click", () => {
      if (!window.location.pathname.endsWith("storefront.html")) {
        window.location.href = "/src/pages/storefront.html?popular=true";
      } else {
        window.location.search = "?popular=true";
      }
      closeDesktopFilterMenu();
    });
    catSection.appendChild(popBtn);
    inner.appendChild(catSection);
    inner.appendChild(document.createElement("hr"));

    // Colours (mockup. wont make this work)

    const coloursHeading = document.createElement("h1");
    coloursHeading.textContent = "Colours";
    coloursHeading.className = "storefront-title";
    inner.appendChild(coloursHeading);
    const colours = [
      "#fff",
      "#000",
      "#e53935",
      "#fbc02d",
      "#43a047",
      "#1976d2",
      "#8e24aa",
      "#ff9800",
      "#00bcd4",
      "#cddc39",
    ];
    const colourGrid = document.createElement("div");
    colourGrid.className = "filter-colour-grid-desktop";
    colours.forEach((col) => {
      const circle = document.createElement("div");
      circle.className = "filter-colour-circle-desktop";
      circle.style.background = col;
      circle.title = col;
      circle.tabIndex = 0;
      circle.style.cursor = "pointer";
      colourGrid.appendChild(circle);
    });
    inner.appendChild(colourGrid);
    inner.appendChild(document.createElement("hr"));

    // Sub-Categories

    const subcatHeading = document.createElement("h1");
    subcatHeading.textContent = "Sub-Categories";
    subcatHeading.className = "storefront-title";
    inner.appendChild(subcatHeading);
    const subcatList = document.createElement("div");
    subcatList.className = "filter-subcat-list-desktop";
    tags.forEach((tag) => {
      const capTag = tag.charAt(0).toUpperCase() + tag.slice(1);
      const btn = document.createElement("button");
      btn.className = "filter-btn-desktop";
      btn.textContent = capTag;
      btn.addEventListener("click", () => {
        if (!window.location.pathname.endsWith("storefront.html")) {
          window.location.href = `/src/pages/storefront.html?tag=${encodeURIComponent(
            tag
          )}`;
        } else {
          window.location.search = `?tag=${encodeURIComponent(tag)}`;
        }
        closeDesktopFilterMenu();
      });
      subcatList.appendChild(btn);
    });
    inner.appendChild(subcatList);
  }

  import("../api/api.js").then(({ fetchAllProducts }) => {
    fetchAllProducts().then((products) => {
      const tagsSet = new Set();
      products.forEach((p) =>
        Array.isArray(p.tags) ? p.tags.forEach((t) => tagsSet.add(t)) : null
      );
      renderDesktopFilterMenu([], Array.from(tagsSet));
    });
  });

  const desktopHeader = buildDesktopHeader();
  document.body.appendChild(navMenu);
  document.body.appendChild(navOverlay);
  document.body.insertAdjacentElement("afterbegin", mobileHeader);
  document.body.insertAdjacentElement("afterbegin", desktopHeader);
});
