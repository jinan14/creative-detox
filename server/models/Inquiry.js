import mongoose from 'mongoose';

export const INQUIRY_TOPICS = [
  'private_session',
  'group_booking',
  'kids_session',
  'collaboration',
  'workshop_question',
  'other',
];

// Contact-page enquiries. Saved before the visitor is sent to WhatsApp, so the
// admin can follow up even if the WhatsApp message is never sent.
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  email: { type: String, trim: true, maxlength: 120 },
  topic: { type: String, enum: INQUIRY_TOPICS, required: true },
  preferredDate: { type: String, trim: true, maxlength: 30 },
  groupSize: { type: Number, min: 1, max: 500 },
  message: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['new', 'replied', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Inquiry', inquirySchema);
