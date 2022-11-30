import { Router } from 'express';
import loginRoute from './login.route';
import teamRoute from './team.route';
import matchRoute from './match.route';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);
router.use('/matches', matchRoute);

export default router;
