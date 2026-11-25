import React, { useState, useEffect } from 'react';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await api.get('/restaurants');
        setRestaurants(data.data);
        setFilteredRestaurants(data.data);
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let result = restaurants;
    if (selectedCategory !== 'All') {
      result = result.filter(r => r.cuisineType.includes(selectedCategory));
    }
    if (searchTerm) {
      result = result.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredRestaurants(result);
  }, [searchTerm, selectedCategory, restaurants]);

  const scrollToRestaurants = () => {
    const element = document.getElementById('popular-restaurants');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=60" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Delicious food, <br />
              <span className="text-primary">delivered</span> in Bagalkote.
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-medium">
              Choose from top restaurants in Vidyagiri, Navanagar and enjoy your favorite South Indian meals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={scrollToRestaurants} className="btn-primary py-4 px-8 text-lg flex items-center justify-center">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={scrollToRestaurants}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-8 rounded-md transition-all hover:bg-white/20"
              >
                Explore Offers
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {['All', 'South Indian', 'Biryani', 'Pizza', 'Burgers', 'Sushi'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all font-semibold text-sm ${selectedCategory === cat ? 'border-primary text-primary bg-primary/5' : 'border-gray-100 hover:border-primary hover:text-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search for restaurants..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Restaurant Listing */}
        <div id="popular-restaurants" className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-secondary">Popular Restaurants</h2>
          <div className="flex items-center space-x-2 text-primary font-bold cursor-pointer hover:underline">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={restaurant._id}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
