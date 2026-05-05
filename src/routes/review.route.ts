import express from 'express';
import * as reviewController from '../controller/review.controller';

const router = express.Router();

router.post('/reviews', reviewController.createReview);

router.get('/reviews/me', reviewController.getMyReviews);

export default router;