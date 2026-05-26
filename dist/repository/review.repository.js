"use strict";
// review.repository.ts
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
exports.findReviewsByUserId = exports.createReview = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
const createReview = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = yield prisma.review.create({
        data: {
            userId,
            storeId: data.storeId,
            content: data.content,
            score: data.score,
        },
    });
    return newReview;
});
exports.createReview = createReview;
const findReviewsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.review.findMany({
        where: {
            userId,
        },
    });
});
exports.findReviewsByUserId = findReviewsByUserId;
