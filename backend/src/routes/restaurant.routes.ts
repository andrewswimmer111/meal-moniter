import { Router } from 'express';
import { getRestaurantsFromLocation } from '../controllers/restuarant.controller.js';

const router = Router();

router.get('/:locationId', getRestaurantsFromLocation)

export default router