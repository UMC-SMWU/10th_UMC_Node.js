import { Request, Response } from 'express';
import * as storeService from '../service/store.service';

export const createStore = async (req: Request, res: Response) => {
  try {
    const regionId = Number(req.params.regionId);
    const result = await storeService.createStore(regionId, req.body);

    res.status(201).json({
      success: true,
      message: '가게가 추가되었습니다.',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};