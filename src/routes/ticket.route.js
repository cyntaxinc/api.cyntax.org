import { Router } from 'express';
import controllers from '../controllers/index.control.js';
import { authRequired } from '../middleware/authRequired.js';

const { ticket } = controllers;
const router = Router();

router.post('/', authRequired, ticket.create);

export default router;
