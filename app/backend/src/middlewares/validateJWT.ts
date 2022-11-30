import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    verify(token, secret);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateJWT;
