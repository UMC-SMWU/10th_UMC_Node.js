import {
  Body,
  Middlewares,
  Patch,
  Request,
  Response as TsoaResponse,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

import { UpdateMyInfoDto } from "../dto/user.dto";
import { CustomError } from "../errors/customError";
import { isLogin } from "../middleware/auth.middleware";
import { updateMyInfo } from "../service/user.service";
import { AuthRequest } from "../types/auth";

@Route("users")
@Tags("User")
export class UserController {
  @Middlewares(isLogin)
  @Patch("me")
  @SuccessResponse("200", "내 정보 수정 성공")
  @TsoaResponse("401", "로그인 필요")
  @TsoaResponse("404", "사용자를 찾을 수 없음")
  @TsoaResponse("500", "서버 에러")
  public async updateMyInfoController(
    @Request() req: AuthRequest,
    @Body() body: UpdateMyInfoDto,
  ) {
    try {
      const userId = req.user!.id;
      const result = await updateMyInfo(userId, body);

      return {
        isSuccess: true,
        code: "COMMON200",
        message: "내 정보 수정 성공",
        result,
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
