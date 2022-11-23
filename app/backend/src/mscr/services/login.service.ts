// ./services/books.service.ts
import UserModel from '../../database/models/userModel';

export default class LoginService {
  public getUsername = async (email: string, password: string) => {
    const user = await UserModel.findOne({ where: { email, password } });
    return user;
  };
}
