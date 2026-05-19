import express from 'express';

import {
  challengeMissionController,
  getMyInProgressMissionsController,
  completeMissionController,
} from '../controller/userMission.controller';

const router = express.Router();

// 미션 도전
router.post(
  '/missions/:missionId/challenge',
  challengeMissionController
);

// 진행 중 미션 목록
router.get(
  '/missions/me/in-progress',
  getMyInProgressMissionsController
);

// 미션 완료 처리
router.patch(
  '/missions/:missionId/complete',
  completeMissionController
);

export default router;