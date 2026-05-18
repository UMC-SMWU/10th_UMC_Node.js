// 기존 Express 방식 Controller는 TSOA Swagger 문서 생성을 위해 아래 TSOA 방식 Controller로 변경하였습니다.
// import { Request, Response, NextFunction } from "express";
// import { StatusCodes } from "http-status-codes";
// import { changeMissionToComplete } from "../services/mission.service.js";
// import { successResponse } from "../../../common/responses/response.js";
// import { CustomError } from "../../../common/errors/customError.js";
//
// export const handleCompleteMission = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const userId = parseInt(req.params.userId, 10);
//     const userMissionId = parseInt(req.params.userMissionId, 10);
//
//     if (Number.isNaN(userId)) {
//       throw new CustomError(StatusCodes.BAD_REQUEST, "userId가 올바르지 않습니다.");
//     }
//
//     if (Number.isNaN(userMissionId)) {
//       throw new CustomError(StatusCodes.BAD_REQUEST, "userMissionId가 올바르지 않습니다.");
//     }
//
//     const result = await changeMissionToComplete(userId, userMissionId);
//
//     res
//       .status(StatusCodes.OK)
//       .json(successResponse(result, "미션 완료 처리 성공"));
//   } catch (err) {
//     next(err);
//   }
// };

import {
  Controller,
  Path,
  Patch,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { changeMissionToComplete } from "../services/mission.service.js";
import {
  CompletedMissionResponseDto,
  ErrorResponseDto,
} from "../dtos/mission.dto.js";
import { CustomError } from "../../../common/errors/customError.js";

/**
 * 사용자 미션 관련 API를 처리하는 컨트롤러입니다.
 */
@Route("users/{userId}/missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 사용자가 진행 중인 미션을 진행 완료 상태로 변경합니다.
   *
   * @param userId 사용자 ID
   * @param userMissionId 사용자 미션 ID
   * @returns 완료 처리된 사용자 미션 정보
   */
  @Patch("{userMissionId}/complete")
  @SuccessResponse("200", "미션 완료 처리 성공")
  @Response<ErrorResponseDto>("400", "요청 파라미터가 올바르지 않습니다.")
  @Response<ErrorResponseDto>("404", "존재하지 않는 사용자 또는 미션입니다.")
  @Response<ErrorResponseDto>("500", "서버 오류")
  public async completeMission(
    @Path() userId: number,
    @Path() userMissionId: number
  ): Promise<CompletedMissionResponseDto> {
    if (Number.isNaN(userId)) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "userId가 올바르지 않습니다.");
    }

    if (Number.isNaN(userMissionId)) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "userMissionId가 올바르지 않습니다."
      );
    }

    const result = await changeMissionToComplete(userId, userMissionId);

    this.setStatus(StatusCodes.OK);
    return result;
  }
}
