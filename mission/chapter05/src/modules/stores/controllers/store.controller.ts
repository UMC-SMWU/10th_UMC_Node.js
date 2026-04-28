import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AddStoreRequest, responseFromStore } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeAdd(req.body as AddStoreRequest);
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseFromStore(store),
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
