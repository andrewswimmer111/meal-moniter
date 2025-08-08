import prisma from '../lib/prisma.js';


export const getMenuItemsFromRestaurantByCategory = async (restaurantId: number) => {
  const categoriesWithItems = await prisma.category.findMany({
    where: {
      restaurants: {
        some: {
          id: restaurantId,
        },
      },
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
