import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  listStoreReviews,
  listMyReviews,
  listStoreMissions,
  listMyMissions,
  finishMission,
} from "../services/store.service.js";

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleListMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;
    const reviews = await listMyReviews(userId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;
    const missions = await listStoreMissions(storeId, cursor);
    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};

export const handleListMyMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;
    const missions = await listMyMissions(userId, cursor);
    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userMissionId = parseInt(req.params.userMissionId as string, 10);
    const result = await finishMission(userMissionId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};