import { Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcryptjs';
import UserModel from '../database/models/userModel';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email,
    password,
  } = req.body;
  const user = await UserModel.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  const result = compareSync(password, user?.password as string);
  if (!result) return res.status(401).json({ message: 'Incorrect email or password' });
  return next();
};

export default validateUser;
