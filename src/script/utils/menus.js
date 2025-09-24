export function setupFilterMenu({
  allProductsRef,
  allCategoriesRef,
  allTagsRef,
  productsShownRef,
  PRODUCTS_PER_PAGE,
  renderProductsPage,
  setStorefrontTitle,
}) {
  let container = document.getElementById("storefront-container");
  if (!container) return;
  const filterMenu = createEl("div", { className: "mobile-filter-menu" });
  filterMenu.style.display = "none";
  const innerDiv = createEl("div", { className: "mobile-filter-menu__inner" });
  filterMenu.appendChild(innerDiv);
  const filterOverlay = createEl("div", {
    className: "mobile-filter-overlay",
  });
  filterOverlay.style.display = "none";
  container.appendChild(filterOverlay);
  container.appendChild(filterMenu);

  function getScrollbarWidth() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    container.style.overflow = "scroll";
    container.style.visibility = "hidden";
    container.style.position = "absolute";
    container.style.top = "-9999px";
    const inner = document.createElement("div");
    container.appendChild(inner);
    const scrollbarWidth = container.offsetWidth - inner.offsetWidth;
    document.body.removeChild(container);
    return scrollbarWidth;
  }
  function openFilterMenu() {
    filterMenu.style.display = "block";
    filterOverlay.style.display = "block";
    setTimeout(() => {
      filterMenu.classList.add("is-open");
      filterOverlay.classList.add("is-open");
    }, 10);
    const scrollBarWidth = getScrollbarWidth();
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = scrollBarWidth + "px";
    }
  }
  function closeFilterMenu() {
    filterMenu.classList.remove("is-open");
    filterOverlay.classList.remove("is-open");
    setTimeout(() => {
      filterMenu.style.display = "none";
      filterOverlay.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }, 300);
  }
  const sortBtn = container.querySelector(".storefront-sort-btn");
  if (sortBtn) sortBtn.addEventListener("click", openFilterMenu);
  filterOverlay.addEventListener("click", closeFilterMenu);
  filterMenu.addEventListener("click", (e) => {
    if (e.target === filterMenu) closeFilterMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (filterMenu.classList.contains("is-open") && e.key === "Escape")
      closeFilterMenu();
  });
  filterMenu.renderContent = function (categories, tags) {
    const inner = filterMenu.querySelector(".mobile-filter-menu__inner");
    while (inner.firstChild) {
      inner.removeChild(inner.firstChild);
    }
    const headingRow = createEl("div", {
      className: "filter-menu-heading-row",
    });
    const heading = createEl("h1", {
      className: "storefront-title",
      text: "Filters",
    });
    const closeBtn = createEl("button", {
      className: "filter-menu-close-btn",
    });
    const closeIcon = createEl("img", {
      attrs: {
        src: "/public/assets/icons/icons-svg/black/x.svg",
        alt: "Close filters menu",
      },
    });
    closeBtn.appendChild(closeIcon);
    closeBtn.addEventListener("click", closeFilterMenu);
    headingRow.appendChild(heading);
    headingRow.appendChild(closeBtn);
    inner.appendChild(headingRow);
    inner.appendChild(createEl("hr"));
    const catSection = createEl("div", { className: "filter-section" });

    // All Products
    const allBtn = createEl("button", {
      className: "filter-btn",
      text: "All Products",
    });
    allBtn.addEventListener("click", () => {
      closeFilterMenu();
      setStorefrontTitle("Products");
      productsShownRef.value = Math.min(
        PRODUCTS_PER_PAGE,
        allProductsRef.value.length
      );
      renderProductsPage();
      history.replaceState(null, "", window.location.pathname);
    });
    catSection.appendChild(allBtn);

    // SALE!
    const saleBtn = createEl("button", {
      className: "filter-sale-btn",
      text: "SALE!",
    });
    saleBtn.style.color = "#d32f2f";
    saleBtn.addEventListener("click", () => {
      closeFilterMenu();
      setStorefrontTitle("SALE!");
      productsShownRef.value = allProductsRef.value.length;
      renderProductsPage(
        allProductsRef.value.filter((p) => p.discountedPrice < p.price)
      );
      history.replaceState(null, "", window.location.pathname + "?sale=true");
    });
    catSection.appendChild(saleBtn);

    // New Arrivals
    const newBtn = createEl("button", {
      className: "filter-btn",
      text: "New Arrivals",
    });
    newBtn.addEventListener("click", () => {
      closeFilterMenu();
      setStorefrontTitle("New Arrivals");
      productsShownRef.value = allProductsRef.value.length;
      renderProductsPage(
        allProductsRef.value.filter((p) => !p.rating || p.rating === 0)
      );
      history.replaceState(null, "", window.location.pathname + "?new=true");
    });
    catSection.appendChild(newBtn);

    // Most Popular
    const popBtn = createEl("button", {
      className: "filter-btn",
      text: "Most Popular",
    });
    popBtn.addEventListener("click", () => {
      closeFilterMenu();
      setStorefrontTitle("Most Popular");
      productsShownRef.value = allProductsRef.value.length;
      renderProductsPage(
        [...allProductsRef.value].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        )
      );
      history.replaceState(
        null,
        "",
        window.location.pathname + "?popular=true"
      );
    });
    catSection.appendChild(popBtn);
    inner.appendChild(catSection);
    inner.appendChild(createEl("hr"));

    // Colours section (mockup)
    inner.appendChild(
      createEl("h1", { className: "storefront-title", text: "Colours" })
    );
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
    const colourGrid = createEl("div", { className: "filter-colour-grid" });
    colours.forEach((col) => {
      const circle = createEl("div", { className: "filter-colour-circle" });
      circle.style.background = col;
      circle.title = col;
      circle.tabIndex = 0;
      circle.style.cursor = "pointer";
      colourGrid.appendChild(circle);
    });
    inner.appendChild(colourGrid);
    inner.appendChild(createEl("hr"));

    // Sub-categories
    inner.appendChild(
      createEl("h1", {
        className: "storefront-title",
        text: "Sub-Categories",
      })
    );
    const subcatList = createEl("div", { className: "filter-subcat-list" });
    (tags || []).forEach((tag) => {
      const capTag = tag.charAt(0).toUpperCase() + tag.slice(1);
      const btn = createEl("button", {
        className: "filter-btn",
        text: capTag,
      });
      btn.addEventListener("click", () => {
        closeFilterMenu();
        setStorefrontTitle(capTag);
        productsShownRef.value = allProductsRef.value.length;
        renderProductsPage(
          allProductsRef.value.filter(
            (p) =>
              Array.isArray(p.tags) &&
              p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
          )
        );
        history.replaceState(
          null,
          "",
          window.location.pathname + "?tag=" + encodeURIComponent(tag)
        );
      });
      subcatList.appendChild(btn);
    });
    inner.appendChild(subcatList);
  };
  return filterMenu;
}

function createEl(tag, { className, attrs = {}, text, children = [] } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (text !== undefined) el.textContent = text;
  children.forEach((child) => el.appendChild(child));
  return el;
}
