import {Router} from 'express';
import { GetUserInfoById, UpdateUserInfo} from './userInfo.controller';
const router = Router();
router
    .route('/')
    .get(GetUserInfoById)
    .put(UpdateUserInfo);
export default router;