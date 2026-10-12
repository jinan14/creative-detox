import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { validateCustomer, pickCustomer } from '../utils/validateCustomer.js';
import { logAdminAction } from '../utils/adminLog.js';

export const createOrder = async (req, res) => {
  try {
    const customerError = validateCustomer(req.body.customer);
    if (customerError) {
      return res.status(400).json({ message: customerError });
    }

    const cart = await Cart.findOne({ user: req.user.id }).populate('items');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => sum + item.price, 0);
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((item) => item._id),
      total,
      customer: pickCustomer(req.body.customer),
    });

    cart.items = [];
    await cart.save();

    await order.populate('items', 'title artist price');
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .populate('items', 'title artist price image')
      .sort({ placedAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'status_change',
      entityType: 'Order',
      entityId: order._id,
      description: `Updated artwork order status to "${order.status}"`,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await logAdminAction({
      adminId: req.user.id,
      action: 'delete',
      entityType: 'Order',
      entityId: order._id,
      description: `Deleted artwork order from ${order.customer?.fullName || 'a customer'} ($${order.total})`,
    });

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};
