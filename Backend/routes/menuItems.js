import express from 'express';
import FoodItem from '../models/foodItems.js';  // Adjust the path as necessary
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name clashes
  }
});
const upload = multer({ storage: storage });

// Create a new food item
router.post('/', upload.single('itemPhoto'), async (req, res) => {
  try {
    const newItem = new FoodItem({
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      itemCategory: req.body.itemCategory,
      itemPrice: req.body.itemPrice,
      itemPhoto: req.file ? req.file.path : null // Save file path
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing food item
router.put('/:id', upload.single('itemPhoto'), async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, {
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      itemCategory: req.body.itemCategory,
      itemPrice: req.body.itemPrice,
      itemPhoto: req.file ? req.file.path : undefined // Save file path
    }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
