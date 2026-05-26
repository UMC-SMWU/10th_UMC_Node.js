"use strict";
// mission.controller.ts
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
exports.MissionController = void 0;
const tsoa_1 = require("tsoa");
const customError_1 = require("../errors/customError");
const mission_service_1 = require("../service/mission.service");
let MissionController = class MissionController {
    /**
     * 특정 가게의 미션 목록 조회 API
     */
    getMissionsByStoreIdController(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const missions = yield (0, mission_service_1.getMissionsByStoreId)(storeId);
                return {
                    isSuccess: true,
                    code: "COMMON200",
                    message: "가게 미션 목록 조회 성공",
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
};
exports.MissionController = MissionController;
__decorate([
    (0, tsoa_1.Get)("{storeId}/missions"),
    (0, tsoa_1.SuccessResponse)("200", "가게 미션 목록 조회 성공"),
    (0, tsoa_1.Response)("404", "가게를 찾을 수 없음"),
    (0, tsoa_1.Response)("500", "서버 에러"),
    __param(0, (0, tsoa_1.Path)())
], MissionController.prototype, "getMissionsByStoreIdController", null);
exports.MissionController = MissionController = __decorate([
    (0, tsoa_1.Route)("stores"),
    (0, tsoa_1.Tags)("Mission")
], MissionController);
