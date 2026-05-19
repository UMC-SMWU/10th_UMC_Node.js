// store.repository.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findStoreById = async (storeId: number) => {
  return await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });
};

export const createStore = async (regionId: number, data: CreateStoreDto) => {
  const newStore = await prisma.store.create({
    data: {
      regionId,
      name: data.name,
      address: data.address,
      category: data.category ?? "",
    },
  });

  return newStore;
};
