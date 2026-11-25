import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRestaurantImage } from '../utils/imageMapper';

const RestaurantCard = ({ restaurant }) => {
  const displayImage = getRestaurantImage(restaurant.name, restaurant.image);

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="card h-full flex flex-col group"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={displayImage} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-secondary">{restaurant.ratings}</span>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-1">
            {restaurant.cuisineType.join(', ')}
          </p>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{restaurant.location}</span>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">30-40 MINS</span>
            <span className="text-primary font-bold text-sm">Order Now</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RestaurantCard;
