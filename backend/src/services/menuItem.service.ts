import prisma from '../lib/prisma.js';

export const getMenuItemsFromRestaurant = async (restaurantId: number) => {
  const menuItems = await prisma.menuItem.findMany({
    where: {restaurantId}
  })
  return menuItems
}

export const getMenuItemsFromRestaurantByCategory = async (restaurantId: number) => {
  const categoriesWithItems = await prisma.category.findMany({
    where: {
      restaurants: {
        some: {
          id: restaurantId,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
    include: {
      menuItems: {
        where: {
          restaurantId,
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return categoriesWithItems;
};
