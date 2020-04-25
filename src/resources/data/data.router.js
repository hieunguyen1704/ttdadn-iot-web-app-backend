import { Router } from 'express';
import { getCurrentRecord, getRecordInRange } from './data.controller';

const router = Router();

router
  .route('/get-current-record')
  .get(getCurrentRecord);

router
  .route('/get-record-in-range')
  .get(getRecordInRange);

export default router;
