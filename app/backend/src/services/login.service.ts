import IUser from '../interfaces/IUser';
import UserModel from '../database/models/userModel';

export default class LoginService {
  public getUsername = async (email: string): Promise<IUser | null> => {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  };
}
