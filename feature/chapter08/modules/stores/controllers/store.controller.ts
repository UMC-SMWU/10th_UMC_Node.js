// 기존 Express 방식 controller는 TSOA Swagger 문서화를 위해 주석 처리했습니다.
// import { Request, Response, NextFunction } from "express";
// import { StatusCodes } from "http-status-codes";

import {
  Controller,
  Get,
  Path,
  Query,
  Route,
  Tags,
  Response,
} from "tsoa";
import { listStoreReviews } from "../services/store.service.js";
import {
  ErrorResponseDto,
  ReviewListResponse,
} from "../dtos/store.dto.js";

@Route("stores") // 라우트 경로: /stores
@Tags("Stores") // Swagger 태그
export class StoreController extends Controller {
  /**
   * 특정 가게의 리뷰 목록 조회 API
   *
   * storeId에 해당하는 가게의 리뷰 목록을 cursor pagination 방식으로 조회합니다.
   * 첫 요청에서는 cursor를 보내지 않아도 되며, 다음 페이지 조회 시 응답으로 받은 cursor를 query parameter로 전달합니다.
   */
  @Get("{storeId}/reviews") // 엔드포인트: GET /stores/{storeId}/reviews
  @Response<ErrorResponseDto>("400", "잘못된 요청입니다.")
  @Response<ErrorResponseDto>("404", "존재하지 않는 가게입니다.")
  @Response<ErrorResponseDto>("500", "서버 내부 오류입니다.")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number,
  ): Promise<ReviewListResponse> {
    const reviews = await listStoreReviews(storeId, cursor ?? null);

    return reviews;
  }
}
