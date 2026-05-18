
import {
  Controller,
  Get,
  Path,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

/**
 * 가게 API Swagger 문서화
 */
@Route("stores")
@Tags("Stores")
export class StoreSwaggerController extends Controller {
  /**
   * 가게 리뷰 목록 조회 API
   */
  @SuccessResponse("200", "가게 리뷰 조회 성공")
  @Response("404", "가게를 찾을 수 없음")
  @Get("/{storeId}/reviews")
  public async getStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 200,
      message: "가게 리뷰 조회 성공",
      result: {
        storeId,
        cursor,
      },
    };
  }

  /**
   * 가게 미션 목록 조회 API
   */
  @SuccessResponse("200", "가게 미션 조회 성공")
  @Response("404", "가게를 찾을 수 없음")
  @Get("/{storeId}/missions")
  public async getStoreMissions(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 200,
      message: "가게 미션 조회 성공",
      result: {
        storeId,
        cursor,
      },
    };
  }
}
