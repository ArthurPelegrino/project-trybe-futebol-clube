import * as express from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = express.Router();

loginRouter.post('/', LoginController.logon);

export default loginRouter;
