import { Controller, Get, Patch, Path, Post, Route, Tags } from 'tsoa';

import {
  challengeMission,
  getMyInProgressMissions,
  completeMission,
} from '../service/userMission.service';

@Route('missions')
@Tags('UserMissions')
export class UserMissionController extends Controller {
  // 미션 도전
  @Post('{missionId}/challenge')
  public async challengeMissionController(
    @Path() missionId: number
  ) {
    try {
      const result = await challengeMission(missionId);

      this.setStatus(201);

      return {
        isSuccess: true,
        code: 'COMMON201',
        message: '미션 도전 성공',
        result,
      };
    } catch (error) {
      this.setStatus(400);

      return {
        isSuccess: false,
        code: 'COMMON400',
        message:
          error instanceof Error
            ? error.message
            : '미션 도전 실패',
      };
    }
  }

  // 진행 중 미션 목록
  @Get('me/in-progress')
  public async getMyInProgressMissionsController() {
    try {
      const missions = await getMyInProgressMissions();

      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '진행 중 미션 목록 조회 성공',
        result: missions,
      };
    } catch (error) {
      this.setStatus(400);

      return {
        isSuccess: false,
        code: 'COMMON400',
        message:
          error instanceof Error
            ? error.message
            : '진행 중 미션 목록 조회 실패',
      };
    }
  }

  // 미션 완료 처리
  @Patch('{missionId}/complete')
  public async completeMissionController(
    @Path() missionId: number
  ) {
    try {
      const result = await completeMission(missionId);

      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '미션 완료 처리 성공',
        result,
      };
    } catch (error) {
      this.setStatus(400);

      return {
        isSuccess: false,
        code: 'COMMON400',
        message:
          error instanceof Error
            ? error.message
            : '미션 완료 처리 실패',
      };
    }
  }
}