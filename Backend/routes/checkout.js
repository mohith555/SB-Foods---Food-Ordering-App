import express from 'express';
import Cart from '../models/cart.js'; // Adjust the path according to your project structure
import Order from '../models/order.js'; // Adjust the path according to your project structure
import authenticate from '../middlewares/auth.js'; // Middleware to authenticate requests

const router = express.Router();

// Initialize order
router.post('/checkout', authenticate, async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ error: 'User ID, items, and total amount are required.' });
  }

  try {
    // Create a new order
    const order = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus: false // Payment status will be updated after payment is completed
    });

    // Save the order and return order ID to the client
    const savedOrder = await order.save();

    res.status(200).json({ success: true, orderId: savedOrder._id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'An error occurred while processing the checkout.' });
  }
});

// Finalize order after payment
router.post('/finalize-payment', authenticate, async (req, res) => {
    const { orderId, paymentStatus } = req.body;
  
    if (!orderId || paymentStatus === undefined) {
      return res.status(400).json({ error: 'Order ID and payment status are required.' });
    }
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      order.paymentStatus = paymentStatus;
      await order.save();
  
      // Optionally clear the cart after successful payment
      await Cart.findOneAndUpdate(
        { userId: order.userId },
        { $set: { items: [] } }
      );
  
      res.status(200).json({ success: true, message: 'Payment status updated successfully.' });
    } catch (error) {
      console.error('Finalize payment error:', error);
      res.status(500).json({ error: 'An error occurred while updating payment status.' });
    }
  });
  

export default router;
