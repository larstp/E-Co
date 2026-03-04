/**
 * Creates a product image gallery with main image and thumbnails
 * @param {Object} product - The product object containing image data
 * @param {boolean} isDesktop - Whether to use desktop layout
 * @returns {HTMLElement} The gallery element
 */
export function createProductGallery(product, isDesktop = false) {
  const gallery = document.createElement("div");
  gallery.className = "product-gallery";

  const mainImg = document.createElement("img");
  mainImg.className = "product-main-img";
  mainImg.src = product.image?.url || "";
  mainImg.alt = product.image?.alt || product.title;
  mainImg.width = 350;
  mainImg.height = 290;

  const thumbs = document.createElement("div");
  thumbs.className = "product-thumbnails";

  for (let i = 0; i < 3; i++) {
    const thumb = document.createElement("img");
    thumb.className = "product-thumb";
    thumb.src = product.image?.url || "";
    thumb.alt = product.image?.alt || product.title + " thumbnail";
    thumb.width = 80;
    thumb.height = 80;
    if (i === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;
      thumbs
        .querySelectorAll(".product-thumb")
        .forEach((el) => el.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbs.appendChild(thumb);
  }

  if (isDesktop) {
    gallery.appendChild(thumbs);
    gallery.appendChild(mainImg);
  } else {
    gallery.appendChild(mainImg);
    gallery.appendChild(thumbs);
  }

  return gallery;
}
