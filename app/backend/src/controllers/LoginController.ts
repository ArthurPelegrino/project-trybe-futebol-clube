import { Response, Request } from 'express';
import LoginService from '../services/LoginService';
import { generateToken } from '../validations/auth';

// fazer validação de email com regex // req 10
// caso email valido verificar se existe no banco // req 10
// se existir no banco,
// bcrypt metodo compareSync

class LoginController {
  static async logon(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      // const { id } = req.params;
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const user = await LoginService.findByEmail(email);
      // if (user.password === password) {
      // }
      const token = generateToken(user.email);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
  }
}

export default LoginController;
