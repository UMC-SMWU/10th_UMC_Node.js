import {
  Controller,
  Get,
  Route,
  Tags,
  Response as TsoaResponse,
} from "tsoa";

import { ApiResponse, success } from "../common/responses/response";
import { HealthCheckResponse } from "../dtos/health.dto";
import { getHealthCheck } from "../services/health.service";

@Route("health")
@Tags("Health")
export class HealthController extends Controller {
  /**
   * 서버 상태 확인 API
   * @summary 서버가 정상적으로 동작하는지 확인하는 엔드포인트입니다.
   */
  @Get()
  @TsoaResponse<HealthCheckResponse>(200, "서버 상태 확인 성공")
  @TsoaResponse<null>(500, "서버 내부 오류")
  public async getHealth(): Promise<ApiResponse<HealthCheckResponse>> {
    const health = await getHealthCheck();

    return success(health);
  }
}