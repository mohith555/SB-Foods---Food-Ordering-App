import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Adjust the path based on your config file location

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

    req.user = decoded; // Add user info to request object
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
