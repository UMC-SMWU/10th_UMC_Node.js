import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import "dotenv/config";

import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// Swagger UI 연결
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8"),
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// TSOA 라우터 연결
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

// 표준 에러 핸들러
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "UNKNOWN",
      reason: err.message || "알 수 없는 오류가 발생했습니다.",
      data: err.data ?? null,
    },
    success: null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;