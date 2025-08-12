import { Router } from 'express';
import { writeMeal } from '../controllers/meal.controller.js';

const router = Router();

router.post('/', writeMeal)

export default router