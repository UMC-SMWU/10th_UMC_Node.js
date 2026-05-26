// userMission.controller.ts

import {
  Route,
  Tags,
  Post,
  Get,
  Patch,
  Middlewares,
  Path,
  Request,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";

import { CustomError } from "../errors/customError";
import { isLogin } from "../middleware/auth.middleware";
import { AuthRequest } from "../types/auth";

import {
  challengeMission,
  getMyInProgressMissions,
  completeMission,
} from "../service/userMission.service";

@Route("missions")
@Tags("UserMission")
export class UserMissionController {
  /**
   * 미션 도전 API
   */
  @Middlewares(isLogin)
  @Post("{missionId}/challenge")
  @SuccessResponse("201", "미션 도전 성공")
  @TsoaResponse("400", "이미 도전 중인 미션")
  @TsoaResponse("404", "미션을 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async challengeMissionController(
    @Request() req: AuthRequest,
    @Path() missionId: number,
  ) {
    try {
      const result = await challengeMission(req.user!.id, missionId);

      return {
        isSuccess: true,
        code: "COMMON201",
        message: "미션 도전 성공",
        result: result,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          isSuccess: false,
          code: error.code,
          message: error.message,
          result: null,
        };
      }

      return {
        isSuccess: false,
        code: "COMMON500",
        message: "서버 에러가 발생했습니다.",
        result: null,
      };
    }
  }

  /**
   * 진행 중 미션 목록 조회 API
   */
  @Middlewares(isLogin)
  @Get("my/in-progress")
  @SuccessResponse("200", "진행 중 미션 목록 조회 성공")
  @TsoaResponse("404", "진행 중인 미션이 없음")
  @TsoaResponse("500", "서버 에러")
  public async getMyInProgressMissionsController(@Request() req: AuthRequest) {
    try {
      const missions = await getMyInProgressMissions(req.user!.id);

      return {
        isSuccess: true,
        code: "COMMON200",
        message: "진행 중 미션 목록 조회 성공",
        result: missions,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          isSuccess: false,
          code: error.code,
          message: error.message,
          result: null,
        };
      }

      return {
        isSuccess: false,
        code: "COMMON500",
        message: "서버 에러가 발생했습니다.",
        result: null,
      };
    }
  }

  /**
   * 미션 완료 처리 API
   */
  @Middlewares(isLogin)
  @Patch("{missionId}/complete")
  @SuccessResponse("200", "미션 완료 처리 성공")
  @TsoaResponse("400", "완료할 수 없는 미션")
  @TsoaResponse("404", "미션을 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async completeMissionController(
    @Request() req: AuthRequest,
    @Path() missionId: number,
  ) {
    try {
      const result = await completeMission(req.user!.id, missionId);

      return {
        isSuccess: true,
        code: "COMMON200",
        message: "미션 완료 처리 성공",
        result: result,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          isSuccess: false,
          code: error.code,
          message: error.message,
          result: null,
        };
      }

      return {
        isSuccess: false,
        code: "COMMON500",
        message: "서버 에러가 발생했습니다.",
        result: null,
      };
    }
  }
}
