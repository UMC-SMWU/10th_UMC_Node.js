import express from 'express';
import * as missionController from '../controller/mission.controller';

const router = express.Router();

// 특정 가게의 미션 목록
router.get('/stores/:storeId/missions', missionController.getMissionsByStoreId);

export default router;