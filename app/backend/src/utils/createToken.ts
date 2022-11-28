import { sign } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

require('dotenv/config');

const createToken = (user: IUser | null): string => {
  const jwtSecret = process.env.JWT_SECRET || 'senha_secreta';
  const token = sign({ user }, jwtSecret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

export default createToken;
