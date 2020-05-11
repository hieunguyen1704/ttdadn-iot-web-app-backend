import {Router} from 'express';
import { CreateConfig,GetConfigByUser,DeleteConfig} from './userConfig.controller'
const router = Router();
router
    .route('/')
    .post(CreateConfig)
    .get(GetConfigByUser);
router
    .route('/delete/:id')
    .get(DeleteConfig);
export default router;