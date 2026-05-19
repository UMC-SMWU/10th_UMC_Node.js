// mission.controller.ts

import {
  Route,
  Tags,
  Get,
  Path,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";

import { CustomError } from "../errors/customError";
import { getMissionsByStoreId } from "../service/mission.service";

@Route("stores")
@Tags("Mission")
export class MissionController {
  /**
   * 특정 가게의 미션 목록 조회 API
   */
  @Get("{storeId}/missions")
  @SuccessResponse("200", "가게 미션 목록 조회 성공")
  @TsoaResponse("404", "가게를 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async getMissionsByStoreIdController(@Path() storeId: number) {
    try {
      const missions = await getMissionsByStoreId(storeId);

      return {
        isSuccess: true,
        code: "COMMON200",
        message: "가게 미션 목록 조회 성공",
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
}
