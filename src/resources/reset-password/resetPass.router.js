import {resetPassword} from "./resetPass.controller";
import {Router} from 'express';
const router = Router();

router
    .route('/')
    .post(resetPassword);

export default router;