import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      store: true,
      user: true,
    },
    where: {
      storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const getMyReviews = async (userId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      store: true,
    },
    where: {
      userId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const getStoreMissions = async (storeId: number, cursor: number) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const getMyProgressMissions = async (userId: number, cursor: number) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "IN_PROGRESS",
      id: { gt: cursor },
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const completeUserMission = async (
  userId: number,
  userMissionId: number
) => {
  return await prisma.userMission.update({
    where: {
      id: userMissionId,
      userId,
      status: "진행중",
    },
    data: {
      status: "미션 완료",
    },
  });
};
