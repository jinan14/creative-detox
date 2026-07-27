import Workshop from '../models/Workshop.js';
import { logAdminAction } from '../utils/adminLog.js';

export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1 });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workshops', error: err.message });
  }
};

export const createWorkshop = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity, price, image, category, duration, level } = req.body;

    if (!title || !description || !date || !time || !location || capacity === undefined) {
      return res
        .status(400)
        .json({ message: 'Title, description, date, time, location, and capacity are required' });
    }

    const workshop = await Workshop.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      seatsRemaining: capacity,
      price,
      image,
      category,
      duration,
      level,
    });

    await logAdminAction({
      adminId: req.user.id,
      action: 'create',
      entityType: 'Workshop',
      entityId: workshop._id,
      description: `Created workshop "${workshop.title}"`,
    });

    res.status(201).json(workshop);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workshop', error: err.message });
  }
};

export const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

    await logAdminAction({
      adminId: req.user.id,
      action: 'update',
      entityType: 'Workshop',
      entityId: workshop._id,
      description: `Updated workshop "${workshop.title}"`,
    });

    res.json(workshop);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update workshop', error: err.message });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

    await logAdminAction({
      adminId: req.user.id,
      action: 'delete',
      entityType: 'Workshop',
      entityId: workshop._id,
      description: `Deleted workshop "${workshop.title}"`,
    });

    res.json({ message: 'Workshop deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete workshop', error: err.message });
  }
};
