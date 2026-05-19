import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};


