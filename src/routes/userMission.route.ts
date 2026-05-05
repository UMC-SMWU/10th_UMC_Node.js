import express from 'express';
import * as userMissionController from '../controller/userMission.';

const router = express.Router();

// 진행 중 미션 목록
router.get('/missions/me/in-progress', userMissionController.getMyInProgressMissions);

// 미션 완료 처리
router.patch('/missions/:missionId/complete', userMissionController.completeMission);

export default router;