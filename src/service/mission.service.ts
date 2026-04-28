import * as missionRepository from '../repository/mission.repository';
import * as userMissionRepository from '../repository/userMission.repository';

export const challengeMission = async (missionId: number) => {
  const userId = 1;

  const mission = await missionRepository.findMissionById(missionId);

  if (!mission) {
    throw new Error('존재하지 않는 미션입니다.');
  }

  const alreadyChallenging =
    await userMissionRepository.findChallengingMission(userId, missionId);

  if (alreadyChallenging) {
    throw new Error('이미 도전 중인 미션입니다.');
  }

  return userMissionRepository.createUserMission(userId, missionId);
};