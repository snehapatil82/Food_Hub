const restaurantImages = {
  "Basaveshwar Khanavali": "/images/basaveshwara_khanavali.png",
  "Bagalkote Biryani Center": "/images/bagalkote_biryani_center.png",
  "Udupi Garden": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60"
};

const foodImages = {
  "Masala Dosa": "/images/masala_dosa.png",
  "Idli Sambar": "/images/idli_sambar.png",
  "Jowar Roti Meal": "/images/basaveshwara_khanavali.png",
  "Hyderabadi Biryani": "/images/bagalkote_biryani_center.png"
};

export const getRestaurantImage = (name, defaultImage) => {
  return restaurantImages[name] || defaultImage;
};

export const getFoodImage = (name, defaultImage) => {
  return foodImages[name] || defaultImage;
};
