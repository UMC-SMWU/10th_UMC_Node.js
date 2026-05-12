import { findMissionsByStoreId } from '../repository/mission.repository';

// ⭐ 특정 가게의 미션 목록
export const getMissionsByStoreId = async (
  storeId: number
) => {
  return await findMissionsByStoreId(storeId);
};