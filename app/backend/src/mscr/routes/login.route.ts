import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const loginController = new LoginController();

router.post('/', validateLogin, loginController.getByUsernameAndPassword);

export default router;
