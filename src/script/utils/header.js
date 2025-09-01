// Dynamically insert mobile header for index.html
document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.endsWith("index.html")) return;

  const header = document.createElement("header");
  header.className = "header-mobile";

  const upper = document.createElement("div");
  upper.className = "header-mobile__upper";

  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "header-mobile__hamburger";
  hamburgerBtn.setAttribute("aria-label", "Open menu");
  hamburgerBtn.innerHTML = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.75 7.03125C3.75 6.65829 3.89816 6.3006 4.16188 6.03688C4.4256 5.77316 4.78329 5.625 5.15625 5.625H24.8438C25.2167 5.625 25.5744 5.77316 25.8381 6.03688C26.1018 6.3006 26.25 6.65829 26.25 7.03125C26.25 7.40421 26.1018 7.7619 25.8381 8.02562C25.5744 8.28934 25.2167 8.4375 24.8438 8.4375H5.15625C4.78329 8.4375 4.4256 8.28934 4.16188 8.02562C3.89816 7.7619 3.75 7.40421 3.75 7.03125ZM3.75 14.5312C3.75 14.1583 3.89816 13.8006 4.16188 13.5369C4.4256 13.2732 4.78329 13.125 5.15625 13.125H24.8438C25.2167 13.125 25.5744 13.2732 25.8381 13.5369C26.1018 13.8006 26.25 14.1583 26.25 14.5312C26.25 14.9042 26.1018 15.2619 25.8381 15.5256C25.5744 15.7893 25.2167 15.9375 24.8438 15.9375H5.15625C4.78329 15.9375 4.4256 15.7893 4.16188 15.5256C3.89816 15.2619 3.75 14.9042 3.75 14.5312ZM3.75 22.0312C3.75 21.6583 3.89816 21.3006 4.16188 21.0369C4.4256 20.7732 4.78329 20.625 5.15625 20.625H24.8438C25.2167 20.625 25.5744 20.7732 25.8381 21.0369C26.1018 21.3006 26.25 21.6583 26.25 22.0312C26.25 22.4042 26.1018 22.7619 25.8381 23.0256C25.5744 23.2893 25.2167 23.4375 24.8438 23.4375H5.15625C4.78329 23.4375 4.4256 23.2893 4.16188 23.0256C3.89816 22.7619 3.75 22.4042 3.75 22.0312Z" fill="black"/>
</svg>
`;

  const logoLink = document.createElement("a");
  logoLink.className = "header-mobile__logo";
  logoLink.href = "index.html";
  logoLink.textContent = "E.CO";
  logoLink.setAttribute("aria-label", "Go to homepage");

  const icons = document.createElement("div");
  icons.className = "header-mobile__icons";

  const userLink = document.createElement("a");
  userLink.className = "header-mobile__icon";
  userLink.href = "sign-in.html"; // Update with logic if logged in
  userLink.setAttribute("aria-label", "User account");
  userLink.innerHTML = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_431_17783)">
<path d="M20.625 13.125C20.625 16.2375 18.1125 18.75 15 18.75C11.8875 18.75 9.375 16.2375 9.375 13.125C9.375 10.0125 11.8875 7.5 15 7.5C18.1125 7.5 20.625 10.0125 20.625 13.125Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15ZM7.5 25.7812C7.8 25.2825 10.7062 20.625 14.9812 20.625C19.2375 20.625 22.1625 25.2938 22.4625 25.7812C24.206 24.5756 25.6306 22.9645 26.6137 21.0865C27.5968 19.2085 28.109 17.1198 28.1062 15C28.1062 7.74375 22.2375 1.875 14.9812 1.875C7.725 1.875 1.85625 7.74375 1.85625 15C1.85625 19.4625 4.0875 23.4188 7.5 25.7812Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_431_17783">
<rect width="30" height="30" fill="white"/>
</clipPath>
</defs>
</svg>
`;

  // Cart icon
  const cartLink = document.createElement("a");
  cartLink.className = "header-mobile__icon";
  cartLink.href = "cart.html";
  cartLink.setAttribute("aria-label", "View cart");
  cartLink.innerHTML = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.25 22.5C21.913 22.5 22.5489 22.7634 23.0178 23.2322C23.4866 23.7011 23.75 24.337 23.75 25C23.75 25.663 23.4866 26.2989 23.0178 26.7678C22.5489 27.2366 21.913 27.5 21.25 27.5C20.587 27.5 19.9511 27.2366 19.4822 26.7678C19.0134 26.2989 18.75 25.663 18.75 25C18.75 23.6125 19.8625 22.5 21.25 22.5ZM1.25 2.5H5.3375L6.5125 5H25C25.3315 5 25.6495 5.1317 25.8839 5.36612C26.1183 5.60054 26.25 5.91848 26.25 6.25C26.25 6.4625 26.1875 6.675 26.1 6.875L21.625 14.9625C21.2 15.725 20.375 16.25 19.4375 16.25H10.125L9 18.2875L8.9625 18.4375C8.9625 18.5204 8.99542 18.5999 9.05403 18.6585C9.11263 18.7171 9.19212 18.75 9.275 18.75H23.75V21.25H8.75C8.08696 21.25 7.45107 20.9866 6.98223 20.5178C6.51339 20.0489 6.25 19.413 6.25 18.75C6.25 18.3125 6.3625 17.9 6.55 17.55L8.25 14.4875L3.75 5H1.25V2.5ZM8.75 22.5C9.41304 22.5 10.0489 22.7634 10.5178 23.2322C10.9866 23.7011 11.25 24.337 11.25 25C11.25 25.663 10.9866 26.2989 10.5178 26.7678C10.0489 27.2366 9.41304 27.5 8.75 27.5C8.08696 27.5 7.45107 27.2366 6.98223 26.7678C6.51339 26.2989 6.25 25.663 6.25 25C6.25 23.6125 7.3625 22.5 8.75 22.5ZM20 13.75L23.475 7.5H7.675L10.625 13.75H20Z" fill="black"/>
</svg>
`;

  icons.appendChild(userLink);
  icons.appendChild(cartLink);

  upper.appendChild(hamburgerBtn);
  upper.appendChild(logoLink);
  upper.appendChild(icons);

  const lower = document.createElement("div");
  lower.className = "header-mobile__lower";

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
  searchBtn.innerHTML = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.875 20C9.60417 20 7.6825 19.2133 6.11 17.64C4.5375 16.0667 3.75083 14.145 3.75 11.875C3.74917 9.605 4.53583 7.68333 6.11 6.11C7.68417 4.53667 9.60583 3.75 11.875 3.75C14.1442 3.75 16.0663 4.53667 17.6413 6.11C19.2163 7.68333 20.0025 9.605 20 11.875C20 12.7917 19.8542 13.6562 19.5625 14.4687C19.2708 15.2812 18.875 16 18.375 16.625L25.375 23.625C25.6042 23.8542 25.7188 24.1458 25.7188 24.5C25.7188 24.8542 25.6042 25.1458 25.375 25.375C25.1458 25.6042 24.8542 25.7188 24.5 25.7188C24.1458 25.7188 23.8542 25.6042 23.625 25.375L16.625 18.375C16 18.875 15.2813 19.2708 14.4688 19.5625C13.6563 19.8542 12.7917 20 11.875 20ZM11.875 17.5C13.4375 17.5 14.7658 16.9533 15.86 15.86C16.9542 14.7667 17.5008 13.4383 17.5 11.875C17.4992 10.3117 16.9525 8.98375 15.86 7.89125C14.7675 6.79875 13.4392 6.25167 11.875 6.25C10.3108 6.24833 8.98292 6.79542 7.89125 7.89125C6.79958 8.98708 6.2525 10.315 6.25 11.875C6.2475 13.435 6.79458 14.7633 7.89125 15.86C8.98792 16.9567 10.3158 17.5033 11.875 17.5Z" fill="black"/>
</svg>
`;

  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchBtn);
  lower.appendChild(searchContainer);

  header.appendChild(upper);
  header.appendChild(lower);

  document.body.insertAdjacentElement("afterbegin", header);
});
