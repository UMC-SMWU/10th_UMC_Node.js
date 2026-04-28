import { Request, Response } from 'express';
import * as missionService from '../service/mission.service';

export const challengeMission = async (req: Request, res: Response) => {
  try {
    const missionId = Number(req.params.missionId);
    const result = await missionService.challengeMission(missionId);

    res.status(201).json({
      success: true,
      message: '미션 도전을 시작했습니다.',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};