// models/user.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true }, // Ensure username is required
  userType: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
