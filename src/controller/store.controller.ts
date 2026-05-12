import { Request, Response } from 'express';

import { createStore as createStoreService } from '../service/store.service';

// ⭐ 가게 생성
export const createStore = async (
  req: Request,
  res: Response
) => {
  try {
    const regionId = Number(req.params.regionId);

    const result = await createStoreService(
      regionId,
      req.body
    );

    return res.status(201).json({
      isSuccess: true,
      code: 'COMMON201',
      message: '가게 생성 성공',
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '가게 생성 실패',
    });
  }
};