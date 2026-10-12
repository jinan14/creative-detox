import { PAYMENT_METHODS } from '../models/customerSchema.js';

const PHONE_RE = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an error message string, or null when the customer block is valid.
export const validateCustomer = (customer) => {
  if (!customer || typeof customer !== 'object') return 'Customer information is required';

  const { fullName, phone, email, city, address, paymentMethod } = customer;
  if (!fullName?.trim() || !phone?.trim() || !email?.trim() || !city?.trim() || !address?.trim()) {
    return 'Full name, phone, email, city, and address are required';
  }
  if (!PHONE_RE.test(phone.trim())) return 'Please enter a valid phone number';
  if (!EMAIL_RE.test(email.trim())) return 'Please enter a valid email address';
  if (!PAYMENT_METHODS.includes(paymentMethod)) return 'Please choose a payment method';

  return null;
};

export const pickCustomer = ({ fullName, phone, email, city, address, notes, paymentMethod }) => ({
  fullName,
  phone,
  email,
  city,
  address,
  notes,
  paymentMethod,
});
