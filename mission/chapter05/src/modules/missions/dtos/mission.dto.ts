export interface AddMissionRequest {
  reward:      number;
  deadline:    string;
  missionSpec: string;
}

export interface ChallengeMissionRequest {
  userId: number;
}

export const responseFromMission = (mission: any) => ({
  missionId:   mission.id,
  storeId:     mission.store_id,
  reward:      mission.reward,
  deadline:    mission.deadline,
  missionSpec: mission.mission_spec,
  createdAt:   mission.created_at,
});

export const responseFromChallenge = (memberMission: any) => ({
  memberMissionId: memberMission.id,
  userId:          memberMission.user_id,
  missionId:       memberMission.mission_id,
  status:          memberMission.status,
  createdAt:       memberMission.created_at,
});