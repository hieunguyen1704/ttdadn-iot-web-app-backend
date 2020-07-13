import {changePassword} from "./change-password.controller";
import {Router} from 'express';
const router = Router();

router
    .route('/')
    .put(changePassword);

export default router;
