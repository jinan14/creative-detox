import Cart from '../models/Cart.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    await cart.populate('items');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { artworkId } = req.body;
    if (!artworkId) {
      return res.status(400).json({ message: 'artworkId is required' });
    }

    const cart = await getOrCreateCart(req.user.id);
    if (!cart.items.some((id) => id.toString() === artworkId)) {
      cart.items.push(artworkId);
      cart.updatedAt = Date.now();
      await cart.save();
    }
    await cart.populate('items');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const cart = await getOrCreateCart(req.user.id);
    cart.items = cart.items.filter((id) => id.toString() !== artworkId);
    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart', error: err.message });
  }
};
