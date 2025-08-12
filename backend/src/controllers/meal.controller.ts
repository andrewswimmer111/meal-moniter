
import type { Request, Response, NextFunction } from 'express';
import * as mealService from '../services/meal.service.js' 

export const writeMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, menuItemId, eatenAt} = req.body;
        const userIdNum = Number(userId);
        const menuItemIdNum = Number(menuItemId);
        const eatenAtDate = eatenAt ? new Date(eatenAt) : undefined;

        const meal = await mealService.writeMeal(userIdNum, menuItemIdNum, eatenAt);

        res.json(meal);
    } catch (err) {
        next(err);
    }
};

export const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mealId = Number(req.params.mealId);
        const result = await mealService.deleteMeal(mealId);
        res.json(result);
    } catch (err) {
        next(err);
    }
}