import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CreditCard, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(user?.address || '');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/checkout');
    }
    // Only redirect if NOT processing an order
    if (!authLoading && !processing && cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, authLoading, cartItems, navigate, processing]);

  const finalTotal = totalAmount + 40 + totalAmount * 0.05;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setProcessing(true); // Prevent redirect when cart is cleared
    try {
      const orderData = {
        items: cartItems,
        totalAmount: finalTotal,
        deliveryAddress: user.address || 'Default Address',
        paymentId: 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      };

      await api.post('/orders', orderData);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order', error);
      alert('Failed to place order. Please try again.');
      setProcessing(false);
    }
    setLoading(false);
  };

  const handleUpdateAddress = async () => {
    try {
      await updateUser({ address: newAddress });
      setIsEditingAddress(false);
    } catch (error) {
      alert('Failed to update address');
    }
  };

  if (authLoading || (!user && cartItems.length > 0)) {
    return <div className="container mx-auto px-4 py-20 text-center text-2xl font-bold">Verifying your session...</div>;
  }

  if (cartItems.length === 0 && !processing) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-black text-secondary mb-10 text-center">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Checkout Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-secondary">Delivery Address</h2>
              </div>
              
              {isEditingAddress ? (
                <div className="space-y-4">
                  <textarea 
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Enter full address"
                    rows="3"
                  />
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleUpdateAddress}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm"
                    >
                      Save Address
                    </button>
                    <button 
                      onClick={() => setIsEditingAddress(false)}
                      className="px-6 py-2 bg-gray-100 text-gray-500 rounded-lg font-bold text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="font-bold text-secondary">{user?.name}</p>
                  <p className="text-gray-500 mt-1">{user?.address || 'No address provided'}</p>
                  <p className="text-gray-500">{user?.phoneNumber}</p>
                  <button 
                    onClick={() => {
                      setNewAddress(user?.address || '');
                      setIsEditingAddress(true);
                    }}
                    className="mt-4 text-primary text-sm font-bold hover:underline"
                  >
                    Change Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-secondary">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-bold text-secondary">Credit / Debit Card</p>
                      <p className="text-xs text-gray-500">Pay securely with your card</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className="w-8 h-5 bg-gray-200 rounded"></span>
                    <span className="w-8 h-5 bg-gray-200 rounded"></span>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-bold text-secondary">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when your food arrives</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-400 text-sm px-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-black text-secondary mb-6">Order Detail</h2>
              
              <div className="space-y-3 mb-6 max-h-40 overflow-y-auto pr-2 no-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.menuId} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.quantity}x {item.foodName}</span>
                    <span className="font-bold text-secondary">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pt-6 border-t border-gray-100">
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
                  <span className="text-2xl font-black text-primary">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full btn-primary py-4 flex items-center justify-center text-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'} <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
