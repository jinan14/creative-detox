import mongoose from 'mongoose';
import customerSchema from './customerSchema.js';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
  total: { type: Number, required: true },
  customer: { type: customerSchema },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
  placedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
