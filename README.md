# FoodHub - Online Food Ordering System

A premium, full-stack Online Food Ordering System built with React, Node.js, Express, and MongoDB. This project features a modern UI, real-time-like interactions, secure JWT authentication, and a complete admin dashboard.

## 🚀 Features

### Customer Features
- **Modern Responsive UI**: Beautiful hero sections and interactive food cards.
- **Restaurant Browsing**: Search and filter restaurants by cuisine and category.
- **Dynamic Cart**: Persistent cart using LocalStorage with quantity management.
- **Secure Authentication**: JWT-based login and registration.
- **Checkout Flow**: Seamless checkout with order placement and success tracking.
- **Animations**: Smooth transitions powered by Framer Motion.

### Admin Features
- **Dashboard Analytics**: Overview of total sales, orders, and users.
- **Recent Orders**: Track and manage the latest customer orders.
- **Menu Management**: (Ready for expansion) Add, edit, or remove menu items.
- **Role-Based Access**: Restricted access to administrative routes.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Security**: JWT (JSON Web Tokens), Bcrypt.js, Helmet, CORS.

## 📦 Installation

### 1. Clone the repository
```bash
# Assuming the project is in your directory
cd BDA_project
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with the following:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/food_ordering_system
# JWT_SECRET=your_jwt_secret
```

### 3. Seed the Database
```bash
node utils/seeder.js
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Project

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deployment Guide

### Backend (Render / Railway)
1. Connect your GitHub repository to Render/Railway.
2. Set the Environment Variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.

### Frontend (Vercel / Netlify)
1. Connect your GitHub repository.
2. Update `api.js` in the frontend to point to your production backend URL.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

## 📜 Deliverables
- [x] Complete Frontend React Code
- [x] Complete Backend Express Code
- [x] MongoDB Schema Models
- [x] JWT Authentication System
- [x] Responsive Tailwind UI
- [x] Database Seeder Script
- [x] Admin Dashboard Layout
- [x] Documentation & Deployment Guide
