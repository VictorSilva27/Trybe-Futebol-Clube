import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getOne);

export default router;
