import express from 'express';

import {
  createReviewController,
  getMyReviewsController,
} from '../controller/review.controller';

const router = express.Router();

router.post('/reviews', createReviewController);

router.get('/reviews/me', getMyReviewsController);

export default router;