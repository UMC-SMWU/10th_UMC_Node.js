"use strict";
// userMission.controller.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserMissionController = void 0;
const tsoa_1 = require("tsoa");
const customError_1 = require("../errors/customError");
const auth_middleware_1 = require("../middleware/auth.middleware");
const userMission_service_1 = require("../service/userMission.service");
let UserMissionController = class UserMissionController {
    /**
     * 미션 도전 API
     */
    challengeMissionController(req, missionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, userMission_service_1.challengeMission)(req.user.id, missionId);
                return {
                    isSuccess: true,
                    code: "COMMON201",
                    message: "미션 도전 성공",
                    result: result,
                };
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return {
                        isSuccess: false,
                        code: error.code,
                        message: error.message,
                        result: null,
                    };
                }
                return {
                    isSuccess: false,
                    code: "COMMON500",
                    message: "서버 에러가 발생했습니다.",
                    result: null,
                };
            }
        });
    }
    /**
     * 진행 중 미션 목록 조회 API
     */
    getMyInProgressMissionsController(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const missions = yield (0, userMission_service_1.getMyInProgressMissions)(req.user.id);
                return {
                    isSuccess: true,
                    code: "COMMON200",
                    message: "진행 중 미션 목록 조회 성공",
                    result: missions,
                };
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return {
                        isSuccess: false,
                        code: error.code,
                        message: error.message,
                        result: null,
                    };
                }
                return {
                    isSuccess: false,
                    code: "COMMON500",
                    message: "서버 에러가 발생했습니다.",
                    result: null,
                };
            }
        });
    }
    /**
     * 미션 완료 처리 API
     */
    completeMissionController(req, missionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, userMission_service_1.completeMission)(req.user.id, missionId);
                return {
                    isSuccess: true,
                    code: "COMMON200",
                    message: "미션 완료 처리 성공",
                    result: result,
                };
            }
            catch (error) {
                if (error instanceof customError_1.CustomError) {
                    return {
                        isSuccess: false,
                        code: error.code,
                        message: error.message,
                        result: null,
                    };
                }
                return {
                    isSuccess: false,
                    code: "COMMON500",
                    message: "서버 에러가 발생했습니다.",
                    result: null,
                };
            }
        });
    }
};
exports.UserMissionController = UserMissionController;
__decorate([
    (0, tsoa_1.Middlewares)(auth_middleware_1.isLogin),
    (0, tsoa_1.Post)("{missionId}/challenge"),
    (0, tsoa_1.SuccessResponse)("201", "미션 도전 성공"),
    (0, tsoa_1.Response)("400", "이미 도전 중인 미션"),
    (0, tsoa_1.Response)("404", "미션을 찾을 수 없음"),
    (0, tsoa_1.Response)("500", "서버 에러"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)())
], UserMissionController.prototype, "challengeMissionController", null);
__decorate([
    (0, tsoa_1.Middlewares)(auth_middleware_1.isLogin),
    (0, tsoa_1.Get)("my/in-progress"),
    (0, tsoa_1.SuccessResponse)("200", "진행 중 미션 목록 조회 성공"),
    (0, tsoa_1.Response)("404", "진행 중인 미션이 없음"),
    (0, tsoa_1.Response)("500", "서버 에러"),
    __param(0, (0, tsoa_1.Request)())
], UserMissionController.prototype, "getMyInProgressMissionsController", null);
__decorate([
    (0, tsoa_1.Middlewares)(auth_middleware_1.isLogin),
    (0, tsoa_1.Patch)("{missionId}/complete"),
    (0, tsoa_1.SuccessResponse)("200", "미션 완료 처리 성공"),
    (0, tsoa_1.Response)("400", "완료할 수 없는 미션"),
    (0, tsoa_1.Response)("404", "미션을 찾을 수 없음"),
    (0, tsoa_1.Response)("500", "서버 에러"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)())
], UserMissionController.prototype, "completeMissionController", null);
exports.UserMissionController = UserMissionController = __decorate([
    (0, tsoa_1.Route)("missions"),
    (0, tsoa_1.Tags)("UserMission")
], UserMissionController);
