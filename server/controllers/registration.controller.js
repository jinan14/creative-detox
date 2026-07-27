import Registration from '../models/Registration.js';
import Workshop from '../models/Workshop.js';

export const createRegistration = async (req, res) => {
  try {
    const { workshopId } = req.body;
    if (!workshopId) {
      return res.status(400).json({ message: 'workshopId is required' });
    }

    const workshop = await Workshop.findOneAndUpdate(
      { _id: workshopId, seatsRemaining: { $gt: 0 } },
      { $inc: { seatsRemaining: -1 } },
      { new: true }
    );

    if (!workshop) {
      const exists = await Workshop.findById(workshopId);
      if (!exists) return res.status(404).json({ message: 'Workshop not found' });
      return res.status(409).json({ message: 'This workshop is fully booked' });
    }

    try {
      const registration = await Registration.create({ user: req.user.id, workshop: workshopId });
      await registration.populate('workshop');
      res.status(201).json(registration);
    } catch (err) {
      await Workshop.updateOne({ _id: workshopId }, { $inc: { seatsRemaining: 1 } });
      if (err.code === 11000) {
        return res.status(409).json({ message: 'You are already registered for this workshop' });
      }
      throw err;
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to register for workshop', error: err.message });
  }
};

export const getRegistrations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.workshop) filter.workshop = req.query.workshop;

    const registrations = await Registration.find(filter)
      .populate('user', 'name email')
      .populate('workshop')
      .sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registrations', error: err.message });
  }
};
