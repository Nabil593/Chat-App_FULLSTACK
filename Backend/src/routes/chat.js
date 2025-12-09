import express from 'express';
import { protectRoute } from '../middlewares/autuMiddleware.js';
import { getStreamToken } from '../controllers/chatContriller.js';

const router = express.Router();

router.get("/token", protectRoute, getStreamToken)

export default router;