import mongoose from 'mongoose';

// Delivery/contact details collected at checkout. Embedded (not a separate
// collection) in both Order and GypsumOrder so each order keeps a snapshot
// of where it should be delivered, even if the user's account changes later.
export const PAYMENT_METHODS = ['cash_on_delivery', 'wish_money'];

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
  },
  { _id: false }
);

export default customerSchema;
