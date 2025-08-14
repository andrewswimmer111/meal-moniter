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
 * All stats services start below
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

