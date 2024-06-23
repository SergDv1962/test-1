import {Router} from 'express'
import { register } from '../controllers/auth.js';

const router = new Router()

router.post("/registration", register);

export default router