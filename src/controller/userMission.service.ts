import * as userMissionRepository from '../repository/userMission.repository';

// ⭐ 내가 진행 중인 미션 목록
export const getMyInProgressMissions = async () => {
  const userId = 1;

  return await userMissionRepository.findUserMissionInProgress(userId);
};

// ⭐ 미션 완료 처리
export const completeMission = async (missionId: number) => {
  const userId = 1;

  const result = await userMissionRepository.updateUserMissionToComplete(
    userId,
    missionId
  );

  if (result.count === 0) {
    throw new Error('완료할 수 있는 미션이 없습니다.');
  }

  return result;
};