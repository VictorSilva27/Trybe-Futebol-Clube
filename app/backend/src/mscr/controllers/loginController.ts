import { Request, Response } from 'express';
import IUser from '../../interfaces/IUser';
import createToken from '../../utils/createToken';
import LoginService from '../services/login.service';

export default class LoginController {
  public loginService = new LoginService();

  public getByUsernameAndPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.loginService.getUsername(email);
    const token = createToken(user as IUser);
    res.status(200).json(token);
  };
}
