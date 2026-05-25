import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Route,
  Tags,
  Response as TsoaResponse,
} from "tsoa";
import { Request as ExpressRequest } from "express";

import {
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto";
import { userSignUp } from "../services/user.service";

import {
  ApiResponse,
  success,
} from "../../../common/responses/response";
import { isLogin } from "../../../common/middlewares/auth.middleware";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup")
  @TsoaResponse<UserSignUpResponse>(200, "회원가입 성공")
  @TsoaResponse<null>(400, "잘못된 요청")
  @TsoaResponse<null>(409, "중복된 이메일")
  @TsoaResponse<null>(500, "서버 내부 오류")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);

    const user = await userSignUp(body);

    return success(user);
  }

  /**
   * 게스트 페이지 API
   * @summary 로그인 없이 접근 가능한 게스트 페이지를 반환합니다.
   */
  @Get("guest")
  @TsoaResponse<string>(200, "게스트 페이지 조회 성공")
  public async handleGuestPage(): Promise<string> {
    return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
    `;
  }

  /**
   * 로그인 페이지 API
   * @summary 로그인이 필요한 사용자에게 안내할 로그인 페이지를 반환합니다.
   */
  @Get("login")
  @TsoaResponse<string>(200, "로그인 페이지 조회 성공")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  /**
   * 마이페이지 API
   * @summary JWT 인증된 사용자의 마이페이지를 반환합니다.
   */
  @Get("mypage")
  @Middlewares(isLogin)
  @TsoaResponse<string>(200, "마이페이지 조회 성공")
  @TsoaResponse<null>(401, "로그인이 필요합니다")
  public async handleMypage(@Request() req: ExpressRequest): Promise<string> {
    const loginUser = req.user as { name?: string; email?: string };
    const displayName = loginUser.name ?? loginUser.email ?? "사용자";

    return `
      <h1>마이페이지</h1>
      <p>환영합니다, ${displayName}님!</p>
      <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `;
  }

  /**
   * 로그인 쿠키 생성 API
   * @summary 테스트용 로그인 쿠키를 생성합니다.
   */
  @Get("set-login")
  @TsoaResponse<string>(200, "로그인 쿠키 생성 성공")
  public async handleSetLogin(): Promise<string> {
    return 'JWT 로그인은 <a href="/oauth2/login/google">Google 로그인</a>으로 진행해주세요.';
  }

  /**
   * 로그아웃 API
   * @summary 로그인 쿠키를 확인한 뒤 로그아웃 처리를 수행합니다.
   */
  @Get("set-logout")
  @Middlewares(isLogin)
  @TsoaResponse<string>(200, "로그아웃 성공")
  @TsoaResponse<null>(401, "로그인이 필요합니다")
  public async handleSetLogout(): Promise<string> {
    return "JWT 로그아웃은 클라이언트에서 토큰을 삭제하면 완료됩니다.";
  }
}
