import { updateCartBadges } from "./cartCounter.js";
export function getCart() {
  try {
    const cartJson = localStorage.getItem("cart");
    return cartJson ? JSON.parse(cartJson) : [];
  } catch (error) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  updateCartBadges();
}
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadges();
}
export function updateItemQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex > -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else {
      cart.splice(itemIndex, 1);
    }
    saveCart(cart);
    updateCartBadges();
  }
}
export function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadges();
}
