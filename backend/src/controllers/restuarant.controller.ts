import * as restaurantService from '../services/restaurant.service.js'
import type { Request, Response, NextFunction } from 'express';

export const getRestaurantsFromLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationId = Number(req.params.locationId);
        const restuarants = await restaurantService.getRestaurantsFromLocation(locationId);
        res.json(restuarants);
    } catch (err) {
        next(err);
  }
}