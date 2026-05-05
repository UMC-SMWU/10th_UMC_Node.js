import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findChallengingMission = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
      status: 'IN_PROGRESS',
    },
  });
};

export const createUserMission = async (userId: number, missionId: number) => {
  const newUserMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: 'IN_PROGRESS',
    },
  });

  return newUserMission;
};

export const findUserMissionInProgress = async (userId: number) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: 'IN_PROGRESS',
    },
  });
};

export const updateUserMissionToComplete = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMission.updateMany({
    where: {
      userId,
      missionId,
      status: 'IN_PROGRESS',
    },
    data: {
      status: 'COMPLETE',
    },
  });
};