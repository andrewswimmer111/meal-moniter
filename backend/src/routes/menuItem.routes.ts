import { Router } from 'express';
import { getMenuItemsFromRestaurantByCategory } from '../controllers/menuItem.controller.js';

const router = Router();

router.get('/:restaurantId', getMenuItemsFromRestaurantByCategory)

export default router