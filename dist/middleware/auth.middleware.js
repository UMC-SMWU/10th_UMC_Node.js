"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = void 0;
const jwt_1 = require("../utils/jwt");
const isLogin = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("Bearer "))) {
        return res.status(401).json({
            isSuccess: false,
            code: "AUTH401",
            message: "로그인이 필요합니다.",
            result: null,
        });
    }
    try {
        const token = authorization.replace("Bearer ", "");
        const payload = (0, jwt_1.verifyJwt)(token);
        req.user = {
            id: (0, jwt_1.getUserIdFromJwtPayload)(payload),
        };
        return next();
    }
    catch (_a) {
        return res.status(401).json({
            isSuccess: false,
            code: "AUTH401",
            message: "유효하지 않은 토큰입니다.",
            result: null,
        });
    }
};
exports.isLogin = isLogin;
