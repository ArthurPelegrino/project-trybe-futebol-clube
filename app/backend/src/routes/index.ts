import * as express from 'express';
import teamsRouter from './TeamRouter';
import loginRouter from './LoginRouter';

const router = express.Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
