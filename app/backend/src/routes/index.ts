import * as express from 'express';
import teamsRouter from './TeamRouter';

const router = express.Router();

router.use('/teams', teamsRouter);

export default router;
