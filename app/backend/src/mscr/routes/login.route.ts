import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';
import validateUser from '../middlewares/validateUser';
import validateJWT from '../middlewares/validateJWT';

const router = Router();

const loginController = new LoginController();

router.post('/', validateLogin, validateUser, loginController.getByUsernameAndPassword);
router.get('/validate', validateJWT, loginController.getUserByToken);

export default router;
