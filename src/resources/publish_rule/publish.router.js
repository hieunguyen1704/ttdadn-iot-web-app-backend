import {Router} from 'express';
import {PublishData} from './publish.controller'
const router = Router();

router
    .route('/:state')
    .get(PublishData);

export default router;