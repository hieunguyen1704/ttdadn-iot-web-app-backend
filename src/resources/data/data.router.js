import { Router } from 'express';
import { getData,getDataWithTime } from './data.controller';

const router = Router();

router.route('/').get(getData);

//@ get data with min from lasted data
router.route('/time/:min')
    .get(getDataWithTime)

export default router;
