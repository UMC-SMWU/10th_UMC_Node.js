import { Request, Response } from 'express';

import { CustomError } from '../errors/customError';

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

// ⭐ 진행 중 미션 목록
export const getMyInProgressMissionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const missions = await getMyInProgressMissions();

    return res.status(200).json({
      isSuccess: true,
      code: 'COMMON200',
      message: '진행 중 미션 목록 조회 성공',
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