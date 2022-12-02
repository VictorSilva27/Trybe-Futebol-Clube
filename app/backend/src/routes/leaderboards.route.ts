import { Router } from 'express';
import LearderboardController from '../controllers/leaderboards.controller';

const router = Router();

const leaderRoute = new LearderboardController();

router.get('/home', leaderRoute.getTableHome);
router.get('/away', leaderRoute.getTableAway);
router.get('/', (req, res) => res.status(200).json({ message: 'Implementar Função' }));

export default router;
