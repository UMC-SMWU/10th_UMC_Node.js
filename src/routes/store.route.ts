import { Router } from 'express';
import * as storeController from '../controller/store.controller';

const router = Router();

router.post('/regions/:regionId/stores', storeController.createStore);

export default router;