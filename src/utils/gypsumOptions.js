// Keep prices in sync with server/utils/gypsumPricing.js (the server recomputes them).
export const shapeOptions = [
  { value: "rectangle", label: "Rectangle" },
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
];

export const sizeOptions = ["Small", "Medium", "Large"];

const dimensions = {
  rectangle: { Small: "22cm × 15cm", Medium: "35cm × 17cm", Large: "40cm × 20cm" },
  square: { Small: "18cm × 18cm", Medium: "25cm × 25cm", Large: "30cm × 30cm" },
  circle: { Small: "18cm diameter", Medium: "25cm diameter", Large: "30cm diameter" },
};

export const sizePrices = { Small: 30, Medium: 40, Large: 50 };
export const GOLD_PAPER_PRICE = 5;
export const DESIGN_PRICE = 10;

export const sizeDimensions = (shape, size) => dimensions[shape]?.[size] || "";

export const shapeLabel = (shape) =>
  shapeOptions.find((s) => s.value === shape)?.label || "Rectangle";

// Small pieces are too small to carry a design.
export const designAllowed = (size) => size !== "Small";

export const priceBreakdown = ({ shape, size, goldPaper, design }) => {
  if (!size) return { lines: [], total: 0 };
  const lines = [{ label: `${size} ${shapeLabel(shape).toLowerCase()}`, amount: sizePrices[size] }];
  if (goldPaper) lines.push({ label: "Gold paper", amount: GOLD_PAPER_PRICE });
  if (design) lines.push({ label: "Design", amount: DESIGN_PRICE });
  return { lines, total: lines.reduce((sum, l) => sum + l.amount, 0) };
};
