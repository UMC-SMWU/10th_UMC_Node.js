import { Request, Response } from 'express';
import * as reviewService from '../service/review.service';

export const createReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.createReview(req.body);

    res.status(201).json({
      success: true,
      message: '리뷰가 작성되었습니다.',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};