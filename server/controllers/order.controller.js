import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => sum + item.price, 0);
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((item) => item._id),
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};
