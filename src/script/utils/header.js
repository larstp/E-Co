document.addEventListener("DOMContentLoaded", function () {
  const isIndexPage = window.location.pathname.endsWith("index.html");
  const isLoggedIn = false;

  const header = document.createElement("header");
  header.className = "header-mobile";

  const upper = document.createElement("div");
  upper.className = "header-mobile__upper";

  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "header-mobile__hamburger";
  hamburgerBtn.setAttribute("aria-label", "Open menu");
  const hamburgerImg = document.createElement("img");
  hamburgerImg.src = "/public/assets/icons/icons-svg/black/hamburger.svg";
  hamburgerImg.alt = "Menu";
  hamburgerBtn.appendChild(hamburgerImg);

  const logoLink = document.createElement("a");
  logoLink.className = "header-mobile__logo";
  logoLink.href = "/public/index.html";
  logoLink.textContent = "E.CO";
  logoLink.setAttribute("aria-label", "Go to homepage");

  const icons = document.createElement("div");
  icons.className = "header-mobile__icons";

  const userLink = document.createElement("a");
  userLink.className = "header-mobile__icon";
  userLink.href = isLoggedIn
    ? "/src/pages/user.html"
    : "/src/pages/log-in.html";
  userLink.setAttribute("aria-label", "User account");
  const userImg = document.createElement("img");
  userImg.src = "/public/assets/icons/icons-svg/black/line-user.svg";
  userImg.alt = "User Account";
  userLink.appendChild(userImg);

  const cartLink = document.createElement("a");
  cartLink.className = "header-mobile__icon";
  cartLink.href = "/src/pages/cart.html";
  cartLink.setAttribute("aria-label", "View cart");
  const cartImg = document.createElement("img");
  cartImg.src = "/public/assets/icons/icons-svg/black/line-cart.svg";
  cartImg.alt = "Cart";
  cartLink.appendChild(cartImg);

  if (!isIndexPage) {
    const searchLink = document.createElement("a");
    searchLink.className = "header-mobile__icon";
    searchLink.href = "#";
    searchLink.setAttribute("aria-label", "Search");
    const searchImg = document.createElement("img");
    searchImg.src = "/public/assets/icons/icons-svg/black/search.svg";
    searchImg.alt = "Search";
    searchLink.appendChild(searchImg);
    icons.appendChild(searchLink);
  }
  icons.appendChild(userLink);
  icons.appendChild(cartLink);

  upper.appendChild(hamburgerBtn);
  upper.appendChild(logoLink);
  upper.appendChild(icons);

  const lower = document.createElement("div");
  lower.className = "header-mobile__lower";

  if (isIndexPage) {
    const searchContainer = document.createElement("form");
    searchContainer.className = "header-mobile__search";
    searchContainer.setAttribute("role", "search");
    searchContainer.setAttribute("aria-label", "Site search");
    searchContainer.action = "#";
    searchContainer.onsubmit = (e) => {
      e.preventDefault();
    };

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "header-mobile__search-input";
    searchInput.placeholder = "Search";
    searchInput.setAttribute("aria-label", "Search");
    searchInput.autocomplete = "off";

    const searchBtn = document.createElement("button");
    searchBtn.type = "submit";
    searchBtn.className = "header-mobile__search-btn";
    searchBtn.setAttribute("aria-label", "Submit search");
    const searchBtnImg = document.createElement("img");
    searchBtnImg.src = "/public/assets/icons/icons-svg/black/search.svg";
    searchBtnImg.alt = "Search";
    searchBtn.appendChild(searchBtnImg);

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    lower.appendChild(searchContainer);
  } else {
    lower.classList.add("header-mobile__lower--breadcrumb");
    const breadcrumbNav = document.querySelector("nav.breadcrumb");

    if (breadcrumbNav && breadcrumbNav.dataset.breadcrumb) {
      const breadcrumbData = breadcrumbNav.dataset.breadcrumb;
      const parts = breadcrumbData
        .split(">")
        .map((p) => p.trim())
        .filter(Boolean);

      const breadcrumbs = document.createElement("nav");
      breadcrumbs.className = "header-mobile__breadcrumbs";
      breadcrumbs.setAttribute("aria-label", "Breadcrumb");

      const breadcrumbsList = document.createElement("ol");
      breadcrumbsList.className = "header-mobile__breadcrumbs-list";

      const homeItem = document.createElement("li");
      const homeLink = document.createElement("a");
      homeLink.href = "/public/index.html";
      homeLink.textContent = "Home";
      homeItem.appendChild(homeLink);
      breadcrumbsList.appendChild(homeItem);

      parts.forEach((part, index) => {
        const item = document.createElement("li");
        if (index < parts.length - 1) {
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
      lower.appendChild(breadcrumbs);
      breadcrumbNav.style.display = "none";
    } else {
      const breadcrumbs = document.createElement("nav");
      breadcrumbs.className = "header-mobile__breadcrumbs";
      breadcrumbs.setAttribute("aria-label", "Breadcrumb");

      const breadcrumbsList = document.createElement("ol");
      breadcrumbsList.className = "header-mobile__breadcrumbs-list";

      const homeItem = document.createElement("li");
      const homeLink = document.createElement("a");
      homeLink.href = "/public/index.html";
      homeLink.textContent = "Home";
      homeItem.appendChild(homeLink);
      breadcrumbsList.appendChild(homeItem);

      const currentItem = document.createElement("li");
      currentItem.setAttribute("aria-current", "page");
      const pageName =
        document.title.split("|")[1]?.trim() ||
        window.location.pathname.split("/").pop().replace(".html", "");
      currentItem.textContent = pageName;
      breadcrumbsList.appendChild(currentItem);

      breadcrumbs.appendChild(breadcrumbsList);
      lower.appendChild(breadcrumbs);
    }
  }

  header.appendChild(upper);
  header.appendChild(lower);

  document.body.insertAdjacentElement("afterbegin", header);

  if (!isLoggedIn) {
    const adBanner = document.createElement("div");
    adBanner.className = "header-mobile__ad";
    adBanner.innerHTML = `
      <p>
        <a href="/src/pages/register.html">Sign up now</a> and get 20% off your first order
      </p>
    `;
    document.body.insertAdjacentElement("afterbegin", adBanner);
  }

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
  const navLogoH1 = document.createElement("h1");
  navLogoH1.textContent = "E.CO";
  navLogo.appendChild(navLogoImg);
  navLogo.appendChild(navLogoH1);

  navHeader.appendChild(closeButton);
  navHeader.appendChild(navLogo);

  const navBody = document.createElement("div");
  navBody.className = "mobile-nav__body";

  const upperLinks = document.createElement("ul");
  upperLinks.className = "mobile-nav__links";

  const upperLinkData = [
    {
      href: "/public/index.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-home.svg",
      text: "Home",
    },
    {
      href: "/src/pages/storefront.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-shopping.svg",
      text: "Shop",
    },
    {
      href: "/src/pages/storefront.html?sale=true",
      imgSrc: "/public/assets/icons/icons-svg/black/line-sale.svg",
      text: "Sale",
    },
    {
      href: "/src/pages/about.html",
      imgSrc: "/public/assets/icons/icons-svg/black/info.svg",
      text: "About",
    },
    {
      href: "/src/pages/contact.html",
      imgSrc: "/public/assets/icons/icons-svg/black/headphones.svg",
      text: "Contact",
    },
  ];

  upperLinkData.forEach((data) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = data.href;
    const img = document.createElement("img");
    img.src = data.imgSrc;
    img.alt = "";
    a.appendChild(img);
    a.appendChild(document.createTextNode(data.text));
    li.appendChild(a);
    upperLinks.appendChild(li);
  });

  const lowerSection = document.createElement("div");
  lowerSection.className = "mobile-nav__lower-section";

  const lowerLinks = document.createElement("ul");
  lowerLinks.className = "mobile-nav__links";

  const lowerLinkData = [
    {
      href: "/src/pages/wishlist.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-heart.svg",
      text: "Wishlist",
    },
    {
      href: isLoggedIn ? "/src/pages/user.html" : "/src/pages/log-in.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-user.svg",
      text: isLoggedIn ? "Account" : "Log In",
    },
  ];

  lowerLinkData.forEach((data) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = data.href;
    const img = document.createElement("img");
    img.src = data.imgSrc;
    img.alt = "";
    a.appendChild(img);
    a.appendChild(document.createTextNode(data.text));
    li.appendChild(a);
    lowerLinks.appendChild(li);
  });

  lowerSection.appendChild(lowerLinks);

  navBody.appendChild(upperLinks);
  navBody.appendChild(lowerSection);

  navMenu.appendChild(navHeader);
  navMenu.appendChild(navBody);

  document.body.appendChild(navMenu);

  const navOverlay = document.createElement("div");
  navOverlay.className = "mobile-nav-overlay";
  document.body.appendChild(navOverlay);

  const openMenu = () => {
    navMenu.classList.add("is-open");
    navOverlay.classList.add("is-open");
    const adBanner = document.querySelector(".header-mobile__ad");
    const adBannerHeight = adBanner ? adBanner.offsetHeight : 0;
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

  // Desktop Header
  const desktopHeader = document.createElement("header");
  desktopHeader.className = "header-desktop";

  // -- Upper Desktop Header --
  const desktopUpper = document.createElement("div");
  desktopUpper.className = "header-desktop__upper";

  const desktopLogoContainer = document.createElement("a");
  desktopLogoContainer.className = "header-desktop__logo-container";
  desktopLogoContainer.href = "/public/index.html";

  const desktopLogoImg = document.createElement("img");
  desktopLogoImg.src = "/public/assets/img/logo/logo.webp";
  desktopLogoImg.alt = "E.CO Logo";
  desktopLogoImg.className = "header-desktop__logo-img";

  const desktopLogoText = document.createElement("span");
  desktopLogoText.className = "header-desktop__logo-text";
  desktopLogoText.textContent = "E.CO";

  desktopLogoContainer.appendChild(desktopLogoImg);
  desktopLogoContainer.appendChild(desktopLogoText);

  const desktopNav = document.createElement("nav");
  desktopNav.className = "header-desktop__nav";
  const desktopNavList = document.createElement("ul");
  desktopNavList.className = "header-desktop__nav-list";

  const desktopNavItems = [
    { text: "Home", href: "/public/index.html" },
    { text: "Shop", href: "/src/pages/storefront.html" },
    { text: "Sale", href: "/src/pages/storefront.html?sale=true" },
    { text: "About", href: "/src/pages/about.html" },
    { text: "Contact", href: "/src/pages/contact.html" },
  ];

  desktopNavItems.forEach((item) => {
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

  const desktopIconData = [
    {
      href: "/src/pages/wishlist.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-heart.svg",
      alt: "Wishlist",
      ariaLabel: "View wishlist",
    },
    {
      href: isLoggedIn ? "/src/pages/user.html" : "/src/pages/log-in.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-user.svg",
      alt: "User Account",
      ariaLabel: "User account",
    },
    {
      href: "/src/pages/cart.html",
      imgSrc: "/public/assets/icons/icons-svg/black/line-cart.svg",
      alt: "Cart",
      ariaLabel: "View cart",
    },
  ];

  desktopIconData.forEach((data) => {
    const a = document.createElement("a");
    a.href = data.href;
    a.className = "header-desktop__icon";
    a.setAttribute("aria-label", data.ariaLabel);
    const img = document.createElement("img");
    img.src = data.imgSrc;
    img.alt = data.alt;
    a.appendChild(img);
    desktopIcons.appendChild(a);
  });

  desktopUpper.appendChild(desktopLogoContainer);
  desktopUpper.appendChild(desktopNav);
  desktopUpper.appendChild(desktopIcons);

  desktopHeader.appendChild(desktopUpper);

  // -- Lower Desktop Header --
  const desktopLower = document.createElement("div");
  desktopLower.className = "header-desktop__lower";
  // Lower part will be built in the next step

  desktopHeader.appendChild(desktopLower);

  document.body.insertAdjacentElement("afterbegin", desktopHeader);
});
