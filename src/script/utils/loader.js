
const LOADER_ID = "global-loader-overlay";

export function showLoader() {
  if (document.getElementById(LOADER_ID)) return; 
  const overlay = document.createElement("div");
  overlay.className = "loader-overlay";
  overlay.id = LOADER_ID;
  overlay.innerHTML = `
    <div class="lds-ring" role="status" aria-label="Loading">
      <div></div><div></div><div></div><div></div>
    </div>
  `;
  document.body.appendChild(overlay);
}

export function hideLoader() {
  const overlay = document.getElementById(LOADER_ID);
  if (overlay) overlay.remove();
}
