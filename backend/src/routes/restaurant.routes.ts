import { Router } from 'express';
import { getRestaurantsFromLocation } from '../controllers/restuarant.controller.js';

const router = Router();

router.get('/:locationID', getRestaurantsFromLocation)

export default router