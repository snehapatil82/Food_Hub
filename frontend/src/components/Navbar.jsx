import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu as MenuIcon, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-primary p-2 rounded-lg"
            >
              <ShoppingCart className="text-white h-6 w-6" />
            </motion.div>
            <span className="text-2xl font-bold text-secondary tracking-tight">
              Food<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1 text-gray-500">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Bagalkote, India</span>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <Search className="text-gray-400 h-5 w-5" />
          <input 
            type="text" 
            placeholder="Search for restaurants or food..." 
            className="bg-transparent border-none focus:ring-0 w-full ml-2 text-sm outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative group">
            <ShoppingCart className="text-secondary group-hover:text-primary transition-colors h-6 w-6" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center space-x-1 group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <User className="text-secondary group-hover:text-primary h-5 w-5" />
                </div>
                <span className="text-sm font-semibold hidden md:block">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-6">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
