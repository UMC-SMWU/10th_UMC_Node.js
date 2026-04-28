import { AddMissionRequest, ChallengeMissionRequest } from "../dtos/mission.dto.js";
import { addMission, getMission, getChallengingMission, addMemberMission, getMemberMission } from "../repositories/mission.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";

export const missionAdd = async (storeId: number, data: AddMissionRequest) => {
  const store = await getStore(storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");

  const missionId = await addMission({ ...data, storeId });
  const mission = await getMission(missionId);
  return mission;
};

export const missionChallenge = async (missionId: number, data: ChallengeMissionRequest) => {
  const mission = await getMission(missionId);
  if (!mission) throw new Error("존재하지 않는 미션입니다.");

  const existing = await getChallengingMission(data.userId, missionId);
  if (existing) throw new Error("이미 도전 중인 미션입니다.");

  const memberMissionId = await addMemberMission(data.userId, missionId);
  const memberMission = await getMemberMission(memberMissionId);
  return memberMission;
};