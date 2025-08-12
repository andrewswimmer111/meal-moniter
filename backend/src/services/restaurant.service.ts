import prisma from '../lib/prisma.js';

export const getLocationfromLocationName = async (locationName: string) => {
    return prisma.location.findFirst({
        where: {
            name: locationName
        }
    })
}

export const getRestaurantsFromLocation = async (locationId: number) => {
    return prisma.restaurant.findMany({
        where: {locationId}
    })
}
