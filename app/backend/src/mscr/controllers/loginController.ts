import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public loginService = new LoginService();

  public getByUsernameAndPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.loginService.getUsername(email, password);
    res.status(200).json(user);
  };
}
