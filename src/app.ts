import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import path from "path";
import fs from "fs";
import "dotenv/config";

import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";
import { googleStrategy, jwtStrategy, type AuthTokens } from "./auth.config";
import { isLogin } from "./common/middlewares/auth.middleware";
import { success } from "./common/responses/response";
import { updateMyProfile } from "./modules/users/services/user.service";
import { UserUpdateMeRequest } from "./modules/users/dtos/user.dto";
import { createStore } from "./modules/stores/services/store.service";
import { CreateStoreRequest } from "./modules/stores/dtos/store.dto";
import { createReview } from "./modules/reviews/services/review.service";
import { CreateReviewRequest } from "./modules/reviews/dtos/review.dto";
import { createUserMission } from "./modules/missions/services/user-mission.service";

const app: Express = express();
const port = process.env.PORT || 3000;

passport.use(googleStrategy);
passport.use(jwtStrategy);

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

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

app.patch(
  "/api/v1/users/me",
  isLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUser = req.user as { id: number };
      const updatedUser = await updateMyProfile(
        loginUser.id,
        req.body as UserUpdateMeRequest,
      );

      res.json(success(updatedUser));
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/v1/stores",
  isLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await createStore(req.body as CreateStoreRequest);

      res.status(201).json(success(store));
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/v1/stores/:storeId/reviews",
  isLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUser = req.user as { id: number };
      const review = await createReview(
        Number(req.params.storeId),
        loginUser.id,
        req.body as CreateReviewRequest,
      );

      res.status(201).json(success(review));
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/v1/missions/:missionId/users",
  isLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUser = req.user as { id: number };
      const userMission = await createUserMission(
        loginUser.id,
        Number(req.params.missionId),
      );

      res.status(201).json(success(userMission));
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/oauth2/login/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  }),
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req: Request, res: Response) => {
    const tokens = req.user as AuthTokens;

    res.json({
      success: true,
      tokens,
    });
  },
);

app.get("/login-failed", (_req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "Google 로그인에 실패했습니다.",
  });
});

app.get("/mypage", isLogin, (req: Request, res: Response) => {
  const user = req.user as unknown;

  res.json({
    success: true,
    message: "인증 성공! 마이페이지 접근 가능",
    user,
  });
});

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
