// user.repository.ts

import { PrismaClient } from ".prisma/client";
import { UpdateMyInfoDto } from "../dto/user.dto";

const prisma = new PrismaClient();

export const findUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userId: number, data: UpdateMyInfoDto) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};
