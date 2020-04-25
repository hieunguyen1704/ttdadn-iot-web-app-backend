import { Router } from 'express';
import { requestLogin } from './auth.controller';

const router = Router();

router
    .route('/')
    .post(requestLogin);

export default router;