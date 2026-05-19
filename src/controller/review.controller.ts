// review.controller.ts

import {
  Route,
  Tags,
  Post,
  Get,
  Body,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";

import { CustomError } from "../errors/customError";
import { createReview, getMyReviews } from "../service/review.service";

@Route("reviews")
@Tags("Review")
export class ReviewController {
  /**
   * 리뷰 생성 API
   */
  @Post("/")
  @SuccessResponse("201", "리뷰 생성 성공")
  @TsoaResponse("400", "잘못된 요청")
  @TsoaResponse("404", "가게를 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async createReviewController(@Body() body: any) {
    try {
      const result = await createReview(body);

      return {
        isSuccess: true,
        code: "COMMON201",
        message: "리뷰 생성 성공",
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
   * 내가 작성한 리뷰 목록 조회 API
   */
  @Get("/my")
  @SuccessResponse("200", "내 리뷰 목록 조회 성공")
  @TsoaResponse("404", "리뷰를 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async getMyReviewsController() {
    try {
      const reviews = await getMyReviews();

      return {
        isSuccess: true,
        code: "COMMON200",
        message: "내 리뷰 목록 조회 성공",
        result: reviews,
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
