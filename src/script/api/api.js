const API_BASE = "https://v2.api.noroff.dev";
const PRODUCTS_ENDPOINT = "/online-shop";
const API_KEY = "9f463d01-0fdc-41b4-8262-5fd8306ffdfb";

export async function fetchAllProducts() {
  const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}`, {
    headers: {
      "X-Noroff-API-Key": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  const json = await response.json();
  return json.data;
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}/${id}`, {
    headers: {
      "X-Noroff-API-Key": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  const json = await response.json();
  return json.data;
}

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(userData),
  });

  const json = await response.json();

  if (!response.ok) {
    const errorMessage =
      json.errors?.[0]?.message || "Registration failed. Please try again.";
    throw new Error(errorMessage);
  }

  return json;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(credentials),
  });

  const json = await response.json();

  if (!response.ok) {
    const errorMessage =
      json.errors?.[0]?.message ||
      "Login failed. Please check your credentials.";
    throw new Error(errorMessage);
  }

  return json.data;
}
