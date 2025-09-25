export function createProductCard(product) {
  const card = document.createElement("a");
  card.className = "product-link product-card-base product-card";
  card.href = `/src/pages/product-specific.html?id=${product.id}`;

  const img = document.createElement("img");
  img.className = "product-img";
  img.src = product.image?.url || "/public/assets/img/placeholder.jpg";
  img.alt = product.image?.alt || product.title;
  card.appendChild(img);

  const title = document.createElement("h2");
  title.className = "product-title-carousel";
  title.textContent = product.title;
  card.appendChild(title);

  if (product.tags && Array.isArray(product.tags) && product.tags.length > 0) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "product-tags";
    tagsDiv.textContent = product.tags
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .join(", ");
    card.appendChild(tagsDiv);
  }

  const priceSpan = document.createElement("span");
  priceSpan.className = "product-price-carousel";
  if (product.discountedPrice && product.discountedPrice < product.price) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price-carousel";
    oldPrice.textContent = `${product.price.toFixed(2)},-`;
    priceSpan.appendChild(oldPrice);
    priceSpan.appendChild(document.createTextNode(" "));
    const discounted = document.createElement("span");
    discounted.className = "discounted-price-carousel";
    discounted.textContent = `${product.discountedPrice.toFixed(2)},-`;
    priceSpan.appendChild(discounted);
  } else {
    priceSpan.textContent = `${product.price.toFixed(2)},-`;
  }
  const pricesDiv = document.createElement("div");
  pricesDiv.className = "product-prices";
  pricesDiv.appendChild(priceSpan);
  card.appendChild(pricesDiv);

  const btn = document.createElement("button");
  btn.className = "btn-small";
  btn.type = "button";
  btn.textContent = "Add to cart";
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
  card.appendChild(btn);

  return card;
}
