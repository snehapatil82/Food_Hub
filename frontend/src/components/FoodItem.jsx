import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { getFoodImage } from '../utils/imageMapper';

const FoodItem = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find((i) => i.menuId === item._id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const displayImage = getFoodImage(item.foodName, item.image);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300">
      <div className="flex-grow pr-4">
        <div className="flex items-center space-x-2 mb-1">
          <span className={`w-3 h-3 rounded-full ${item.category === 'Main Course' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <h4 className="font-bold text-secondary text-lg">{item.foodName}</h4>
        </div>
        <p className="text-secondary font-semibold text-base mb-2">₹{item.price}</p>
        <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
      </div>

      <div className="relative flex-shrink-0 w-32 h-32">
        <img 
          src={displayImage} 
          alt={item.foodName}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24">
          {quantity > 0 ? (
            <div className="bg-white shadow-lg border border-gray-100 rounded-lg flex items-center justify-between p-1">
              <button 
                onClick={() => updateQuantity(item._id, quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold text-primary">{quantity}</span>
              <button 
                onClick={() => updateQuantity(item._id, quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(item)}
              className="w-full bg-white text-primary font-bold py-2 rounded-lg shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors uppercase text-xs"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
