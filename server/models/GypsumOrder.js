import mongoose from 'mongoose';
import customerSchema from './customerSchema.js';
import { SHAPES, SIZES } from '../utils/gypsumPricing.js';

const gypsumOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  arabicText: { type: String, required: true },
  notes: { type: String },
  shape: { type: String, enum: SHAPES, default: 'rectangle' },
  size: { type: String, enum: SIZES, required: true },
  goldPaper: { type: Boolean, default: false },
  design: { type: Boolean, default: false },
  price: { type: Number },
  // Legacy: orders placed before gold paper replaced the color picker.
  color: { type: String },
  customer: { type: customerSchema },
  status: { type: String, enum: ['pending', 'in_production', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GypsumOrder', gypsumOrderSchema);
