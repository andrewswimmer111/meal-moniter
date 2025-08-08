import prisma from '../lib/prisma.js';


export const getAllLocations = async () => {
  return prisma.location.findMany();
};

