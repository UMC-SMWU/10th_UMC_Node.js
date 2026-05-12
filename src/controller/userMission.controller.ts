import { Request, Response } from 'express';

import {
  challengeMission,
  getMyInProgressMissions,
  completeMission,
} from '../service/userMission.service';

// ⭐ 미션 도전
export const challengeMissionController = async (
  req: Request,
  res: Response
) => {
  try {
    const missionId = Number(req.params.missionId);

    const result = await challengeMission(missionId);

    return res.status(201).json({
      isSuccess: true,
      code: 'COMMON201',
      message: '미션 도전 성공',
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '미션 도전 실패',
    });
  }
};

// ⭐ 진행 중 미션 목록
export const getMyInProgressMissionsController =
  async (req: Request, res: Response) => {
    try {
      const missions =
        await getMyInProgressMissions();

      return res.status(200).json({
        isSuccess: true,
        code: 'COMMON200',
        message: '진행 중 미션 목록 조회 성공',
        result: missions,
      });
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        code: 'COMMON400',
        message:
          error instanceof Error
            ? error.message
            : '진행 중 미션 목록 조회 실패',
      });
    }
  };

// ⭐ 미션 완료 처리
export const completeMissionController = async (
  req: Request,
  res: Response
) => {
  try {
    const missionId = Number(req.params.missionId);

    const result = await completeMission(missionId);

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '미션 완료 처리 성공',
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      code: 'COMMON400',
      message:
        error instanceof Error
          ? error.message
          : '미션 완료 처리 실패',
    });
  }
};