import {Router} from 'express';
import { CreateConfig,GetConfigByUser,DeleteConfig} from './userConfig.controller'
const router = Router();
router
    .route('/')
    .post(CreateConfig);
router
    .route('/:userId')
    .get(GetConfigByUser);
router
    .route('/delete/:id')
    .get(DeleteConfig);
export default router;