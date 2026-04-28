import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AddMissionRequest, ChallengeMissionRequest, responseFromMission, responseFromChallenge } from "../dtos/mission.dto.js";
import { missionAdd, missionChallenge } from "../services/mission.service.js";

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const mission = await missionAdd(storeId, req.body as AddMissionRequest);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseFromMission(mission),
      error: null,
    });
  } catch (err: any) {
    if (err.message === "존재하지 않는 가게입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false, data: null,
        error: { code: "STORE404", message: err.message },
      });
    } else {
      next(err);
    }
  }
};

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const missionId = parseInt(req.params.missionId);
    const result = await missionChallenge(missionId, req.body as ChallengeMissionRequest);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseFromChallenge(result),
      error: null,
    });
  } catch (err: any) {
    if (err.message === "이미 도전 중인 미션입니다.") {
      res.status(StatusCodes.CONFLICT).json({
        success: false, data: null,
        error: { code: "MISSION409", message: err.message },
      });
    } else if (err.message === "존재하지 않는 미션입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false, data: null,
        error: { code: "MISSION404", message: err.message },
      });
    } else {
      next(err);
    }
  }
};