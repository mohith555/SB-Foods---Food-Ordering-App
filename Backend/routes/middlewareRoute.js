// middleware/auth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Adjust this path if needed

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authMiddleware;
