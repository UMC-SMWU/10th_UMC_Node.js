import { HealthCheckResponse } from "../dtos/health.dto";

export const getHealthCheck = async (): Promise<HealthCheckResponse> => {
  return {
    message: "OK",
  };
};
