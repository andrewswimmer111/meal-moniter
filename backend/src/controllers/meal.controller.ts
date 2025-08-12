
import type { Request, Response, NextFunction } from 'express';
import * as mealService from '../services/meal.service.js' 

export const writeMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, menuItemId } = req.body;
        const userIdNum = Number(userId);
        const menuItemIdNum = Number(menuItemId);

        const meal = await mealService.writeMeal(userIdNum, menuItemIdNum);

        res.json(meal);
    } catch (err) {
        next(err);
    }
};