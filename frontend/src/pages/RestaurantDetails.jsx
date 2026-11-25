import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import FoodItem from '../components/FoodItem';
import { Star, MapPin, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await api.get(`/restaurants/${id}`);
        setRestaurant(resData.data.data);
        
        const menuData = await api.get(`/restaurants/${id}/menu`);
        setMenu(menuData.data.data);
      } catch (error) {
        console.error('Error fetching restaurant details', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  if (!restaurant) return <div className="container mx-auto px-4 py-20 text-center">Restaurant not found</div>;

  return (
    <div className="pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-black text-secondary mb-2">{restaurant.name}</h1>
              <p className="text-gray-500 mb-4">{restaurant.cuisineType.join(', ')}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-secondary">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{restaurant.ratings} Ratings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>30-40 mins</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{restaurant.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 p-4 bg-gray-50 rounded-2xl flex items-center space-x-4 border border-gray-100">
              <div className="text-center px-4 border-r border-gray-200">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Price</p>
                <p className="font-black text-secondary">₹₹₹</p>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Offers</p>
                <p className="font-black text-primary">50% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 mt-12 max-w-4xl">
        <div className="flex items-center space-x-2 mb-8">
          <Info className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium text-gray-500">Order above ₹200 to get free delivery</p>
        </div>

        <h2 className="text-2xl font-black text-secondary mb-6">Menu Items</h2>
        
        <div className="space-y-6">
          {menu.length > 0 ? (
            menu.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item._id}
              >
                <FoodItem item={item} />
              </motion.div>
            ))
          ) : (
            <p className="text-center py-10 text-gray-400 italic">No menu items available for this restaurant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
