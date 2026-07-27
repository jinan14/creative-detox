import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop', required: true },
  registeredAt: { type: Date, default: Date.now },
});

registrationSchema.index({ user: 1, workshop: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);
