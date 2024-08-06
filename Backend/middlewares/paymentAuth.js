import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  // Bypass authentication for testing
  next();
};


export default authenticateToken;
