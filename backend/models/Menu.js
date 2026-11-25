import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, 'Please add a food name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Fast Food', 'Chinese', 'Indian', 'South Indian']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: {
    type: String,
    default: 'no-food.jpg'
  },
  availability: {
    type: Boolean,
    default: true
  },
  restaurantId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
