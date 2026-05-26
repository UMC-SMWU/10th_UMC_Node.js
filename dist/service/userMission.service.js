"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeMission = exports.getMyInProgressMissions = exports.challengeMission = void 0;
const customError_1 = require("../errors/customError");
const user_repository_1 = require("../repository/user.repository");
const mission_repository_1 = require("../repository/mission.repository");
const userMission_repository_1 = require("../repository/userMission.repository");
// ⭐ 미션 도전
const challengeMission = (userId, missionId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserById)(userId);
    if (!user) {
        throw new customError_1.CustomError(404, 'USER_NOT_FOUND', '존재하지 않는 사용자입니다.');
    }
    const mission = yield (0, mission_repository_1.findMissionById)(missionId);
    if (!mission) {
        throw new customError_1.CustomError(404, 'MISSION_NOT_FOUND', '존재하지 않는 미션입니다.');
    }
    const alreadyChallenging = yield (0, userMission_repository_1.findChallengingMission)(userId, missionId);
    if (alreadyChallenging) {
        throw new customError_1.CustomError(409, 'MISSION_ALREADY_CHALLENGING', '이미 도전 중인 미션입니다.');
    }
    return yield (0, userMission_repository_1.createUserMission)(userId, missionId);
});
exports.challengeMission = challengeMission;
// ⭐ 내가 진행 중인 미션 목록
const getMyInProgressMissions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserById)(userId);
    if (!user) {
        throw new customError_1.CustomError(404, 'USER_NOT_FOUND', '존재하지 않는 사용자입니다.');
    }
    return yield (0, userMission_repository_1.findUserMissionInProgress)(userId);
});
exports.getMyInProgressMissions = getMyInProgressMissions;
// ⭐ 미션 완료 처리
const completeMission = (userId, missionId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserById)(userId);
    if (!user) {
        throw new customError_1.CustomError(404, 'USER_NOT_FOUND', '존재하지 않는 사용자입니다.');
    }
    const result = yield (0, userMission_repository_1.updateUserMissionToComplete)(userId, missionId);
    if (result.count === 0) {
        throw new customError_1.CustomError(400, 'MISSION_CANNOT_COMPLETE', '완료할 수 있는 미션이 없습니다.');
    }
    return result;
});
exports.completeMission = completeMission;
