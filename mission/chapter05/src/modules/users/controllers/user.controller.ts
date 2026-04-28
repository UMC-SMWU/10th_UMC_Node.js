import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignUpRequest, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userSignUp(req.body as UserSignUpRequest);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseFromUser(user),
      error: null,
    });
  } catch (err: any) {
    if (err.message === "이미 사용 중인 이메일입니다.") {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        data: null,
        error: { code: "AUTH409", message: err.message },
      });
    } else {
      next(err);
    }
  }
};