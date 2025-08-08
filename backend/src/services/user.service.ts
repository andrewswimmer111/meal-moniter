import { Prisma } from '../../generated/prisma/index.js'
import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';


export const getUsers = () => {
  return prisma.user.findMany();
};

export const createUser = async (data: CreateUserInput) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({ data: {name: data.name,  email: data.email, password: hashedPassword}});
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new Error("Email already in use");
    }
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate a token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};


export const handleToken = async (token: string) => {
  try {
    console.log(token)
    const payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === 'string') {
      throw new Error('Invalid token payload'); 
    }

    console.log(payload)

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}


/**
 * Get all meals for a given user
 */
export const getUserMealHistory = async (userId: number, startDate: Date) => {
  return prisma.meal.findMany({
    where: { 
      userId,
      eatenAt: {
        gte: startDate
      } 
    },
    include: {
      menuItem: {
        include: {
          restaurant: true,
        },
      },
    },
    orderBy: {
      eatenAt: 'asc',
    },
  });
};

/**
 * Get total spending for a user
 */
export const getUserTotalSpending = async (userId: number, startDate: Date) => {
  const meals = await getUserMealHistory(userId, startDate);
  return meals.reduce((sum, meal) => sum + meal.menuItem.price, 0);
};

/**
 * Get average spending per day
 */
export const getUserAverageSpendingPerDay = async (userId: number, startDate: Date) => {
  const meals = await getUserMealHistory(userId, startDate);
  const spendingByDay = new Map<string, number>();

  for (const meal of meals) {
    const day = meal.eatenAt.toISOString().split('T')[0];
    if (day) {
      spendingByDay.set(day, (spendingByDay.get(day) || 0) + meal.menuItem.price);
    }
    else {
      console.log("Error occured. Day is null")
    }
  }

  const totalDays = spendingByDay.size;
  const totalSpent = [...spendingByDay.values()].reduce((sum, val) => sum + val, 0);

  return totalDays === 0 ? 0 : totalSpent / totalDays;
};

/**
 * Get average spending per week
 */
export const getUserAverageSpendingPerWeek = async (userId: number, startDate: Date) => {
  const meals = await getUserMealHistory(userId, startDate);
  const spendingByWeek = new Map<string, number>();

  for (const meal of meals) {
    const year = meal.eatenAt.getUTCFullYear();
    const week = getWeekNumber(meal.eatenAt);
    const key = `${year}-W${week}`;

    spendingByWeek.set(key, (spendingByWeek.get(key) || 0) + meal.menuItem.price);
  }

  const totalWeeks = spendingByWeek.size;
  const totalSpent = [...spendingByWeek.values()].reduce((sum, val) => sum + val, 0);

  return totalWeeks === 0 ? 0 : totalSpent / totalWeeks;
};

/**
 * Get most visited restaurants
 */
export const getUserMostVisitedRestaurants = async (userId: number, topN = 5, startDate: Date) => {
  const meals = await getUserMealHistory(userId, startDate);
  const visitCount = new Map<string, { count: number; name: string }>();

  for (const meal of meals) {
    const restaurant = meal.menuItem.restaurant;
    const key = restaurant.id.toString();
    if (!visitCount.has(key)) {
      visitCount.set(key, { count: 1, name: restaurant.name });
    } else {
      visitCount.get(key)!.count += 1;
    }
  }

  return [...visitCount.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
};

/**
 * Helper: Get ISO week number from a Date object
 */
function getWeekNumber(date: Date): number {
  const tempDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
