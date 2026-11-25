import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (authLoading) return; // Wait for auth to load
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-black text-secondary mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn-primary py-4 px-8 inline-flex items-center">
            Browse Restaurants <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center space-x-2 mb-8 cursor-pointer text-gray-500 hover:text-primary transition-colors" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
          <span className="font-bold">Back</span>
        </div>

        <h1 className="text-4xl font-black text-secondary mb-10">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                layout
                key={item.menuId}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.foodName} 
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold text-secondary text-lg">{item.foodName}</h3>
                    <p className="text-primary font-black">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-gray-50 rounded-lg flex items-center space-x-4 p-1 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.menuId, item.quantity - 1)}
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-secondary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.menuId, item.quantity + 1)}
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-secondary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.menuId)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-black text-secondary mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-secondary">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-secondary">₹40.00</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (5%)</span>
                  <span className="font-bold text-secondary">₹{(totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-black text-secondary">Total</span>
                  <span className="text-2xl font-black text-primary">₹{(totalAmount + 40 + totalAmount * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full btn-primary py-4 flex items-center justify-center text-lg"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-400">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
