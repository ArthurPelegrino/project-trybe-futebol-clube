import Users from '../database/models/UsersModels';

class LoginService {
  static async findByEmail(email: string): Promise<Users> {
    const userFound = await Users.findOne({
      where: { email },
    });
    if (!userFound) {
      throw new Error('user not found');
      // está quebrando a aplicaçã
    }
    return userFound;
  }
}

export default LoginService;
