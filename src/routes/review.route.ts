import { Router } from 'express';
import * as reviewController from '../controller/review.controller';

const router = Router();

router.post('/reviews', reviewController.createReview);

export default router;