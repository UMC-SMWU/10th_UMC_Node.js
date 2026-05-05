import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findRegionById = async (regionId: number) => {
  return await prisma.region.findFirst({
    where: {
      id: regionId,
    },
  });
};