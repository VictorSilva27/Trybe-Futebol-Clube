import { Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import createToken from '../utils/createToken';
import LoginService from '../services/login.service';

require('dotenv/config');

export default class LoginController {
  public loginService = new LoginService();

  public getByUsernameAndPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.loginService.getUsername(email);
    const token = createToken(user);
    res.setHeader('authorization', token);
    res.status(200).json({ token });
  };

  public getUserByToken = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET || 'seusecretdetoken';
    const decoded = verify(authorization as string, secret);
    const { user: { role } } = decoded as JwtPayload;
    res.status(200).json({ role });
  };
}
