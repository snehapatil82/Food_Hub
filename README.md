# FoodHub – Online Food Ordering System

FoodHub is a full-stack online food ordering platform designed to provide customers with a seamless food discovery, shopping, and ordering experience. Built using React.js, Node.js, Express.js, and MongoDB, the application features a responsive user interface, secure authentication, dynamic cart management, order processing, and an administrative dashboard.

## 🚀 Key Features

### Customer Features
- **Responsive User Interface:** Modern and user-friendly design with interactive components and smooth animations.
- **Restaurant Browsing:** Explore restaurants and discover food items through search and category-based filtering.
- **Dynamic Shopping Cart:** Add, remove, and update food quantities with persistent cart data using LocalStorage.
- **Secure Authentication:** User registration and login with JWT-based authentication and password encryption.
- **Order Management:** Seamless checkout, order placement, and order success tracking.
- **Interactive Experience:** Smooth page transitions and animations powered by Framer Motion.

### Admin Features
- **Analytics Dashboard:** View key statistics, including total sales, orders, and registered users.
- **Order Monitoring:** Access and manage recent customer orders.
- **Menu Management:** Structured interface prepared for adding, updating, and removing food items.
- **Role-Based Access Control:** Restrict administrative functionality to authorized users.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| UI & Animations | Framer Motion, Lucide React |
| API Communication | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Bcrypt.js |
| Security | Helmet, CORS |

## 📁 Project Structure

```text
FoodHub/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       └── ...
│
└── README.md
```

*Note: The structure above is illustrative. Actual directories may vary depending on the implementation.*

## ⚙️ Installation and Setup

### Prerequisites

Ensure the following tools are installed:

- Node.js and npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/snehapatil82/Food_Hub>
cd BDA_project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and configure the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/food_ordering_system
JWT_SECRET=your_jwt_secret
```

### 3. Seed the Database

Run the database seeder to populate the database with initial data:

```bash
node utils/seeder.js
```

### 4. Frontend Setup

Open a new terminal and execute:

```bash
cd frontend
npm install
```

## ▶️ Running the Application

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend development server in a separate terminal:

```bash
cd frontend
npm run dev
```

Open the application in your browser:

**http://localhost:5173**

## 🌐 Deployment

### Backend Deployment

The backend can be deployed using platforms such as Render or Railway.

1. Connect the GitHub repository to your deployment platform.
2. Configure the required environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
3. Set the build command to `npm install`.
4. Configure the start command as `npm start`.
5. Deploy the backend and obtain its production URL.

### Frontend Deployment

The frontend can be deployed using Vercel or Netlify.

1. Connect the GitHub repository to the deployment platform.
2. Configure the frontend API endpoint to use the deployed backend URL.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Deploy the frontend application.

## 📌 Project Highlights

- Full-stack web application with separate frontend and backend architecture.
- Secure user authentication and role-based authorization.
- Persistent shopping cart and order placement workflow.
- Centralized administrative dashboard for monitoring platform activity.
- Responsive design with modern UI components and animations.
- MongoDB-based data management.

## 📦 Project Deliverables

- [x] React-based frontend application
- [x] Express.js backend implementation
- [x] MongoDB database models
- [x] JWT authentication and authorization
- [x] Responsive Tailwind CSS interface
- [x] Database seeder script
- [x] Admin dashboard
- [x] Project documentation and deployment guide

## 👩‍💻 Author

**Sneha Patil**


[GitHub](https://github.com/snehapatil82)

---

*FoodHub – Simplifying food discovery and online ordering through technology.*
