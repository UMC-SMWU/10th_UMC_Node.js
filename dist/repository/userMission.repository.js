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
exports.updateUserMissionToComplete = exports.findUserMissionInProgress = exports.createUserMission = exports.findChallengingMission = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
const findChallengingMission = (userId, missionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.userMission.findFirst({
        where: {
            userId,
            missionId,
            status: "IN_PROGRESS",
        },
    });
});
exports.findChallengingMission = findChallengingMission;
const createUserMission = (userId, missionId) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserMission = yield prisma.userMission.create({
        data: {
            userId,
            missionId,
            status: "IN_PROGRESS",
        },
    });
    return newUserMission;
});
exports.createUserMission = createUserMission;
const findUserMissionInProgress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.userMission.findMany({
        where: {
            userId,
            status: "IN_PROGRESS",
        },
    });
});
exports.findUserMissionInProgress = findUserMissionInProgress;
const updateUserMissionToComplete = (userId, missionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.userMission.updateMany({
        where: {
            userId,
            missionId,
            status: "IN_PROGRESS",
        },
        data: {
            status: "COMPLETE",
        },
    });
});
exports.updateUserMissionToComplete = updateUserMissionToComplete;
