import { Router } from 'express';
import * as missionController from '../controller/mission.controller';

const router = Router();

router.post(
  '/home/missions/:missionId/challenge',
  missionController.challengeMission
);

export default router;