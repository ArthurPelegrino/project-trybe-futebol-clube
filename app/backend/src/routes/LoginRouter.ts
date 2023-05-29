import * as express from 'express';
import LoginController from '../controllers/LoginController';
import
{
  emailAndPasswordFields,
  validFormatEmailAndPassword,
  tokenValidation,
} from '../middlewares/middleware';

const loginRouter = express.Router();

loginRouter.post('/', emailAndPasswordFields, validFormatEmailAndPassword, LoginController.logon);
loginRouter.get(
  '/role',
  tokenValidation,
  LoginController.getRole,
);

// fazer um midware para validar se o token é valido
//
export default loginRouter;
