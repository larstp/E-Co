export function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
}

export function updateCartBadges() {
  document
    .querySelectorAll(
      ".header-mobile__icon[aria-label='View cart'], .header-desktop__icons a[aria-label='View cart']"
    )
    .forEach((el) => {
      const badge = el.querySelector(".cart-counter-badge");
      if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      }
    });
}
