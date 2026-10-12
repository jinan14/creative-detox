import { paymentLabel, WISH_MONEY_NUMBER } from "./customerInfo";
import { shapeLabel, sizeDimensions } from "./gypsumOptions";
import { topicInfo, isBookingTopic } from "./inquiryTopics";

// Digits only, international format, no "+" — that's what wa.me expects.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "96176190801";

export const buildWhatsAppUrl = (message) =>
  message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

// Short human-friendly reference derived from the Mongo id, so the admin can
// match a WhatsApp message to the order in the dashboard.
export const orderReference = (prefix, id) => `${prefix}-${String(id).slice(-6).toUpperCase()}`;

const customerLines = (customer) => [
  "*Customer Details*",
  `Name: ${customer.fullName}`,
  `Phone: ${customer.phone}`,
  `Email: ${customer.email}`,
  `City: ${customer.city}`,
  `Address: ${customer.address}`,
  ...(customer.notes?.trim() ? [`Delivery notes: ${customer.notes.trim()}`] : []),
];

const paymentLines = (customer) => {
  const lines = ["*Payment*", `Method: ${paymentLabel(customer.paymentMethod)}`];
  if (customer.paymentMethod === "wish_money") {
    lines.push(`I will transfer the total to ${WISH_MONEY_NUMBER} via Wish Money.`);
  }
  return lines;
};

export const buildArtworkOrderMessage = ({ reference, items, total, customer }) =>
  [
    "Hello Creative Detox! I'd like to place an order.",
    `Order: ${reference}`,
    "",
    "*Artworks*",
    ...items.map((item, i) => `${i + 1}. "${item.title}" by ${item.artist} - $${item.price}`),
    `*Total: $${total}*`,
    "",
    ...customerLines(customer),
    "",
    ...paymentLines(customer),
  ].join("\n");

export const buildGypsumOrderMessage = ({ reference, piece, price, customer }) =>
  [
    "Hello Creative Detox! I'd like to order a custom gypsum piece.",
    `Order: ${reference}`,
    "",
    "*Gypsum Piece*",
    `Arabic text: ${piece.arabicText}`,
    `Shape: ${shapeLabel(piece.shape)}`,
    `Size: ${piece.size} (${sizeDimensions(piece.shape, piece.size)})`,
    `Gold paper: ${piece.goldPaper ? "Yes" : "No"}`,
    `Design: ${piece.design ? "Yes - I'll share my inspiration here" : "No"}`,
    ...(piece.notes?.trim() ? [`Notes: ${piece.notes.trim()}`] : []),
    "",
    "*Price*",
    ...price.lines.map((line) => `${line.label}: $${line.amount}`),
    `*Total: $${price.total}*`,
    "",
    ...customerLines(customer),
    "",
    ...paymentLines(customer),
  ].join("\n");

// "2026-12-05" -> "December 5, 2026" (parsed as a local date, not UTC).
const formatDay = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export const buildInquiryMessage = (inquiry) => {
  const topic = topicInfo(inquiry.topic);
  const booking = isBookingTopic(inquiry.topic);
  return [
    `Hello Creative Detox! ${topic ? `${topic.emoji} ` : ""}${topic?.label || "I have a question"}`,
    "",
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    ...(inquiry.email?.trim() ? [`Email: ${inquiry.email.trim()}`] : []),
    ...(booking && inquiry.preferredDate ? [`Preferred date: ${formatDay(inquiry.preferredDate)}`] : []),
    ...(booking && inquiry.groupSize ? [`Number of people: ${inquiry.groupSize}`] : []),
    ...(inquiry.message?.trim() ? ["", inquiry.message.trim()] : []),
  ].join("\n");
};
