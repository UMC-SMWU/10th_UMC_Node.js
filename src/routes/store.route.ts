import express from 'express';
import * as storeController from '../controller/store.controller';

const router = express.Router();

router.post('/regions/:regionId/stores', storeController.createStore);

export default router;