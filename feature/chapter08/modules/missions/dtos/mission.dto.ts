/**
 * 미션 완료 처리 후 반환되는 미션 정보입니다.
 */
export interface CompletedMissionResponseDto {
  /** 사용자 미션 ID */
  userMissionId: number;

  /** 미션 진행 상태 */
  status: string;

  /** 완료 처리된 미션 정보 */
  mission: unknown;
}

/**
 * API 실패 응답 형식입니다.
 */
export interface ErrorResponseDto {
  /** 요청 성공 여부 */
  isSuccess: false;

  /** HTTP 상태 코드 */
  code: number;

  /** 에러 메시지 */
  message: string;
}

export const responseFromCompletedMission = (
  userMission: any
): CompletedMissionResponseDto => {
  return {
    userMissionId: userMission.id,
    status: userMission.status,
    mission: userMission.mission,
  };
};
