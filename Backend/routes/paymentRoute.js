import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

router.post('/payment', async (req, res) => {
  const { amount, id } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      description: 'Your Product Description',
      payment_method: id,
      confirm: true,
      return_url: 'http://localhost:3000/confirmation', // Include your return URL here
    });

    console.log('Payment', paymentIntent);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({
      message: 'Payment failed',
      success: false,
      error: error.message, // Provide detailed error message
    });
  }
});

export default router;