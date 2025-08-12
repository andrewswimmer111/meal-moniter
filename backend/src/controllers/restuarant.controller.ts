import * as restaurantService from '../services/restaurant.service.js'
import type { Request, Response, NextFunction } from 'express';


export const getRestaurantsFromLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationID = Number(req.params.locationID);
        const restuarants = await restaurantService.getRestaurantsFromLocation(locationID);
        res.json(restuarants)
    } catch (err) {
        next(err);
    }
}