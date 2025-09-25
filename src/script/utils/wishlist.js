const WISHLIST_KEY = "wishlist";

export function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function addToWishlist(product) {
  const wishlist = getWishlist();
  if (!wishlist.some((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter((item) => item.id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function isWishlisted(productId) {
  return getWishlist().some((item) => item.id === productId);
}

export function clearWishlist() {
  localStorage.removeItem(WISHLIST_KEY);
}
