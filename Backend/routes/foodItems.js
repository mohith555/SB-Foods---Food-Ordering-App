import express from 'express';
import FoodItem from '../models/foodItems.js';

const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food items' });
  }
});

// Add a new food item
router.post('/', async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const foodItem = new FoodItem({ name, price, description });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding food item' });
  }
});

export default router;
