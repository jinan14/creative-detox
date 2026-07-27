import mongoose from 'mongoose';

const gypsumOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  arabicText: { type: String, required: true },
  notes: { type: String },
  size: { type: String, required: true },
  color: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_production', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GypsumOrder', gypsumOrderSchema);
