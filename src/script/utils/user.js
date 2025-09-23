export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export function getUserProfile() {
  const profile = localStorage.getItem("userProfile");
  return profile ? JSON.parse(profile) : null;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userProfile");
  window.location.href = "/index.html";
}
