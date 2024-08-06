import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  restaurantPicture: { type: String }, // Store path to the image
  approved: { type: Boolean, default: false }, // Change field name to 'approved'
  rejected: { type: Boolean, default: false }, // Add field for 'rejected'
  submissionTimestamp: { type: Date, default: Date.now } // Timestamp of submission
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
