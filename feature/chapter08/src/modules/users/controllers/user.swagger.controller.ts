
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

import { UserSignUpRequest } from "../dtos/user.dto.js";

/**
 * 유저 API Swagger 문서화
 */
@Route("users")
@Tags("Users")
export class UserSwaggerController extends Controller {
  /**
   * 회원가입 API
   */
  @SuccessResponse("201", "회원가입 성공")
  @Response("400", "잘못된 요청")
  @Post("/signup")
  public async signUp(
    @Body() body: UserSignUpRequest
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 201,
      message: "회원가입 성공",
      result: body,
    };
  }

  /**
   * 내가 작성한 리뷰 목록 조회 API
   */
  @SuccessResponse("200", "리뷰 조회 성공")
  @Response("400", "잘못된 요청")
  @Get("/{userId}/reviews")
  public async getMyReviews(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 200,
      message: "리뷰 조회 성공",
      result: {
        userId,
        cursor,
      },
    };
  }

  /**
   * 내가 진행 중인 미션 목록 조회 API
   */
  @SuccessResponse("200", "미션 조회 성공")
  @Response("400", "잘못된 요청")
  @Get("/{userId}/missions")
  public async getMyMissions(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<object> {
    return {
      isSuccess: true,
      code: 200,
      message: "미션 조회 성공",
      result: {
        userId,
        cursor,
      },
    };
  }
}
