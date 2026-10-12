import GypsumOrder from '../models/GypsumOrder.js';
import { logAdminAction } from '../utils/adminLog.js';
import { validateCustomer, pickCustomer } from '../utils/validateCustomer.js';
import { SHAPES, SIZES, designAllowed, gypsumPrice } from '../utils/gypsumPricing.js';

export const createGypsumOrder = async (req, res) => {
  try {
    const { arabicText, notes, shape = 'rectangle', size } = req.body;
    const goldPaper = Boolean(req.body.goldPaper);
    const design = Boolean(req.body.design);

    if (!arabicText?.trim() || !size) {
      return res.status(400).json({ message: 'arabicText and size are required' });
    }
    if (!SHAPES.includes(shape) || !SIZES.includes(size)) {
      return res.status(400).json({ message: 'Invalid shape or size' });
    }
    if (design && !designAllowed(size)) {
      return res.status(400).json({ message: 'Small pieces cannot include a design' });
    }

    const customerError = validateCustomer(req.body.customer);
    if (customerError) {
      return res.status(400).json({ message: customerError });
    }

    const order = await GypsumOrder.create({
      user: req.user.id,
      arabicText,
      notes,
      shape,
      size,
      goldPaper,
      design,
      price: gypsumPrice({ size, goldPaper, design }),
      customer: pickCustomer(req.body.customer),
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

export const deleteGypsumOrder = async (req, res) => {
  try {
    const order = await GypsumOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Gypsum order not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'delete',
      entityType: 'GypsumOrder',
      entityId: order._id,
      description: `Deleted gypsum order "${order.arabicText}"`,
    });

    res.json({ message: 'Gypsum order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete gypsum order', error: err.message });
  }
};
