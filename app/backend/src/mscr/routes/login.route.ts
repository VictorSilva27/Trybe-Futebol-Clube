import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';
import validateUser from '../middlewares/validateUser';

const router = Router();

const loginController = new LoginController();

router.post('/', validateLogin, validateUser, loginController.getByUsernameAndPassword);

export default router;
