import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  TrendingUp, 
  LayoutDashboard, 
  UtensilsCrossed, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    activeUsers: 0,
    restaurants: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/orders');
        const orders = data.data;
        
        const sales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        
        setStats({
          totalOrders: orders.length,
          totalSales: sales,
          activeUsers: 124, // Mock
          restaurants: 12 // Mock
        });
        
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Sales', value: `₹${stats.totalSales.toFixed(2)}`, icon: IndianRupee, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/5' },
    { title: 'Active Users', value: stats.activeUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Restaurants', value: stats.restaurants, icon: UtensilsCrossed, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  if (loading) return <div className="p-8">Loading Dashboard...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-secondary">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-3">
             <button className="bg-white border border-gray-200 text-secondary font-bold py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                Export Report
             </button>
             <button className="btn-primary py-2 px-6">
                Add New Item
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={stat.title}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4"
            >
              <div className={`${stat.bg} p-4 rounded-2xl`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-2xl font-black text-secondary">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary">Recent Orders</h2>
              <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-secondary">
                            {order.userId?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-secondary text-sm">{order.userId?.name || 'Guest'}</p>
                            <p className="text-xs text-gray-400">{order.userId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' :
                          order.orderStatus === 'Preparing' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-secondary text-sm">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-primary">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Analytics */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-secondary mb-6">Quick Links</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                  <div className="flex items-center space-x-3">
                    <UtensilsCrossed className="h-5 w-5" />
                    <span className="font-bold">Menu Management</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-bold">Order Tracking</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all group">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span className="font-bold">Site Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                </button>
              </div>
            </div>

            <div className="bg-secondary p-8 rounded-3xl shadow-sm text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Store Performance</h2>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-400 font-medium">Your sales are up <span className="text-primary font-bold">15%</span> compared to last month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
