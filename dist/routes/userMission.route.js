"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userMission_controller_1 = require("../controller/userMission.controller");
const router = express_1.default.Router();
// 미션 도전
router.post('/missions/:missionId/challenge', userMission_controller_1.challengeMissionController);
// 진행 중 미션 목록
router.get('/missions/me/in-progress', userMission_controller_1.getMyInProgressMissionsController);
// 미션 완료 처리
router.patch('/missions/:missionId/complete', userMission_controller_1.completeMissionController);
exports.default = router;
