/**
 * Creates the product info section with description, tags, color selector, stock status, and delivery info
 * @param {Object} product - The product object
 * @returns {HTMLElement[]} Array of elements to append to the parent container
 */
export function createProductInfo(product) {
  const elements = [];

  const desc = document.createElement("p");
  desc.className = "product-desc product-info-block";
  desc.textContent = product.description;
  elements.push(desc);

  if (Array.isArray(product.tags) && product.tags.length) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags product-info-block";
    product.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "product-tag product-info-block";
      tagSpan.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
      tagsDiv.appendChild(tagSpan);
    });
    elements.push(tagsDiv);
  }

  const separator = document.createElement("hr");
  separator.className = "product-separator";
  elements.push(separator);

  const colorDiv = document.createElement("div");
  colorDiv.className = "product-colors product-info-block";
  const colorLabel = document.createElement("p");
  colorLabel.textContent = "Select colour:";
  colorLabel.style.marginBottom = "0.5rem";
  colorDiv.appendChild(colorLabel);

  const circlesRow = document.createElement("div");
  circlesRow.className = "product-colors-row";
  const colors = ["#000", "#d32f2f", "#1976d2", "#fbc02d"];
  colors.forEach((color, idx) => {
    const circle = document.createElement("span");
    circle.className = "product-color-circle product-info-block";
    circle.style.background = color;
    if (idx === 0) {
      circle.classList.add("selected");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "18");
      svg.setAttribute("height", "18");
      const polyline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polyline",
      );
      polyline.setAttribute("points", "4,10 8,14 14,6");
      polyline.style.fill = "none";
      polyline.style.stroke = "white";
      polyline.style.strokeWidth = "2";
      svg.appendChild(polyline);
      circle.appendChild(svg);
    }
    circlesRow.appendChild(circle);
  });
  colorDiv.appendChild(circlesRow);
  elements.push(colorDiv);

  const separator2 = document.createElement("hr");
  separator2.className = "product-separator";
  elements.push(separator2);

  const inStock = document.createElement("p");
  inStock.className = "product-in-stock product-info-block";
  inStock.textContent = "In Stock";
  elements.push(inStock);

  const deliverRow = document.createElement("div");
  deliverRow.className = "product-deliver-row product-info-block";
  const mapIcon = document.createElement("img");
  mapIcon.src = "../../public/assets/icons/icons-svg/black/map.svg";
  mapIcon.alt = "Map";
  mapIcon.className = "product-map-icon";

  const addressText = document.createElement("span");
  addressText.className = "product-address-text product-info-block";
  addressText.textContent = "Karl Johans gate 1, Oslo";
  deliverRow.appendChild(mapIcon);
  deliverRow.appendChild(addressText);
  elements.push(deliverRow);

  const deliveryTime = document.createElement("p");
  deliveryTime.className = "product-delivery-time product-info-block";
  deliveryTime.appendChild(
    document.createTextNode("Will be delivered within "),
  );
  const strong = document.createElement("strong");
  strong.textContent = "5 to 7 business days";
  deliveryTime.appendChild(strong);
  elements.push(deliveryTime);

  const separator3 = document.createElement("hr");
  separator3.className = "product-separator";
  elements.push(separator3);

  return elements;
}
