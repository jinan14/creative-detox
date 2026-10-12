// Keep in sync with src/utils/gypsumOptions.js. The server recomputes the
// price itself so the client can't send a lower total.
export const SHAPES = ['rectangle', 'square', 'circle'];
export const SIZES = ['Small', 'Medium', 'Large'];

const BASE_PRICE = { Small: 30, Medium: 40, Large: 50 };
export const GOLD_PAPER_PRICE = 5;
export const DESIGN_PRICE = 10;

// Small pieces are too small to carry a design.
export const designAllowed = (size) => size !== 'Small';

export const gypsumPrice = ({ size, goldPaper, design }) =>
  BASE_PRICE[size] + (goldPaper ? GOLD_PAPER_PRICE : 0) + (design ? DESIGN_PRICE : 0);
