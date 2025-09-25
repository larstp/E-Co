const LOADER_ID = "global-loader-overlay";

export function showLoader() {
  if (document.getElementById(LOADER_ID)) return;
  const overlay = document.createElement("div");
  overlay.className = "loader-overlay";
  overlay.id = LOADER_ID;
  const ring = document.createElement("div");
  ring.className = "lds-ring";
  ring.setAttribute("role", "status");
  ring.setAttribute("aria-label", "Loading");
  for (let i = 0; i < 4; i++) {
    ring.appendChild(document.createElement("div"));
  }
  overlay.appendChild(ring);
  document.body.appendChild(overlay);
}

export function hideLoader() {
  const overlay = document.getElementById(LOADER_ID);
  if (overlay) overlay.remove();
}
