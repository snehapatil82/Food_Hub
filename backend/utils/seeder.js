import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from '../models/Restaurant.js';
import Menu from '../models/Menu.js';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const restaurants = [
  {
    name: "Udupi Garden",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60",
    location: "Vidyagiri, Bagalkote",
    cuisineType: ["South Indian", "Vegetarian"],
    ratings: 4.8
  },
  {
    name: "Basaveshwar Khanavali",
    image: "https://images.unsplash.com/photo-1601050633647-81a317379291?w=500&auto=format&fit=crop&q=60",
    location: "Navanagar, Bagalkote",
    cuisineType: ["North Karnataka", "South Indian"],
    ratings: 4.6
  },
  {
    name: "Bagalkote Biryani Center",
    image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&auto=format&fit=crop&q=60",
    location: "Bagalkote City",
    cuisineType: ["Biryani", "Indian"],
    ratings: 4.5
  }
];

const importData = async () => {
  try {
    await Restaurant.deleteMany();
    await Menu.deleteMany();

    const createdRestaurants = await Restaurant.insertMany(restaurants);

    const menuItems = [
      {
        foodName: "Masala Dosa",
        description: "Crispy rice pancake filled with spicy potato mash",
        category: "South Indian",
        price: 60,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60",
        restaurantId: createdRestaurants[0]._id
      },
      {
        foodName: "Idli Sambar",
        description: "Steamed rice cakes served with spicy lentil soup",
        category: "South Indian",
        price: 40,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
        restaurantId: createdRestaurants[0]._id
      },
      {
        foodName: "Jowar Roti Meal",
        description: "Authentic North Karnataka meal with Jowar Roti and Ennegai",
        category: "South Indian",
        price: 120,
        image: "https://images.unsplash.com/photo-1601050633647-81a317379291?w=500&auto=format&fit=crop&q=60",
        restaurantId: createdRestaurants[1]._id
      },
      {
        foodName: "Hyderabadi Biryani",
        description: "Fragrant basmati rice cooked with spicy marinated chicken",
        category: "Indian",
        price: 250,
        image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&auto=format&fit=crop&q=60",
        restaurantId: createdRestaurants[2]._id
      }
    ];

    await Menu.insertMany(menuItems);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
