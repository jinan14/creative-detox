import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
  total: { type: Number, required: true },
  placedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
