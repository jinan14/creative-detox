// Shared by the artwork checkout and the gypsum order form.
export const WISH_MONEY_NUMBER = "+961 76 190 801";

export const paymentMethods = [
  {
    value: "cash_on_delivery",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives.",
  },
  {
    value: "wish_money",
    label: "Wish Money",
    description: `Transfer the amount to ${WISH_MONEY_NUMBER} via Wish Money.`,
  },
];

export const paymentLabel = (value) =>
  paymentMethods.find((m) => m.value === value)?.label || value;

export const emptyCustomer = (user) => ({
  fullName: user?.name || "",
  phone: "",
  email: user?.email || "",
  city: "",
  address: "",
  notes: "",
  paymentMethod: "",
});

const PHONE_RE = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors server/utils/validateCustomer.js, but returns per-field errors for the form.
export const validateCustomer = (customer) => {
  const e = {};
  if (!customer.fullName.trim()) e.fullName = "Full name is required";
  if (!customer.phone.trim()) e.phone = "Phone number is required";
  else if (!PHONE_RE.test(customer.phone.trim())) e.phone = "Please enter a valid phone number";
  if (!customer.email.trim()) e.email = "Email is required";
  else if (!EMAIL_RE.test(customer.email.trim())) e.email = "Please enter a valid email address";
  if (!customer.city.trim()) e.city = "City is required";
  if (!customer.address.trim()) e.address = "Address is required";
  if (!customer.paymentMethod) e.paymentMethod = "Please choose a payment method";
  return e;
};
