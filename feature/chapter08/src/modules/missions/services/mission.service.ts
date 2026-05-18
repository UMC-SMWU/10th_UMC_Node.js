import { responseFromCompletedMission } from "../dtos/mission.dto.js";
import {
  findUserMission,
  updateUserMissionToComplete,
} from "../repositories/mission.repository.js";
import {
  AlreadyCompletedMissionError,
  UserMissionNotFoundError,
} from "../../../common/errors/customError.js";

export const changeMissionToComplete = async (
  userId: number,
  userMissionId: number
) => {
  const userMission = await findUserMission(userId, userMissionId);

  if (!userMission) {
    throw new UserMissionNotFoundError();
  }

  if (userMission.status === "COMPLETE") {
    throw new AlreadyCompletedMissionError();
  }

  const completedMission = await updateUserMissionToComplete(userMissionId);
  return responseFromCompletedMission(completedMission);
};
