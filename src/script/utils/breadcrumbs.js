// Breadcrumbs utility for desktop--------------------------- (does not affect mobile header!!)

export function initBreadcrumbs() {
  document.querySelectorAll("nav.breadcrumb").forEach((nav) => {
    // Only render if empty (prevents double-render)
    if (nav.children.length > 0) return;
    let parts = [];
    // Prefer data-breadcrumb attribute
    const data = nav.getAttribute("data-breadcrumb");
    if (data) {
      // Split on / or > or > (allowing both separators)
      parts = data.split(/\s*[\/>]\s*/).filter(Boolean);
    } else if (document.title) {
      // Fallback: use document title (after | if present)
      const t = document.title.split("|")[1] || document.title;
      parts = [t.trim()];
    } else {
      // Fallback: use path
      const page = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");
      parts = [page.charAt(0).toUpperCase() + page.slice(1)];
    }
    // Build breadcrumb list
    const ol = document.createElement("ol");
    ol.className = "breadcrumb-list";
    // Always start with Home
    const homeLi = document.createElement("li");
    const homeA = document.createElement("a");
    homeA.href = "/index.html";
    homeA.textContent = "Home";
    homeLi.appendChild(homeA);
    ol.appendChild(homeLi);
    // Add rest
    parts.forEach((part, i) => {
      const li = document.createElement("li");
      if (i < parts.length - 1) {
        // Intermediate: make as link (could be improved with real URLs)
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = part;
        li.appendChild(a);
      } else {
        // Last: current page
        li.textContent = part;
        li.setAttribute("aria-current", "page");
      }
      ol.appendChild(li);
    });
    nav.appendChild(ol);
  });
}
