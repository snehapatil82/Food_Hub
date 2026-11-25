import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, MapPin, Phone, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      navigate(redirect || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-secondary">Create Account</h2>
          <p className="mt-2 text-gray-500">Join our food community today</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-6 font-medium">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                className="input-field pl-12"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                className="input-field pl-12"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                className="input-field pl-12"
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="phoneNumber"
                type="text"
                required
                className="input-field pl-12"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <textarea
              name="address"
              required
              rows="3"
              className="input-field pl-12 pt-8"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex items-center space-x-4">
             <span className="text-sm font-bold text-secondary">Role:</span>
             <label className="flex items-center space-x-2">
               <input 
                type="radio" 
                name="role" 
                value="customer" 
                checked={formData.role === 'customer'}
                onChange={handleChange}
                className="text-primary focus:ring-primary"
               />
               <span className="text-sm">Customer</span>
             </label>
             <label className="flex items-center space-x-2">
               <input 
                type="radio" 
                name="role" 
                value="admin" 
                checked={formData.role === 'admin'}
                onChange={handleChange}
                className="text-primary focus:ring-primary"
               />
               <span className="text-sm">Restaurant Admin</span>
             </label>
          </div>

          <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center text-lg">
            Create Account <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
