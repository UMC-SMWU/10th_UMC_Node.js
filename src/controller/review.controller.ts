import { Request, Response } from 'express';

import {
  createReview,
  getMyReviews,
} from '../service/review.service';

// ⭐ 리뷰 생성
export const createReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createReview(req.body);

    return res.status(201).json({
      isSuccess: true,
      code: 'COMMON201',
      message: '리뷰 생성 성공',
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '리뷰 생성 실패',
    });
  }
};

// ⭐ 내가 작성한 리뷰 목록
export const getMyReviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await getMyReviews();

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '내 리뷰 목록 조회 성공',
      result: reviews,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '내 리뷰 목록 조회 실패',
    });
  }
};