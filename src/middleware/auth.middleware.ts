import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth";
import { getUserIdFromJwtPayload, verifyJwt } from "../utils/jwt";

export const isLogin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      isSuccess: false,
      code: "AUTH401",
      message: "로그인이 필요합니다.",
      result: null,
    });
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const payload = verifyJwt(token);

    req.user = {
      id: getUserIdFromJwtPayload(payload),
    };

    return next();
  } catch {
    return res.status(401).json({
      isSuccess: false,
      code: "AUTH401",
      message: "유효하지 않은 토큰입니다.",
      result: null,
    });
  }
};
