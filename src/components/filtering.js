import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    const options = Object.values(indexes[elementName]).map((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      return opt;
    });
    elements[elementName].append(...options);
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const field = action.dataset.field;
      const parent = action.parentElement || elements[field]?.parentElement;
      const input =
        parent?.querySelector(`[name="${field}"]`) ||
        parent?.querySelector("input, select, textarea");

      if (input) input.value = "";
      if (field in state) state[field] = "";
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
