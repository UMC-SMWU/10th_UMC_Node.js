import { AppError } from "../../../common/errors/app.error";
import { prisma } from "../../../db.config";
import { CreateReviewRequest, ReviewResponse } from "../dtos/review.dto";

export const createReview = async (
  storeId: number,
  userId: number,
  data: CreateReviewRequest,
): Promise<ReviewResponse> => {
  if (!Number.isInteger(storeId)) {
    throw new AppError({
      errorCode: "R001",
      statusCode: 400,
      message: "올바른 가게 ID가 필요합니다.",
    });
  }

  if (!data.content) {
    throw new AppError({
      errorCode: "R002",
      statusCode: 400,
      message: "리뷰 내용은 필수입니다.",
    });
  }

  const review = await prisma.review.create({
    data: {
      storeId,
      userId,
      content: data.content,
    },
  });

  return {
    id: review.id,
    storeId: review.storeId,
    userId: review.userId,
    content: review.content,
  };
};
