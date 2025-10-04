/**
 * Displays a message in a specified container and clears it after a timeout.
 * @param {string} containerSelector - The CSS selector for the message container.
 * @param {string} message - The message to display.
 * @param {string} type - The type of message ('success' or 'error').
 */
export function displayMessage(containerSelector, message, type) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Message container not found: ${containerSelector}`);
    return;
  }

  container.textContent = message;
  container.className = `message-container ${type}`; // Reset classes and apply new one

  // Clear the message after 3 seconds
  setTimeout(() => {
    container.textContent = "";
    container.className = "message-container";
  }, 3000);
}
