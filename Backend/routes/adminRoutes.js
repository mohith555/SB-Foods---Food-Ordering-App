import express from 'express';
import Restaurant from '../models/restaurant.js'; // Adjust path as necessary

const router = express.Router();

// Get all pending restaurant registrations
router.get('/pending', async (req, res) => {
  try {
    const pendingRestaurants = await Restaurant.find({ approved: false, rejected: { $ne: true } });
    res.json(pendingRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a restaurant
router.put('/approve/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id, 
      { approved: true }, 
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject a restaurant
router.put('/reject/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id, 
      { approved: false, rejected: true }, 
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch restaurant details by ID
router.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
