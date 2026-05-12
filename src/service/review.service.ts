import { CreateReviewDto } from '../dto/review.dto';

import { findUserById } from '../repository/user.repository';
import { findStoreById } from '../repository/store.repository';

import {
  createReview as createReviewRepository,
  findReviewsByUserId,
} from '../repository/review.repository';

// ⭐ 리뷰 생성
export const createReview = async (
  data: CreateReviewDto
) => {
  const userId = 1;

  const user = await findUserById(userId);

  if (!user) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  const store = await findStoreById(data.storeId);

  if (!store) {
    throw new Error(
      '리뷰를 작성하려는 가게가 존재하지 않습니다.'
    );
  }

  return await createReviewRepository(userId, data);
};

// ⭐ 내가 작성한 리뷰 목록
export const getMyReviews = async () => {
  const userId = 1;

  const user = await findUserById(userId);

  if (!user) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  return await findReviewsByUserId(userId);
};