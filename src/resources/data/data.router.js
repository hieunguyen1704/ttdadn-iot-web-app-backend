import { Router } from 'express';
import { getData } from './data.controller';

const router = Router();

router
  .route('/get-data')
  .get(getData);

export default router;
