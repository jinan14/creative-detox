import GypsumOrder from '../models/GypsumOrder.js';
import { logAdminAction } from '../utils/adminLog.js';

export const createGypsumOrder = async (req, res) => {
  try {
    const { arabicText, notes, size, color } = req.body;
    if (!arabicText || !size || !color) {
      return res.status(400).json({ message: 'arabicText, size, and color are required' });
    }

    const order = await GypsumOrder.create({
      user: req.user.id,
      arabicText,
      notes,
      size,
      color,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit gypsum order', error: err.message });
  }
};

export const getGypsumOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await GypsumOrder.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gypsum orders', error: err.message });
  }
};

export const updateGypsumOrder = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const order = await GypsumOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Gypsum order not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'status_change',
      entityType: 'GypsumOrder',
      entityId: order._id,
      description: `Updated gypsum order status to "${order.status}"`,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update gypsum order', error: err.message });
  }
};
