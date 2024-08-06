// models/Cart.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodItem: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const Cart = mongoose.model('Cart', cartItemSchema);

export default Cart;
