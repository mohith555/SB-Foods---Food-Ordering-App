import mongoose from 'mongoose';

const { Schema } = mongoose;

const foodItemSchema = new Schema({
  itemName: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemPhoto: { type: String } // Store the file path
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
