import { getWishlist, removeFromWishlist } from "./utils/wishlist.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    main.setAttribute("role", "main");
    body.appendChild(main);
  }
  main.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Your Wishlist";
  main.appendChild(heading);

  const wishlist = getWishlist();
  if (wishlist.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Your wishlist is empty.";
    main.appendChild(emptyMsg);
    import("./utils/footer.js").then((mod) => {
      const footer = mod.buildFooter();
      document.body.appendChild(footer);
    });
    return;
  }

  const list = document.createElement("ul");
  list.className = "wishlist-list";
  wishlist.forEach((item) => {
    const li = document.createElement("li");
    li.className = "wishlist-item";

    // ----------------------------------------------------------------  Info container
    const infoContainer = document.createElement("div");
    infoContainer.className = "wishlist-info-container";

    const img = document.createElement("img");
    img.src = item.image?.url || "/public/assets/img/placeholder.jpg";
    img.alt = item.image?.alt || item.title;
    img.className = "wishlist-img";
    infoContainer.appendChild(img);

    const title = document.createElement("span");
    title.className = "wishlist-title";
    title.textContent = item.title;
    infoContainer.appendChild(title);

    const price = document.createElement("span");
    price.className = "wishlist-price";
    price.textContent =
      item.discountedPrice < item.price
        ? `${item.discountedPrice.toFixed(2)},-`
        : `${item.price.toFixed(2)},-`;
    infoContainer.appendChild(price);

    li.appendChild(infoContainer);

    // -----------------------------------------------------------  Button container
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "wishlist-actions-container";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-small wishlist-remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeFromWishlist(item.id);
      li.remove();
      if (list.children.length === 0) {
        main.innerHTML = "<h2>Your Wishlist</h2><p>Your wishlist is empty.</p>";
        import("./utils/footer.js").then((mod) => {
          const footer = mod.buildFooter();
          document.body.appendChild(footer);
        });
      }
    });
    actionsContainer.appendChild(removeBtn);

    const viewBtn = document.createElement("a");
    viewBtn.className = "btn-small wishlist-view-btn";
    viewBtn.textContent = "View";
    viewBtn.href = `/src/pages/product.html?id=${item.id}`;
    actionsContainer.appendChild(viewBtn);

    li.appendChild(actionsContainer);

    list.appendChild(li);
  });
  main.appendChild(list);

  const emptyBtn = document.createElement("button");
  emptyBtn.className = "btn-large-white";
  emptyBtn.textContent = "Empty wishlist";
  emptyBtn.style.display = "block";
  emptyBtn.style.margin = "2rem auto 0 auto";
  emptyBtn.style.width = "100%";
  emptyBtn.addEventListener("click", () => {
    localStorage.removeItem("wishlist");
    window.location.reload();
  });
  main.appendChild(emptyBtn);

  import("./utils/footer.js").then((mod) => {
    const footer = mod.buildFooter();
    document.body.appendChild(footer);
  });
});
