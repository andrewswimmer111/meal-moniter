import * as locationService from '../services/location.service.js';
import type { Request, Response, NextFunction } from 'express';

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await locationService.getAllLocations();
    res.json(locations);
  } catch (err) {
    next(err);
  }
};
