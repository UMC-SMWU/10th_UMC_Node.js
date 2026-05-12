import { Request, Response } from 'express';

import { getMissionsByStoreId } from '../service/mission.service';

// ⭐ 특정 가게의 미션 목록
export const getMissionsByStoreIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const storeId = Number(req.params.storeId);

    const missions =
      await getMissionsByStoreId(storeId);

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '가게 미션 목록 조회 성공',
      result: missions,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '가게 미션 목록 조회 실패',
    });
  }
};