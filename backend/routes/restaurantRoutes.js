import express from 'express';
import {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';
import { getMenus, createMenu } from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Re-route into other resource routers
// router.use('/:restaurantId/menu', menuRouter);

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', protect, authorize('admin'), createRestaurant);
router.put('/:id', protect, authorize('admin'), updateRestaurant);
router.delete('/:id', protect, authorize('admin'), deleteRestaurant);

// Menu routes related to restaurant
router.get('/:restaurantId/menu', getMenus);
router.post('/:restaurantId/menu', protect, authorize('admin'), createMenu);

export default router;
