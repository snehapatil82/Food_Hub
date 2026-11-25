import express from 'express';
import { updateMenu, deleteMenu } from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.put('/:id', protect, authorize('admin'), updateMenu);
router.delete('/:id', protect, authorize('admin'), deleteMenu);

export default router;
