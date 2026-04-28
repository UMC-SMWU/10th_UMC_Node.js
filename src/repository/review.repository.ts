import { CreateReviewDto } from '../dto/review.dto';

const reviews: any[] = [];

export const createReview = async (
  userId: number,
  data: CreateReviewDto
) => {
  const newReview = {
    id: reviews.length + 1,
    userId,
    storeId: data.storeId,
    content: data.content,
    score: data.score,
  };

  reviews.push(newReview);

  return newReview;
};