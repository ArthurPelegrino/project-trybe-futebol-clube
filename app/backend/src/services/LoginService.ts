import { compareSync } from 'bcryptjs';
import Users from '../database/models/UsersModels';

// fazer validação de email com regex // req 10
// caso email valido verificar se existe no banco // req 10
// se existir no banco,
// bcrypt metodo compareSync

class LoginService {
  static async logIn(email: string, password: string): Promise<Users> {
    const userFound = await Users.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new Error();
    }
    if (!compareSync(password, userFound.password)) {
      throw new Error();
    }

    return userFound as Users;
  }

  static async getByRole(email: string) {
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error();
    }
    return user;
  }
}

export default LoginService;
