import prisma from '../lib/prisma.js';

export const getRestaurantsFromLocation = async (locationId: number) => {
    return prisma.restaurant.findMany({
        where: {locationId}
    })
}
