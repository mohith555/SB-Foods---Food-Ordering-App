import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword, userType });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Determine the redirect URL based on userType
    let redirectUrl;
    switch (user.userType) {
      case 'admin':
        redirectUrl = '/AdminDashboard';
        break;
      case 'restaurantAdmin':
        redirectUrl = '/RestaurantDashboard';
        break;
      default:
        redirectUrl = '/UserDashboard';
    }

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        userType: user.userType,
      },
      redirectUrl, // Send the redirectUrl in the response
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Check route (requires authentication)
router.get('/check', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
