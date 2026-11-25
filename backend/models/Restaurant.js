import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a restaurant name'],
    trim: true
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  cuisineType: {
    type: [String],
    required: [true, 'Please add cuisine types']
  },
  ratings: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
