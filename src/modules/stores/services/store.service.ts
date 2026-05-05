import {
  getAllStoreReviews,
  getMyReviews,
  getStoreMissions,
  getMyMissions,
  completeMission,
} from "../repositories/store.repository.js";
import {
  responseFromReviews,
  responseFromMyReviews,
  responseFromStoreMissions,
  responseFromMyMissions,
} from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId: number, cursor: number) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listMyReviews = async (userId: number, cursor: number) => {
  const reviews = await getMyReviews(userId, cursor);
  return responseFromMyReviews(reviews);
};

export const listStoreMissions = async (storeId: number, cursor: number) => {
  const missions = await getStoreMissions(storeId, cursor);
  return responseFromStoreMissions(missions);
};

export const listMyMissions = async (userId: number, cursor: number) => {
  const missions = await getMyMissions(userId, cursor);
  return responseFromMyMissions(missions);
};

export const finishMission = async (userMissionId: number) => {
  return await completeMission(userMissionId);
};