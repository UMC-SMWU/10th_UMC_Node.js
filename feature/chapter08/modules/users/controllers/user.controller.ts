import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  Response,
  SuccessResponse,
} from "tsoa";
import {
  ErrorResponseDto,
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users") // 라우트 경로: /users
@Tags("Users") // Swagger 태그
export class UserController extends Controller {
  /**
   * 회원가입 API
   *
   * 사용자의 기본 정보와 선호 음식 카테고리를 받아 회원가입을 진행합니다.
   */
  @Post("signup") // 엔드포인트: POST /users/signup
  @SuccessResponse("201", "회원가입 성공")
  @Response<ErrorResponseDto>("400", "잘못된 요청입니다.")
  @Response<ErrorResponseDto>("409", "이미 존재하는 이메일입니다.")
  @Response<ErrorResponseDto>("500", "서버 내부 오류입니다.")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<UserSignUpResponse> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);

    const user = await userSignUp(body); // 서비스 로직 호출

    this.setStatus(201); // Swagger 성공 응답 코드와 실제 응답 코드를 맞춤
    return user; // 성공 응답 보내기
  }
}
