import { prisma } from "../../../db.config.js";

export const findUserMission = async (
  userId: number,
  userMissionId: number
) => {
  return await prisma.userMission.findFirst({
    where: {
      id: userMissionId,
      userId,
    },
  });
};

export const updateUserMissionToComplete = async (userMissionId: number) => {
  return await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "COMPLETE" },
    include: {
      mission: {
        select: {
          id: true,
          content: true,
          reward: true,
          deadline: true,
          store: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};
