import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', cartSchema);
