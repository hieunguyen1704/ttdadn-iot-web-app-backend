import {Router} from 'express';
import {getLastMotorState} from './motor.controller';
const router = Router();

router
    .route('/')
    .get(getLastMotorState);
export default router;