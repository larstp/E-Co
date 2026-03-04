/**
 * Creates a quantity counter component with increment/decrement buttons
 * @returns {Object} Object containing the counter element and getValue function
 */
export function createQuantityCounter() {
  const counterRow = document.createElement("div");
  counterRow.className = "product-counter-row";

  const btnMinus = document.createElement("button");
  btnMinus.type = "button";
  btnMinus.className = "product-counter-btn";
  btnMinus.textContent = "-";

  const counterVal = document.createElement("span");
  counterVal.className = "product-counter-val";
  counterVal.textContent = "1";

  const btnPlus = document.createElement("button");
  btnPlus.type = "button";
  btnPlus.className = "product-counter-btn";
  btnPlus.textContent = "+";

  counterRow.appendChild(btnMinus);
  counterRow.appendChild(counterVal);
  counterRow.appendChild(btnPlus);

  btnMinus.addEventListener("click", () => {
    let val = parseInt(counterVal.textContent);
    if (val > 1) counterVal.textContent = val - 1;
  });

  btnPlus.addEventListener("click", () => {
    let val = parseInt(counterVal.textContent);
    counterVal.textContent = val + 1;
  });

  return {
    element: counterRow,
    getValue: () => parseInt(counterVal.textContent),
  };
}
