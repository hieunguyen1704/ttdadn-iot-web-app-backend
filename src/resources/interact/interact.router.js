import { Router } from 'express';

import { interactDB } from './interact.controller';

const router = Router();

router.route('/').get(interactDB);
export default router;
