// mission.repository.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findMissionById = async (missionId: number) => {
  return await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });
};

export const findMissionsByStoreId = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
    },
  });
};
