import { Router } from 'express';
import { getLocations } from '../controllers/location.controller.js';

const router = Router();

router.get('/', getLocations)

export default router