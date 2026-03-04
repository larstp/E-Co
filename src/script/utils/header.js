const IS_ROOT_PAGE =
  window.location.pathname.endsWith("/index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname === "/E-Co/" ||
  window.location.pathname.endsWith("/E-Co/index.html");

function getNavLink(target) {
  if (IS_ROOT_PAGE) {
    return `./${target}`;
  } else {
    if (target.startsWith("src/pages/")) {
      return target.replace("src/pages/", "");
    }
    return `../../${target}`;
  }
}

import { isLoggedIn } from "./user.js";
import { getCartCount, updateCartBadges } from "./cartCounter.js";

const IS_LOGGED_IN = isLoggedIn();

const MOBILE_UPPER_LINKS = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: getNavLink("src/pages/wishlist.html"),
          icon: getNavLink(
            "public/assets/icons/icons-svg/black/line-heart.svg",
          ),
          alt: "Wishlist",
          aria: "View wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN
      ? getNavLink("src/pages/user.html")
      : getNavLink("src/pages/log-in.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-user.svg"),
    alt: "User Account",
    aria: "User account",
  },
  {
    href: getNavLink("src/pages/cart.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-cart.svg"),
    alt: "Cart",
    aria: "View cart",
  },
];

const MOBILE_NAV_UPPER = [
  {
    href: getNavLink("index.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-home.svg"),
    text: "Home",
  },
  {
    href: getNavLink("src/pages/storefront.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-shopping.svg"),
    text: "Shop",
  },
  {
    href: getNavLink("src/pages/storefront.html?sale=true"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-sale.svg"),
    text: "Sale",
  },
  {
    href: getNavLink("src/pages/about.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/info.svg"),
    text: "About",
  },
  {
    href: getNavLink("src/pages/contact.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/headphones.svg"),
    text: "Contact",
  },
];

const MOBILE_NAV_LOWER = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: getNavLink("src/pages/wishlist.html"),
          icon: getNavLink(
            "public/assets/icons/icons-svg/black/line-heart.svg",
          ),
          text: "Wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN
      ? getNavLink("src/pages/user.html")
      : getNavLink("src/pages/log-in.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-user.svg"),
    text: IS_LOGGED_IN ? "Account" : "Log In",
  },
];

const DESKTOP_NAV_ITEMS = [
  { text: "Home", href: getNavLink("index.html") },
  { text: "Shop", href: getNavLink("src/pages/storefront.html") },
  { text: "Sale", href: getNavLink("src/pages/storefront.html?sale=true") },
  { text: "About", href: getNavLink("src/pages/about.html") },
  { text: "Contact", href: getNavLink("src/pages/contact.html") },
];

const DESKTOP_ICONS = [
  ...(IS_LOGGED_IN
    ? [
        {
          href: getNavLink("src/pages/wishlist.html"),
          icon: getNavLink(
            "public/assets/icons/icons-svg/black/line-heart.svg",
          ),
          alt: "Wishlist",
          aria: "View wishlist",
        },
      ]
    : []),
  {
    href: IS_LOGGED_IN
      ? getNavLink("src/pages/user.html")
      : getNavLink("src/pages/log-in.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-user.svg"),
    alt: "User Account",
    aria: "User account",
  },
  {
    href: getNavLink("src/pages/cart.html"),
    icon: getNavLink("public/assets/icons/icons-svg/black/line-cart.svg"),
    alt: "Cart",
    aria: "View cart",
  },
];

function createIconLink({ href, icon, alt, aria }) {
  const a = document.createElement("a");
  a.href = href;
  a.className =
    "flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-none cursor-pointer no-underline relative";
  if (aria) a.setAttribute("aria-label", aria);
  const img = document.createElement("img");
  img.src = icon;
  img.alt = alt;
  a.appendChild(img);
  if (aria === "View cart") {
    const badge = document.createElement("span");
    badge.className =
      "absolute -top-[7px] -right-[7px] min-w-[20px] h-[20px] bg-red-400 text-white text-[0.95rem] font-roboto font-bold rounded-full flex items-center justify-center z-[2] shadow-md pointer-events-none";
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
    document.querySelectorAll("a[aria-label='View cart']").forEach((el) => {
      const badge = el.querySelector("[aria-label='Cart item count']");
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
  className = "font-bebas text-[2.2rem] text-black leading-none font-normal no-underline",
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
  mobileHeader.className =
    "lg:hidden w-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] font-roboto";

  // Ad banner always at the top because capitalism
  const adBanner = document.createElement("div");
  adBanner.className =
    "bg-brand-blue text-white text-center h-[35px] flex items-center justify-center text-sm";
  if (IS_LOGGED_IN) {
    const p = document.createElement("p");
    p.className = "m-0";
    p.textContent = "Browse our ";
    const saleLink = document.createElement("a");
    saleLink.className = "text-white underline font-bold";
    saleLink.href = getNavLink("src/pages/storefront.html?sale=true");
    saleLink.textContent = "summer sale!";
    saleLink.setAttribute("aria-label", "Browse summer sale");
    p.appendChild(saleLink);
    adBanner.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.className = "m-0";
    const a = document.createElement("a");
    a.className = "text-white underline";
    a.href = getNavLink("src/pages/register.html");
    a.textContent = "Sign up now";
    p.appendChild(a);
    p.appendChild(document.createTextNode(" and get 20% off your first order"));
    adBanner.appendChild(p);
  }
  mobileHeader.appendChild(adBanner);

  // Upper header (White part)
  const upper = document.createElement("div");
  upper.className =
    "flex items-center justify-between h-[65px] bg-white px-4 relative";

  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className =
    "bg-transparent border-none p-0 m-0 flex items-center cursor-pointer h-10 z-[2]";
  hamburgerBtn.setAttribute("aria-label", "Open menu");
  const hamburgerImg = document.createElement("img");
  hamburgerImg.src = getNavLink(
    "public/assets/icons/icons-svg/black/hamburger.svg",
  );
  hamburgerImg.alt = "Menu";
  hamburgerBtn.appendChild(hamburgerImg);

  const logoLink = createLogo({
    tag: "a",
    className:
      "no-underline h-full flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] font-bebas text-[2.2rem] text-black leading-none font-normal",
    href: getNavLink("index.html"),
    text: "E.CO",
    aria: "Go to homepage",
  });

  const icons = document.createElement("div");
  icons.className = "flex gap-2 z-[2] min-w-[70px] justify-end";
  let mobileSearchIcon = null;
  const leftIcons = document.createElement("div");
  leftIcons.className = "flex flex-row items-center gap-2";
  if (!IS_ROOT_PAGE) {
    mobileSearchIcon = createIconLink({
      href: "#",
      icon: getNavLink("public/assets/icons/icons-svg/black/search.svg"),
      alt: "Search",
      aria: "Search",
    });
    leftIcons.appendChild(hamburgerBtn);
    leftIcons.appendChild(mobileSearchIcon);
    upper.appendChild(leftIcons);
    upper.appendChild(logoLink);
    upper.appendChild(icons);
  } else {
    upper.appendChild(hamburgerBtn);
    upper.appendChild(logoLink);
    upper.appendChild(icons);
  }
  MOBILE_UPPER_LINKS.forEach((link) => icons.appendChild(createIconLink(link)));

  // Lower header (Blue part)
  const lower = document.createElement("div");
  lower.className =
    "h-[65px] bg-blue-600 flex items-center justify-center px-4";

  function buildMobileSearchForm() {
    const searchContainer = document.createElement("form");
    searchContainer.className =
      "flex items-center w-full max-w-[670px] h-10 bg-white rounded-[20px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)] mobile-toggle-search";
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
    searchInput.className =
      "flex-1 h-full border-none px-4 text-base bg-transparent text-gray-800 outline-none placeholder:text-gray-500 placeholder:opacity-100";
    searchInput.placeholder = "Search";
    searchInput.setAttribute("aria-label", "Search");
    searchInput.autocomplete = "off";
    searchInput.id = "mobile-site-search-input";
    searchContainer.appendChild(searchInput);
    const searchBtn = document.createElement("button");
    searchBtn.type = "submit";
    searchBtn.className =
      "bg-transparent border-none w-12 h-full flex items-center justify-center cursor-pointer";
    searchBtn.setAttribute("aria-label", "Submit search");
    const searchBtnImg = document.createElement("img");
    searchBtnImg.src = getNavLink(
      "public/assets/icons/icons-svg/black/search.svg",
    );
    searchBtnImg.alt = "Search";
    searchBtn.appendChild(searchBtnImg);
    searchContainer.appendChild(searchBtn);
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className =
      "bg-transparent border-none p-1 ml-2 mr-2 cursor-pointer flex items-center [&>img]:w-5 [&>img]:h-5 [&>img]:block";
    closeBtn.setAttribute("aria-label", "Close search");
    const closeIcon = document.createElement("img");
    closeIcon.src = getNavLink("public/assets/icons/icons-svg/black/x.svg");
    closeIcon.alt = "Close";
    closeBtn.appendChild(closeIcon);
    searchContainer.appendChild(closeBtn);
    searchContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = getNavLink(
          `src/pages/storefront.html?search=${encodeURIComponent(query)}`,
        );
      }
    });
    return { searchContainer, closeBtn };
  }

  let mobileSearchActive = false;
  let mobileSearchForm = null;
  let mobileBreadcrumbs = null;

  if (IS_ROOT_PAGE) {
    // On index, always show search
    const { searchContainer } = buildMobileSearchForm();
    lower.appendChild(searchContainer);
  } else {
    lower.classList.add("justify-start");
    const breadcrumbNav = document.querySelector("nav[data-breadcrumb]");
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
        mobileSearchIcon.style.display = "none";
        const { searchContainer, closeBtn } = buildMobileSearchForm();
        if (mobileBreadcrumbs && lower.contains(mobileBreadcrumbs)) {
          mobileBreadcrumbs.style.display = "none";
        }
        lower.appendChild(searchContainer);
        closeBtn.addEventListener("click", () => {
          searchContainer.remove();
          if (mobileBreadcrumbs) mobileBreadcrumbs.style.display = "";
          mobileSearchIcon.style.display = "";
          mobileSearchActive = false;
        });
        mobileSearchForm = searchContainer;
        mobileSearchActive = true;
      } else {
        if (mobileSearchForm && lower.contains(mobileSearchForm)) {
          mobileSearchForm.remove();
        }
        if (mobileBreadcrumbs) mobileBreadcrumbs.style.display = "";
        mobileSearchIcon.style.display = "";
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
  breadcrumbs.className = "w-full max-w-[670px] text-white pl-2";
  breadcrumbs.setAttribute("aria-label", "Breadcrumb");
  const breadcrumbsList = document.createElement("ol");
  breadcrumbsList.className =
    "flex items-center list-none m-0 p-0 text-sm [&_li]:flex [&_li]:items-center [&_li:not(:last-child)]:after:content-['/'] [&_li:not(:last-child)]:after:mx-2 [&_li:not(:last-child)]:after:text-white/70 [&_a]:text-white [&_a]:no-underline [&_a]:transition-opacity [&_a]:duration-200 [&_a:hover]:opacity-80 [&_li[aria-current='page']]:text-white/70";
  const homeItem = document.createElement("li");
  const homeLink = document.createElement("a");
  homeLink.href = getNavLink("index.html");
  homeLink.textContent = "Home";
  homeItem.appendChild(homeLink);
  breadcrumbsList.appendChild(homeItem);
  parts.forEach((part, index) => {
    const item = document.createElement("li");
    if ((part === "Shop" || part === "Store") && index < parts.length - 1) {
      const link = document.createElement("a");
      link.href = getNavLink("src/pages/storefront.html");
      link.textContent = "Shop";
      item.appendChild(link);
    } else if (part === "Account" && index < parts.length - 1) {
      const link = document.createElement("a");
      link.href = getNavLink("src/pages/user.html");
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
  navMenu.className =
    "fixed top-0 -left-[300px] w-[300px] h-full bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-[1000] transition-[left] duration-300 ease-in-out flex flex-col [&.is-open]:left-0 [&.is-open]:rounded-br-[15px]";
  const navHeader = document.createElement("div");
  navHeader.className = "p-4 text-center border-b border-gray-200";
  const closeButton = document.createElement("button");
  closeButton.className =
    "absolute top-4 left-4 bg-transparent border-none cursor-pointer";
  closeButton.setAttribute("aria-label", "Close menu");
  const closeButtonImg = document.createElement("img");
  closeButtonImg.src = getNavLink("public/assets/icons/icons-svg/black/x.svg");
  closeButtonImg.alt = "Close";
  closeButton.appendChild(closeButtonImg);
  const navLogo = document.createElement("div");
  navLogo.className =
    "mt-5 [&>img]:w-[100px] [&>img]:h-[100px] [&_.font-bebas]:text-[2rem] [&_.font-bebas]:mt-2";
  const navLogoImg = document.createElement("img");
  navLogoImg.src = getNavLink("public/assets/img/logo/logo.webp");
  navLogoImg.alt = "E.CO logo";
  const navLogoH1 = createLogo({
    tag: "h1",
    className:
      "font-bebas text-[2.2rem] text-black leading-none font-normal no-underline",
    text: "E.CO",
  });
  navLogo.appendChild(navLogoImg);
  navLogo.appendChild(navLogoH1);
  navHeader.appendChild(closeButton);
  navHeader.appendChild(navLogo);
  const navBody = document.createElement("div");
  navBody.className = "flex flex-col flex-grow pt-4";
  const upperLinks = document.createElement("ul");
  upperLinks.className =
    "list-none m-0 px-4 [&_li]:mb-2 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:p-3 [&_a]:no-underline [&_a]:text-gray-800 [&_a]:font-roboto [&_a]:text-[18pt] [&_a]:rounded-tl-[10px] [&_a]:transition-all [&_a]:duration-200 [&_a]:w-[260px] [&_a>img]:w-6 [&_a>img]:h-6 [&_a>img]:transition-[filter] [&_a>img]:duration-200 [&_a:hover]:bg-blue-600 [&_a:hover]:text-white [&_a:hover>img]:brightness-0 [&_a:hover>img]:invert";
  MOBILE_NAV_UPPER.forEach((data) => {
    const li = document.createElement("li");
    li.appendChild(createNavLink(data));
    upperLinks.appendChild(li);
  });
  const lowerSection = document.createElement("div");
  lowerSection.className =
    "bg-blue-600 mt-2 flex-grow py-4 rounded-br-[15px] [&_.list-none_a]:text-white [&_.list-none_a>img]:brightness-0 [&_.list-none_a>img]:invert [&_.list-none_a:hover]:bg-white [&_.list-none_a:hover]:text-black [&_.list-none_a:hover>img]:brightness-100 [&_.list-none_a:hover>img]:invert-0";
  const lowerLinks = document.createElement("ul");
  lowerLinks.className =
    "list-none m-0 px-4 [&_li]:mb-2 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:p-3 [&_a]:no-underline [&_a]:text-gray-800 [&_a]:font-roboto [&_a]:text-[18pt] [&_a]:rounded-tl-[10px] [&_a]:transition-all [&_a]:duration-200 [&_a]:w-[260px] [&_a>img]:w-6 [&_a>img]:h-6 [&_a>img]:transition-[filter] [&_a>img]:duration-200 [&_a:hover]:bg-blue-600 [&_a:hover]:text-white [&_a:hover>img]:brightness-0 [&_a:hover>img]:invert";
  MOBILE_NAV_LOWER.forEach((data) => {
    const li = document.createElement("li");
    li.appendChild(createNavLink(data));
    lowerLinks.appendChild(li);
  });
  if (IS_LOGGED_IN) {
    const logoutLi = document.createElement("li");
    const logoutBtn = document.createElement("button");
    logoutBtn.className =
      "flex items-center gap-3 bg-transparent border-none text-white font-roboto text-[18pt] cursor-pointer p-3";
    logoutBtn.style.width = "260px";
    const logoutIcon = document.createElement("img");
    logoutIcon.src = getNavLink("public/assets/icons/icons-svg/white/exit.svg");
    logoutIcon.alt = "Log out";
    logoutIcon.style.width = "24px";
    logoutIcon.style.height = "24px";
    logoutBtn.appendChild(logoutIcon);
    logoutBtn.appendChild(document.createTextNode("Log out"));
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = getNavLink("index.html");
    });
    logoutLi.appendChild(logoutBtn);
    lowerLinks.appendChild(logoutLi);
  }
  lowerSection.appendChild(lowerLinks);
  navBody.appendChild(upperLinks);
  navBody.appendChild(lowerSection);
  navMenu.appendChild(navHeader);
  navMenu.appendChild(navBody);
  return { navMenu, closeButton };
}

function buildDesktopHeader() {
  const desktopHeader = document.createElement("header");
  desktopHeader.className = "hidden lg:flex w-full flex-col font-roboto";
  const adBanner = document.createElement("div");
  adBanner.className =
    "bg-brand-blue text-white text-center h-[35px] flex items-center justify-center text-sm";
  if (IS_LOGGED_IN) {
    const p = document.createElement("p");
    p.className = "m-0";
    p.textContent = "Browse our ";
    const saleLink = document.createElement("a");
    saleLink.className = "text-white underline font-bold";
    saleLink.href = getNavLink("src/pages/storefront.html?sale=true");
    saleLink.textContent = "summer sale!";
    saleLink.setAttribute("aria-label", "Browse summer sale");
    p.appendChild(saleLink);
    adBanner.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.className = "m-0";
    const a = document.createElement("a");
    a.className = "text-white underline";
    a.href = getNavLink("src/pages/register.html");
    a.textContent = "Sign up now";
    p.appendChild(a);
    p.appendChild(document.createTextNode(" and get 20% off your first order"));
    adBanner.appendChild(p);
  }
  desktopHeader.appendChild(adBanner);
  const desktopUpper = document.createElement("div");
  desktopUpper.className =
    "h-[65px] flex items-center px-6 w-full min-w-0 box-border bg-white justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)]";
  const desktopLogoContainer = document.createElement("a");
  desktopLogoContainer.className =
    "flex items-center gap-2 no-underline text-inherit";
  desktopLogoContainer.href = getNavLink("index.html");
  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = getNavLink("public/assets/img/logo/logo.webp");
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "w-[42px] h-[42px]";
  const desktopLogoText = createLogo({
    tag: "span",
    className:
      "font-bebas text-[2.2rem] text-black leading-none font-normal no-underline",
    text: "E.CO",
  });
  desktopLogoContainer.appendChild(desktopLogoImg);
  desktopLogoContainer.appendChild(desktopLogoText);
  const desktopNav = document.createElement("nav");
  desktopNav.className = "flex";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className =
    "flex list-none m-0 p-0 gap-8 [&_a]:no-underline [&_a]:text-gray-800 [&_a]:text-[15pt] [&_a]:font-normal [&_a]:py-2 [&_a]:px-3 [&_a]:rounded-lg [&_a]:transition-all [&_a]:duration-200 [&_a:hover]:bg-blue-600 [&_a:hover]:text-white";
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
  desktopIcons.className =
    "flex items-center gap-2 [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:w-10 [&_a]:h-10 [&_a]:rounded-full [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:bg-blue-600 [&_a>img]:w-6 [&_a>img]:h-6 [&_a:hover>img]:brightness-0 [&_a:hover>img]:invert";
  DESKTOP_ICONS.forEach((data) =>
    desktopIcons.appendChild(createIconLink(data)),
  );
  desktopUpper.appendChild(desktopLogoContainer);
  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopIcons);
  desktopHeader.appendChild(desktopUpper);

  // Lower

  const desktopLower = document.createElement("div");
  desktopLower.className =
    "h-[65px] flex items-center px-6 w-full min-w-0 box-border bg-blue-600 justify-between text-white px-[60px]";

  // Left: Category browser (I'll try to make this work, no promises)

  const categoryBrowser = document.createElement("button");
  categoryBrowser.className =
    "flex items-center gap-2 bg-transparent border-none text-inherit font-inherit text-base cursor-pointer [&>img]:brightness-0 [&>img]:invert [&>img]:w-6 [&>img]:h-6 [&>img]:inline-block";
  categoryBrowser.setAttribute("data-category-browser", "");
  const categoryIcon = document.createElement("img");
  categoryIcon.src = getNavLink(
    "public/assets/icons/icons-svg/black/desktop-hamburger.svg",
  );
  categoryIcon.alt = "Categories";
  const categoryText = document.createElement("span");
  categoryText.textContent = "Browse by category";
  const categoryArrow = document.createElement("img");
  categoryArrow.src = getNavLink(
    "public/assets/icons/icons-svg/black/down-arrow.svg",
  );
  categoryArrow.alt = "";
  categoryArrow.className = "w-[10px] h-[10px]";
  categoryBrowser.appendChild(categoryIcon);
  categoryBrowser.appendChild(categoryText);
  categoryBrowser.appendChild(categoryArrow);

  // Center: Search bar (I'll try to make this work as well maybe)

  const desktopSearchContainer = document.createElement("form");
  desktopSearchContainer.className =
    "flex items-center w-full max-w-[670px] h-10 bg-white rounded-[20px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]";
  desktopSearchContainer.action = "#";
  const desktopSearchLabel = document.createElement("label");
  desktopSearchLabel.htmlFor = "desktop-site-search-input";
  desktopSearchLabel.className = "visually-hidden";
  desktopSearchLabel.textContent = "Search products";
  desktopSearchContainer.appendChild(desktopSearchLabel);
  const desktopSearchInput = document.createElement("input");
  desktopSearchInput.type = "search";
  desktopSearchInput.className =
    "flex-1 h-full border-none px-4 text-base bg-transparent text-gray-800 outline-none placeholder:text-gray-500 placeholder:opacity-100";
  desktopSearchInput.placeholder = "Search";
  desktopSearchInput.autocomplete = "off";
  desktopSearchInput.id = "desktop-site-search-input";
  desktopSearchContainer.appendChild(desktopSearchInput);
  const desktopSearchBtn = document.createElement("button");
  desktopSearchBtn.type = "submit";
  desktopSearchBtn.className =
    "bg-transparent border-none w-12 h-full flex items-center justify-center cursor-pointer";
  const desktopSearchBtnImg = document.createElement("img");
  desktopSearchBtnImg.src = getNavLink(
    "public/assets/icons/icons-svg/black/search.svg",
  );
  desktopSearchBtnImg.alt = "Search";
  desktopSearchBtn.appendChild(desktopSearchBtnImg);
  desktopSearchContainer.appendChild(desktopSearchBtn);

  // Search handler: redirect to storefront with search... words :)
  desktopSearchContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = desktopSearchInput.value.trim();
    if (query) {
      window.location.href = getNavLink(
        `src/pages/storefront.html?search=${encodeURIComponent(query)}`,
      );
    }
  });

  const contactInfo = document.createElement("div");
  contactInfo.className =
    "flex items-center gap-2 [&>img]:brightness-0 [&>img]:invert [&>img]:w-6 [&>img]:h-6 [&>img]:inline-block";
  const contactIcon = document.createElement("img");
  contactIcon.src = getNavLink(
    "public/assets/icons/icons-svg/black/line-phone.svg",
  );
  contactIcon.alt = "";
  const contactTextContainer = document.createElement("div");
  contactTextContainer.className = "flex flex-col";
  const contactText = document.createElement("span");
  contactText.className = "text-[10pt]";
  contactText.textContent = "Questions? Give us a call!";
  const contactNumber = document.createElement("span");
  contactNumber.className = "text-[11pt] text-red-400 font-medium";
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
  navOverlay.className =
    "fixed top-0 left-0 w-full h-[120%] bg-black/50 z-[999] opacity-0 invisible transition-[opacity,visibility] duration-300 [&.is-open]:opacity-100 [&.is-open]:visible";

  // Hamburger menu (mobile)
  const openMenu = () => {
    navMenu.classList.add("is-open");
    navOverlay.classList.add("is-open");
    const adBannerEl = document.querySelector(".bg-brand-blue");
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
    const target = e.target.closest("[data-category-browser]");
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
      ".desktop-filter-menu__inner",
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
    closeIcon.src = getNavLink("public/assets/icons/icons-svg/black/x.svg");
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
        window.location.href = getNavLink(
          "src/pages/storefront.html?sale=true",
        );
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
        window.location.href = getNavLink("src/pages/storefront.html?new=true");
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
        window.location.href = getNavLink(
          "src/pages/storefront.html?popular=true",
        );
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
          window.location.href = getNavLink(
            `src/pages/storefront.html?tag=${encodeURIComponent(tag)}`,
          );
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
        Array.isArray(p.tags) ? p.tags.forEach((t) => tagsSet.add(t)) : null,
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
