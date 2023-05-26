import * as express from 'express';
import LoginController from '../controllers/LoginController';
import { emailAndPasswordFields, validFormatEmailAndPassword } from '../middlewares/middleware';

const loginRouter = express.Router();

loginRouter.post('/', emailAndPasswordFields, validFormatEmailAndPassword, LoginController.logon);

export default loginRouter;
