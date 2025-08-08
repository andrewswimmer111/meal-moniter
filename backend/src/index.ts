import express from 'express';
import cors from 'cors'
import type { Request, Response } from 'express';

import userRouter from './routes/user.routes.js'
import locationRouter from './routes/location.routes.js'
import restaurantRouter from './routes/restaurant.routes.js'
import menuItemRouter from './routes/menuItem.routes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from backend!');
});

app.use(express.json())
app.use('/users', userRouter);
app.use('/locations', locationRouter)
app.use('/restaurants', restaurantRouter)
app.use('/menuItems', menuItemRouter)

app.listen(3000, () => {
  console.log('Server up on port 3000!');
});
