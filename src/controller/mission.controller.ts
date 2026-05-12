import { Request, Response } from 'express';

import { CustomError } from '../errors/customError';
import { getMissionsByStoreId } from '../service/mission.service';

// ⭐ 특정 가게의 미션 목록
export const getMissionsByStoreIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const storeId = Number(req.params.storeId);

    const missions = await getMissionsByStoreId(storeId);

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '가게 미션 목록 조회 성공',
      result: missions,
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