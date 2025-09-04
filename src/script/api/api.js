const API_BASE = "https://v2.api.noroff.dev";
const PRODUCTS_ENDPOINT = "/online-shop";

export async function fetchAllProducts() {
  const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  const json = await response.json();
  return json.data;
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  const json = await response.json();
  return json.data;
}
