import express from 'express';
import { login, logout, me, onboard, signup } from '../controllers/authContriller.js';
import { protectRoute } from '../middlewares/autuMiddleware.js';

const router = express.Router()


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/onboarding', protectRoute, onboard);
router.get("/me", protectRoute, me);

export default router;
 