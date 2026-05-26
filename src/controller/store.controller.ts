// store.controller.ts

import {
  Route,
  Tags,
  Post,
  Middlewares,
  Path,
  Body,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";

import { CustomError } from "../errors/customError";
import { isLogin } from "../middleware/auth.middleware";
import { createStore as createStoreService } from "../service/store.service";

@Route("regions")
@Tags("Store")
export class StoreController {
  /**
   * 가게 생성 API
   */
  @Middlewares(isLogin)
  @Post("{regionId}/stores")
  @SuccessResponse("201", "가게 생성 성공")
  @TsoaResponse("400", "잘못된 요청")
  @TsoaResponse("404", "지역을 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async createStore(@Path() regionId: number, @Body() body: any) {
    try {
      const result = await createStoreService(regionId, body);

      return {
        isSuccess: true,
        code: "COMMON201",
        message: "가게 생성 성공",
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
