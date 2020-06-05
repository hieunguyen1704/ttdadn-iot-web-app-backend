import {Router} from 'express';
import {PublishData} from './publish.controller'
const router = Router();

router
    .route('/')
    .get(PublishData);

export default router;