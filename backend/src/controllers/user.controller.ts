import * as userService from '../services/user.service.js';
import type { Request, Response, NextFunction } from 'express';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err: any) {
    if (err.message === "Email already in use") {
      return res.status(400).json({ error: err.message });
    }
    next(err)
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}