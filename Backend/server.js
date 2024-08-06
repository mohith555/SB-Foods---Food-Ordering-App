import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import EventEmitter from 'events';

// Import routes and middleware
import foodItemsRoutes from './routes/foodItems.js';
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantForm.js';
import menuItemsRoutes from './routes/menuItems.js';
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/auth.js';
import refreshTokenRoute from './routes/refreshTokenRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderRoutes from './routes/order.js';
import checkoutRoutes from './routes/checkout.js';

// Load environment variables
dotenv.config();

const app = express();

// Configure middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB URI is undefined. Make sure it is set in the .env file.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/api/fooditems', foodItemsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menuitems', menuItemsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', refreshTokenRoute);
app.use('/api', paymentRoute);
app.use('/api/orders', orderRoutes);
app.use('/api', checkoutRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Increase max listeners limit if needed
EventEmitter.defaultMaxListeners = 20;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
