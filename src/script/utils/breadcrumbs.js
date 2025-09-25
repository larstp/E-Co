export function initBreadcrumbs() {
  document.querySelectorAll("nav.breadcrumb").forEach((nav) => {
    if (nav.children.length > 0) return;
    let parts = [];
    const data = nav.getAttribute("data-breadcrumb");
    const isCheckout = window.location.pathname.endsWith("checkout.html");
    if (isCheckout) {
      parts = [
        { label: "Cart", href: "/src/pages/cart.html" },
        { label: "Checkout", href: null },
      ];
    } else if (data) {
      parts = data
        .split(/\s*[\/>]\s*/)
        .filter(Boolean)
        .map((label) => {
          if (label === "Shop" || label === "Store") {
            return { label: "Shop", href: "/src/pages/storefront.html" };
          }
          if (label === "Account") {
            return { label: "Account", href: "/src/pages/user.html" };
          }
          return { label, href: null };
        });
    } else if (document.title) {
      const t = document.title.split("|")[1] || document.title;
      parts = [{ label: t.trim(), href: null }];
    } else {
      const page = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");
      parts = [
        { label: page.charAt(0).toUpperCase() + page.slice(1), href: null },
      ];
    }
    const ol = document.createElement("ol");
    ol.className = "breadcrumb-list";
    const homeLi = document.createElement("li");
    const homeA = document.createElement("a");
    homeA.href = "/index.html";
    homeA.textContent = "Home";
    homeLi.appendChild(homeA);
    ol.appendChild(homeLi);
    parts.forEach((part, i) => {
      const li = document.createElement("li");
      if (part.href && i < parts.length - 1) {
        const a = document.createElement("a");
        a.href = part.href;
        a.textContent = part.label;
        li.appendChild(a);
      } else {
        li.textContent = part.label;
        li.setAttribute("aria-current", "page");
      }
      ol.appendChild(li);
    });
    nav.appendChild(ol);
  });
}
