import { Router } from 'express';
import { createUser, getUser } from './user.controller';

const router = Router();

router
  .route('/')
  .post(createUser);

router
  .route('/:id')
  .get(getUser);

export default router;
