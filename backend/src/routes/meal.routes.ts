import { Router } from 'express';
import { deleteMeal, writeMeal } from '../controllers/meal.controller.js';

const router = Router();

router.post('/', writeMeal)
router.delete('/:mealId', deleteMeal)

export default router