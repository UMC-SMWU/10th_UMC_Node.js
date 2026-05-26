import { CustomError } from '../errors/customError';

import { findUserById } from '../repository/user.repository';
import { findMissionById } from '../repository/mission.repository';

import {
  findChallengingMission,
  createUserMission,
  findUserMissionInProgress,
  updateUserMissionToComplete,
} from '../repository/userMission.repository';

// ⭐ 미션 도전
export const challengeMission = async (
  userId: number,
  missionId: number
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new CustomError(
      404,
      'USER_NOT_FOUND',
      '존재하지 않는 사용자입니다.'
    );
  }

  const mission = await findMissionById(missionId);

  if (!mission) {
    throw new CustomError(
      404,
      'MISSION_NOT_FOUND',
      '존재하지 않는 미션입니다.'
    );
  }

  const alreadyChallenging =
    await findChallengingMission(userId, missionId);

  if (alreadyChallenging) {
    throw new CustomError(
      409,
      'MISSION_ALREADY_CHALLENGING',
      '이미 도전 중인 미션입니다.'
    );
  }

  return await createUserMission(userId, missionId);
};

// ⭐ 내가 진행 중인 미션 목록
export const getMyInProgressMissions = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new CustomError(
      404,
      'USER_NOT_FOUND',
      '존재하지 않는 사용자입니다.'
    );
  }

  return await findUserMissionInProgress(userId);
};

// ⭐ 미션 완료 처리
export const completeMission = async (
  userId: number,
  missionId: number
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new CustomError(
      404,
      'USER_NOT_FOUND',
      '존재하지 않는 사용자입니다.'
    );
  }

  const result = await updateUserMissionToComplete(
    userId,
    missionId
  );

  if (result.count === 0) {
    throw new CustomError(
      400,
      'MISSION_CANNOT_COMPLETE',
      '완료할 수 있는 미션이 없습니다.'
    );
  }

  return result;
};
