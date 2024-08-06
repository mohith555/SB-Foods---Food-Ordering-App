import express from 'express';
import Order from '../models/order.js'; // Adjust path accordingly
import authenticate from '../middlewares/auth.js'; // Middleware to authenticate requests

const router = express.Router();

// Fetch user orders
router.get('/user-orders', authenticate, async (req, res) => {
  const { userId } = req.user; // Extract userId from authenticated user

  try {
    const orders = await Order.find({ userId }).populate('items.foodItem').exec();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching user orders.' });
  }
});

export default router;
