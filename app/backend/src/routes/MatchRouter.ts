import * as express from 'express';
import MatchController from '../controllers/MatchController';
import
{ tokenValidation, checkCreateTeams } from '../middlewares/middleware';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.getAll);
matchRouter.post('/', tokenValidation, checkCreateTeams, MatchController.registerGame);
matchRouter.patch(
  '/:id/finish',
  tokenValidation,
  MatchController.finishMatch,
);
matchRouter.patch(
  '/:id',
  tokenValidation,
  MatchController.changeScore,
);

export default matchRouter;
