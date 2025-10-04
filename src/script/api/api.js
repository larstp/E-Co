const API_BASE = "https://v2.api.noroff.dev";
const PRODUCTS_ENDPOINT = "/online-shop";
const API_KEY = "9f463d01-0fdc-41b4-8262-5fd8306ffdfb";

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}`, {
      headers: {
        "X-Noroff-API-Key": API_KEY,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE}${PRODUCTS_ENDPOINT}/${id}`, {
      headers: {
        "X-Noroff-API-Key": API_KEY,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch product");
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export async function registerUser(userData) {
  try {
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
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
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
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
}
