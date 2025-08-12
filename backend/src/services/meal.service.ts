import prisma from '../lib/prisma.js';

export const writeMeal = async (userId: number, menuItemId: number, eatenAt?: Date) => {
    const meal = await prisma.meal.create({
        data: {
            userId,
            menuItemId,
            ...(eatenAt && { eatenAt }),
        }
    })
    return meal
}

