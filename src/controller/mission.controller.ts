import {
  findMissionById,
  findMissionsByStoreId,
} from '../repository/mission.repository';

import {
  findChallengingMission,
  createUserMission,
} from '../repository/userMission.repository';

// ⭐ 미션 도전
export const challengeMission = async (
  missionId: number
) => {
  const userId = 1;

  const mission = await findMissionById(missionId);

  if (!mission) {
    throw new Error('존재하지 않는 미션입니다.');
  }

  const alreadyChallenging =
    await findChallengingMission(userId, missionId);

  if (alreadyChallenging) {
    throw new Error('이미 도전 중인 미션입니다.');
  }

  return await createUserMission(userId, missionId);
};

// ⭐ 특정 가게의 미션 목록
export const getMissionsByStoreId = async (
  storeId: number
) => {
  return await findMissionsByStoreId(storeId);
};