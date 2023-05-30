import * as express from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.getAll);
// teamsRouter.get('/:id', TeamsController.getById);

export default matchRouter;
