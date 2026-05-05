import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
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
  return await prisma.review.findMany({
    where: {
      userId,
      id: { gt: cursor },
    },
    include: { restaurant: true },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const getStoreMissions = async (storeId: number, cursor: number) => {
  return await prisma.mission.findMany({
    where: {
      restaurantId: storeId,
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const getMyMissions = async (userId: number, cursor: number) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "진행중",
      id: { gt: cursor },
    },
    include: { mission: true },
    orderBy: { id: "asc" },
    take: 5,
  });
};

export const completeMission = async (userMissionId: number) => {
  return await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "진행완료" },
  });
};