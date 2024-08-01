import { Router } from 'express';
import controllers from '../controllers/index.control.js';
import { authRequired } from '../middleware/authRequired.js';

const { user } = controllers;
const router = Router();

router.post('/register', authRequired, user.register);
router.post('/login', user.login);

export default router;