import { AddReviewRequest } from "../dtos/review.dto.js";
import { addReview, getReview } from "../repositories/review.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";

export const reviewAdd = async (storeId: number, data: AddReviewRequest) => {
  const store = await getStore(storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");

  const reviewId = await addReview({ ...data, storeId });
  const review = await getReview(reviewId);
  return review;
};