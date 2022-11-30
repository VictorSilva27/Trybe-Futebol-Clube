import { Router } from 'express';
import validateJWT from '../middlewares/validateJWT';
import MatchController from '../controllers/match.controller';
import validateTeam from '../middlewares/validateTeam';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAllMatch);
router.post('/', validateJWT, validateTeam, matchController.insertMatch);
router.patch('/:id/finish', matchController.updateMatchFinished);
router.patch('/:id', matchController.updateMatch);

export default router;
