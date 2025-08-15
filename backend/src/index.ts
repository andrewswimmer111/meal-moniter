import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import type { Request, Response } from 'express';

import userRouter from './routes/user.routes.js'
import locationRouter from './routes/location.routes.js'
import restaurantRouter from './routes/restaurant.routes.js'
import menuItemRouter from './routes/menuItem.routes.js'
import mealRouter from './routes/meal.routes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from backend!');
});
app.use('/users', userRouter);
app.use('/locations', locationRouter)
app.use('/restaurants', restaurantRouter)
app.use('/menuItems', menuItemRouter)
app.use('/meals', mealRouter)

app.listen(3002, () => {
  console.log('Server up on port 3002!');
});
