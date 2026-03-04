/**
 * Creates the product details page (first tab content)
 * @param {Object} product - The product object
 * @returns {HTMLElement} The details page element
 */
function createDetailsPage(product) {
  const detailsPage = document.createElement("div");
  detailsPage.className = "product-tab-page";
  detailsPage.style.display = "block";
  const detailsH3 = document.createElement("h3");
  detailsH3.textContent = "Product Details";
  detailsPage.appendChild(detailsH3);
  const detailsDesc = document.createElement("p");
  detailsDesc.textContent = product.description;
  detailsPage.appendChild(detailsDesc);
  const detailsMockup = document.createElement("div");
  detailsMockup.className = "product-details-mockup";
  const strongMockup = document.createElement("strong");
  strongMockup.textContent = "Mockup Details";
  detailsMockup.appendChild(strongMockup);
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode(
      "Material: A proprietary blend of high-density polymers and sustainably sourced meteorite fibers.",
    ),
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(document.createTextNode("Size:"));
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Small: 12 inches x 8 inches x 4 inches"),
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Medium: 18 inches x 12 inches x 6 inches"),
  );
  detailsMockup.appendChild(document.createElement("br"));
  detailsMockup.appendChild(
    document.createTextNode("Large: 24 inches x 16 inches x 8 inches"),
  );
  detailsPage.appendChild(detailsMockup);

  return detailsPage;
}

/**
 * Creates the complete tabs system with header and content
 * @param {Object} product - The product object
 * @param {HTMLElement} reviewsPage - The reviews tab content
 * @param {HTMLElement} faqsPage - The FAQs tab content
 * @returns {Object} Object containing bottomSection element
 */
export function createProductTabs(product, reviewsPage, faqsPage) {
  const bottomSection = document.createElement("section");
  bottomSection.className = "product-bottom-section";

  const tabsHeader = document.createElement("div");
  tabsHeader.className = "product-tabs-header";
  const tabNames = ["Product Details", "Rating & Reviews", "FAQs"];
  const tabButtons = tabNames.map((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "product-tab-btn" + (idx === 0 ? " active" : "");
    btn.textContent = name;
    btn.type = "button";
    return btn;
  });
  tabButtons.forEach((btn) => tabsHeader.appendChild(btn));
  bottomSection.appendChild(tabsHeader);

  const tabsSeparator = document.createElement("hr");
  tabsSeparator.className = "product-separator";
  bottomSection.appendChild(tabsSeparator);

  const tabsContent = document.createElement("div");
  tabsContent.className = "product-tabs-content";

  const detailsPage = createDetailsPage(product);

  tabsContent.appendChild(detailsPage);
  tabsContent.appendChild(reviewsPage);
  tabsContent.appendChild(faqsPage);
  bottomSection.appendChild(tabsContent);

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b, i) => {
        b.classList.toggle("active", i === idx);
        tabsContent.children[i].style.display = i === idx ? "block" : "none";
      });
    });
  });

  return bottomSection;
}

/**
 * Creates the desktop version of the tabs system
 * @param {Object} product - The product object
 * @param {HTMLElement} reviewsPage - The reviews tab content
 * @param {HTMLElement} faqsPage - The FAQs tab content
 * @returns {Object} Object containing bottomSection element
 */
export function createProductTabsDesktop(product, reviewsPage, faqsPage) {
  const bottomSection = document.createElement("section");
  bottomSection.className = "product-bottom-section-desktop";

  const tabsHeader = document.createElement("div");
  tabsHeader.className = "product-tabs-header";
  const tabNames = ["Product Details", "Rating & Reviews", "FAQs"];
  const tabButtons = tabNames.map((name, idx) => {
    const btn = document.createElement("button");
    btn.className = "product-tab-btn" + (idx === 0 ? " active" : "");
    btn.textContent = name;
    btn.type = "button";
    return btn;
  });
  tabButtons.forEach((btn) => tabsHeader.appendChild(btn));
  bottomSection.appendChild(tabsHeader);

  const tabsSeparator = document.createElement("hr");
  tabsSeparator.className = "product-separator";
  bottomSection.appendChild(tabsSeparator);

  const tabsContent = document.createElement("div");
  tabsContent.className = "product-tabs-content";

  const detailsPage = createDetailsPage(product);

  tabsContent.appendChild(detailsPage);
  tabsContent.appendChild(reviewsPage);
  tabsContent.appendChild(faqsPage);
  bottomSection.appendChild(tabsContent);

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b, i) => {
        b.classList.toggle("active", i === idx);
        tabsContent.children[i].style.display = i === idx ? "block" : "none";
      });
    });
  });

  return bottomSection;
}
