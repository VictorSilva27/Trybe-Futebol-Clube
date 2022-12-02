import { Router } from 'express';
import LearderboardController from '../controllers/leaderboards.controller';

const router = Router();

const leaderRoute = new LearderboardController();

router.get('/home', leaderRoute.getTableHome);
router.get('/away', leaderRoute.getTableAway);
router.get('/', leaderRoute.getAllTable);

export default router;
