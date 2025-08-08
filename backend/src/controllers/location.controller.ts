import * as locationService from '../services/location.service.js';
import type { Request, Response, NextFunction } from 'express';

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await locationService.getAllLocations();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
