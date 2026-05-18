import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

import swaggerDocument from "./generated/swagger.json" assert { type: "json" };
import { RegisterRoutes } from "./generated/routes.js";
import { CustomError } from "./common/errors.js";
import { errorResponse } from "./common/response.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

RegisterRoutes(app);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidateError) {
    return res.status(400).json(
      errorResponse(400, "요청 값이 올바르지 않습니다.", err.fields)
    );
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(
      errorResponse(err.statusCode, err.message)
    );
  }

  console.error(err);

  return res.status(500).json(
    errorResponse(500, "서버 오류가 발생했습니다.")
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[swagger]: Swagger docs are available at http://localhost:${port}/docs`);
});
