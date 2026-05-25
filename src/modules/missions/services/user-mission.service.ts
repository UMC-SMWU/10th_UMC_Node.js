import { AppError } from "../../../common/errors/app.error";
import { prisma } from "../../../db.config";
import { UserMissionResponse } from "../dtos/user-mission.dto";

export const createUserMission = async (
  userId: number,
  missionId: number,
): Promise<UserMissionResponse> => {
  if (!Number.isInteger(missionId)) {
    throw new AppError({
      errorCode: "M001",
      statusCode: 400,
      message: "올바른 미션 ID가 필요합니다.",
    });
  }

  const userMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
    },
  });

  return {
    id: userMission.id,
    userId: userMission.userId,
    missionId: userMission.missionId,
  };
};
