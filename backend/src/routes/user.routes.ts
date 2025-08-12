import { Router } from 'express';
import { createUser, loginUser, seeAllUsers, handleUserToken, logoutUser, getUserMealHistory } from '../controllers/user.controller.js';

const router = Router();

router.get('/', seeAllUsers);
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/token', handleUserToken);
router.post('/logout', logoutUser)

router.get('/meals/:userId', getUserMealHistory)

export default router;