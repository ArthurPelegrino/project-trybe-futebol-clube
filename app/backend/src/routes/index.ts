import * as express from 'express';
// import { emailAndPasswordFields, validFormatEmailAndPassword } from '../middlewares/middleware';
import teamsRouter from './TeamRouter';
import loginRouter from './LoginRouter';
import matchRouter from './MatchRouter';

const router = express.Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
