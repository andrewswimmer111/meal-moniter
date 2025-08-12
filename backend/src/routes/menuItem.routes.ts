import { Router } from 'express';
import { getMenuItemsFromRestaurant } from '../controllers/menuItem.controller.js';

const router = Router();

router.get('/:restaurantId', getMenuItemsFromRestaurant)

export default router