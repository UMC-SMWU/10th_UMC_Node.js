export interface ChallengeMissionResponseDto {
  id: number;
  userId: number;
  missionId: number;
  status: string;
}

export interface InProgressMissionResponseDto {
  id: number;
  userId: number;
  missionId: number;
  status: string;
}

export interface CompleteMissionResponseDto {
  count: number;
}