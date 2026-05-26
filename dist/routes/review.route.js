"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controller/review.controller");
const router = express_1.default.Router();
router.post('/reviews', review_controller_1.createReviewController);
router.get('/reviews/me', review_controller_1.getMyReviewsController);
exports.default = router;
