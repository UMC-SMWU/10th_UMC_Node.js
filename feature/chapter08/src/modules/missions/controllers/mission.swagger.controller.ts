
import {
  Controller,
  Patch,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

/**
 * 미션 API Swagger 문서화
 */
@Route("missions")
@Tags("Missions")
export class MissionSwaggerController extends Controller {
  /**
   * 미션 완료 처리 API
   */
  @SuccessResponse("200", "미션 완료 성공")
  @Response("400", "잘못된 요청")
  @Response("404", "미션을 찾을 수 없음")
  @Patch("/{userId}/{userMissionId}/complete")
  public async completeMission(
    @Path() userId: number,
    @Path() userMissionId: number
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 200,
      message: "미션 완료 성공",
      result: {
        userId,
        userMissionId,
      },
    };
  }
}
