import Inquiry, { INQUIRY_TOPICS } from '../models/Inquiry.js';
import { logAdminAction } from '../utils/adminLog.js';

const PHONE_RE = /^\+?[0-9\s-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public: anyone can send an enquiry, no account needed.
export const createInquiry = async (req, res) => {
  try {
    const { name, phone, email, topic, preferredDate, groupSize, message, website } = req.body;

    // Honeypot: real visitors never see or fill the hidden "website" field.
    if (website) {
      return res.status(201).json({ message: 'Thanks!' });
    }

    if (!name?.trim() || !phone?.trim() || !topic) {
      return res.status(400).json({ message: 'Name, phone, and topic are required' });
    }
    if (!PHONE_RE.test(phone.trim())) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }
    if (email?.trim() && !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    if (!INQUIRY_TOPICS.includes(topic)) {
      return res.status(400).json({ message: 'Please choose a topic' });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      email: email?.trim() || undefined,
      topic,
      preferredDate: preferredDate || undefined,
      groupSize: groupSize ? Number(groupSize) : undefined,
      message,
    });

    res.status(201).json(inquiry);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Please check your details and try again' });
    }
    res.status(500).json({ message: 'Failed to send your message', error: err.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!inquiry) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'status_change',
      entityType: 'Inquiry',
      entityId: inquiry._id,
      description: `Marked message from ${inquiry.name} as "${inquiry.status}"`,
    });

    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update message', error: err.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'delete',
      entityType: 'Inquiry',
      entityId: inquiry._id,
      description: `Deleted message from ${inquiry.name}`,
    });

    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete message', error: err.message });
  }
};
