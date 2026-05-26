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
exports.updateMyInfo = void 0;
const customError_1 = require("../errors/customError");
const user_repository_1 = require("../repository/user.repository");
const updateMyInfo = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserById)(userId);
    if (!user) {
        throw new customError_1.CustomError(404, "USER_NOT_FOUND", "존재하지 않는 사용자입니다.");
    }
    return yield (0, user_repository_1.updateUser)(userId, data);
});
exports.updateMyInfo = updateMyInfo;
