export type TableMeal = {
  id: number;
  eatenAt: string;
  meal: string;
  restaurant: string;
  price: number;
};

export type Location = {
  id: number;
};

export type Restaurant = {
  id: number;
  name: string;
  locationId: number;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
  categoryId: number;
  restaurant: Restaurant;
};

export type Meal = {
  id: number;
  eatenAt: string; 
  userId: number;
  menuItemId: number;
  menuItem: MenuItem;
};