import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AddReviewRequest, responseFromReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const review = await reviewAdd(storeId, req.body as AddReviewRequest);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseFromReview(review),
      error: null,
    });
  } catch (err: any) {
    if (err.message === "존재하지 않는 가게입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: null,
        error: { code: "STORE404", message: err.message },
      });
    } else {
      next(err);
    }
  }
};