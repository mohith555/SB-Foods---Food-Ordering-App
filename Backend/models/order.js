import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, required: true }
  }],
  paymentStatus: { type: Boolean, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
