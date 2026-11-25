import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-black text-secondary mb-4">Order Placed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your order. Your food is being prepared and will be delivered shortly.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-bold text-secondary">Order ID: #FH-{(Math.random() * 1000000).toFixed(0)}</span>
          </div>
          <p className="text-sm text-gray-400">Estimated Delivery: 35 - 45 Mins</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to="/orders" className="btn-primary py-4 px-8 flex items-center justify-center">
            Track Your Order <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link to="/" className="text-primary font-bold hover:underline">
            Go back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
