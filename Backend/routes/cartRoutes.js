import express from 'express';
import Cart from '../models/cart.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Get Cart
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.foodItem');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// Add Item to Cart
router.post('/:userId/add', authMiddleware, async (req, res) => {
  try {
    const { foodItemId, quantity } = req.body;

    // Check for valid input
    if (!foodItemId || !quantity) {
      return res.status(400).json({ error: 'Food item ID and quantity are required' });
    }

    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ foodItem: foodItemId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Remove Item from Cart
router.delete('/:userId/remove/:foodItemId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.foodItem.toString() !== req.params.foodItemId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

export default router;
