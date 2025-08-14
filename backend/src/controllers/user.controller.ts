import * as userService from '../services/user.service.js';
import type { Request, Response, NextFunction } from 'express';
import { getStartDate } from '../lib/semesterStart.js';
import { formatAllData } from '../lib/statsFormatHelper.js';

export const seeAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    res.json(users); 
  } catch (error) {
    next(error); 
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser({ name, email, password });

    res.cookie('authToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    res.status(201).json(result.user);
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

    res.cookie('authToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    res.json(result.user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
}

export const handleUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const user = await userService.handleToken(token);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error)
  }
}

export const getUserMealHistory = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const startDate = getStartDate();

    const userId = Number(req.params.userId);
    const meals = await userService.getUserMealHistory(userId, startDate)
    res.json(meals)
  } catch (err) {
    next(err)
  }
}

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDate = getStartDate();
    const userId = Number(req.params.userId);
    
    const meals = await userService.getUserMealHistory(userId, startDate)

    // Type correction for helper funciton
    const mealsWithStringDates = meals.map(m => ({
      ...m,
      eatenAt: m.eatenAt.toISOString(),
    }));

    const stats = formatAllData(mealsWithStringDates)
    return res.json(stats)
    
  } catch(err) {
    next(err)
  }
}