export interface AddReviewRequest {
  userId: number;
  body:   string;
  score:  number;
}

export const responseFromReview = (review: any) => ({
  reviewId:  review.id,
  storeId:   review.store_id,
  userId:    review.user_id,
  body:      review.body,
  score:     review.score,
  createdAt: review.created_at,
});