import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  seatsRemaining: { type: Number, required: true },
  price: { type: Number, default: 0 },
  image: { type: String },
  category: { type: String },
  duration: { type: String },
  level: { type: String },
});

export default mongoose.model('Workshop', workshopSchema);
