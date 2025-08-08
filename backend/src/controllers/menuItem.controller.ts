import * as menuItemService from '../services/menuItem.service.js'
import type { Request, Response, NextFunction } from 'express';

export const getMenuItemsFromRestaurantByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = Number(req.params.restaurantId);
        const menuItems = await menuItemService.getMenuItemsFromRestaurantByCategory(restaurantId);
        res.json(menuItems);
    } catch (err) {
        next(err);
  }
}