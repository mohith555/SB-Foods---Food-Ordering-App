import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config.js'; // Adjust the path based on your config file location

const router = express.Router();

// Refresh Token Route
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

    // Generate a new token
    const newToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

export default router;
