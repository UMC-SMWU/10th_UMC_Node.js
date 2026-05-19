import { Request, Response } from 'express';

import { CustomError } from '../errors/customError';
import { createStore as createStoreService } from '../service/store.service';

// ⭐ 가게 생성
export const createStore = async (
  req: Request,
  res: Response
) => {
  try {
    const regionId = Number(req.params.regionId);

    const result = await createStoreService(regionId, req.body);

    return res.status(201).json({
      isSuccess: true,
      code: 'COMMON201',
      message: '가게 생성 성공',
      result: result,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        isSuccess: false,
        code: error.code,
        message: error.message,
        result: null,
      });
    }

    return res.status(500).json({
      isSuccess: false,
      code: 'COMMON500',
      message: '서버 에러가 발생했습니다.',
      result: null,
    });
  }
};