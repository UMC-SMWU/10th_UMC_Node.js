"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromJwtPayload = exports.verifyJwt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getJwtSecret = () => { var _a; return (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "umc-jwt-secret"; };
const decodeBase64Url = (value) => Buffer.from(value, "base64url").toString("utf8");
const verifyJwt = (token) => {
    const [encodedHeader, encodedPayload, signature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !signature) {
        throw new Error("Invalid token");
    }
    const expectedSignature = crypto_1.default
        .createHmac("sha256", getJwtSecret())
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest("base64url");
    if (signature !== expectedSignature) {
        throw new Error("Invalid token signature");
    }
    const payload = JSON.parse(decodeBase64Url(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error("Expired token");
    }
    return payload;
};
exports.verifyJwt = verifyJwt;
const getUserIdFromJwtPayload = (payload) => {
    var _a, _b;
    const userId = (_b = (_a = payload.userId) !== null && _a !== void 0 ? _a : payload.id) !== null && _b !== void 0 ? _b : payload.sub;
    const parsedUserId = typeof userId === "string" ? Number.parseInt(userId, 10) : userId;
    if (!parsedUserId || Number.isNaN(parsedUserId)) {
        throw new Error("Token does not contain user id");
    }
    return parsedUserId;
};
exports.getUserIdFromJwtPayload = getUserIdFromJwtPayload;
