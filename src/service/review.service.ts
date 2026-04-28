import { CreateReviewDto } from '../dto/review.dto';
import * as storeRepository from '../repository/store.repository';
import * as reviewRepository from '../repository/review.repository';

export const createReview = async (data: CreateReviewDto) => {
  const userId = 1;

  const store = await storeRepository.findStoreById(data.storeId);

  if (!store) {
    throw new Error('리뷰를 작성하려는 가게가 존재하지 않습니다.');
  }

  return reviewRepository.createReview(userId, data);
};