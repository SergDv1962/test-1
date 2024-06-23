import {Router} from 'express'
import { register, login } from '../controllers/auth.js';

const router = new Router()

router.post("/registrate", register);
router.post("/login", login);

export default router