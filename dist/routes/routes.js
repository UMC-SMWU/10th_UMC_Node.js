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
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const userMission_controller_1 = require("./../controller/userMission.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const store_controller_1 = require("./../controller/store.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const review_controller_1 = require("./../controller/review.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const mission_controller_1 = require("./../controller/mission.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserMissionController_challengeMissionController = {
        missionId: { "in": "path", "name": "missionId", "required": true, "dataType": "double" },
    };
    app.post('/missions/:missionId/challenge', ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController)), ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController.prototype.challengeMissionController)), function UserMissionController_challengeMissionController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_challengeMissionController, request, response });
                const controller = new userMission_controller_1.UserMissionController();
                yield templateService.apiHandler({
                    methodName: 'challengeMissionController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserMissionController_getMyInProgressMissionsController = {};
    app.get('/missions/my/in-progress', ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController)), ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController.prototype.getMyInProgressMissionsController)), function UserMissionController_getMyInProgressMissionsController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_getMyInProgressMissionsController, request, response });
                const controller = new userMission_controller_1.UserMissionController();
                yield templateService.apiHandler({
                    methodName: 'getMyInProgressMissionsController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserMissionController_completeMissionController = {
        missionId: { "in": "path", "name": "missionId", "required": true, "dataType": "double" },
    };
    app.patch('/missions/:missionId/complete', ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController)), ...((0, runtime_1.fetchMiddlewares)(userMission_controller_1.UserMissionController.prototype.completeMissionController)), function UserMissionController_completeMissionController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_completeMissionController, request, response });
                const controller = new userMission_controller_1.UserMissionController();
                yield templateService.apiHandler({
                    methodName: 'completeMissionController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsStoreController_createStore = {
        regionId: { "in": "path", "name": "regionId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "any" },
    };
    app.post('/regions/:regionId/stores', ...((0, runtime_1.fetchMiddlewares)(store_controller_1.StoreController)), ...((0, runtime_1.fetchMiddlewares)(store_controller_1.StoreController.prototype.createStore)), function StoreController_createStore(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_createStore, request, response });
                const controller = new store_controller_1.StoreController();
                yield templateService.apiHandler({
                    methodName: 'createStore',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReviewController_createReviewController = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "any" },
    };
    app.post('/reviews', ...((0, runtime_1.fetchMiddlewares)(review_controller_1.ReviewController)), ...((0, runtime_1.fetchMiddlewares)(review_controller_1.ReviewController.prototype.createReviewController)), function ReviewController_createReviewController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_createReviewController, request, response });
                const controller = new review_controller_1.ReviewController();
                yield templateService.apiHandler({
                    methodName: 'createReviewController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReviewController_getMyReviewsController = {};
    app.get('/reviews/my', ...((0, runtime_1.fetchMiddlewares)(review_controller_1.ReviewController)), ...((0, runtime_1.fetchMiddlewares)(review_controller_1.ReviewController.prototype.getMyReviewsController)), function ReviewController_getMyReviewsController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_getMyReviewsController, request, response });
                const controller = new review_controller_1.ReviewController();
                yield templateService.apiHandler({
                    methodName: 'getMyReviewsController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMissionController_getMissionsByStoreIdController = {
        storeId: { "in": "path", "name": "storeId", "required": true, "dataType": "double" },
    };
    app.get('/stores/:storeId/missions', ...((0, runtime_1.fetchMiddlewares)(mission_controller_1.MissionController)), ...((0, runtime_1.fetchMiddlewares)(mission_controller_1.MissionController.prototype.getMissionsByStoreIdController)), function MissionController_getMissionsByStoreIdController(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_getMissionsByStoreIdController, request, response });
                const controller = new mission_controller_1.MissionController();
                yield templateService.apiHandler({
                    methodName: 'getMissionsByStoreIdController',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
