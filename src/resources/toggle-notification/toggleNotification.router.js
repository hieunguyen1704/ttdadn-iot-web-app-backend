import {Router} from 'express';
import {toggleNotification } from './toggleNotification.controller';
const router = Router();
router
    .route('/')
    .get(toggleNotification);
export default router;