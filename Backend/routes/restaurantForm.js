import express from 'express';
import multer from 'multer';
import Restaurant from '../models/restaurant.js';

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Register a new restaurant
router.post('/', upload.single('restaurantPicture'), async (req, res) => {
  const { restaurantName, ownerName, email, phone, address, description } = req.body;
  const restaurantPicture = req.file ? req.file.path : null;

  try {
    const newRestaurant = new Restaurant({
      restaurantName,
      ownerName,
      email,
      phone,
      address,
      description,
      restaurantPicture,
      approvalStatus: 'Pending',
      submissionTimestamp: new Date()
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({
      message: 'Restaurant registered successfully',
      restaurant: savedRestaurant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get pending restaurants
router.get('/pending', async (req, res) => {
  try {
    const pendingRestaurants = await Restaurant.find({ approvalStatus: 'Pending' });
    res.status(200).json(pendingRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a restaurant (admin only)
router.patch('/:id/approve', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.approvalStatus = 'Approved';
    await restaurant.save();

    res.status(200).json({
      message: 'Restaurant approved successfully',
      restaurant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Reject a restaurant (admin only)
router.put('/:id/reject', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.approvalStatus = 'Rejected';
    await restaurant.save();

    res.status(200).json({
      message: 'Restaurant rejected successfully',
      restaurant
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
