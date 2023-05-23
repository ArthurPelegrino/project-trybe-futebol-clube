import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = express.Router();

teamsRouter.get('/', TeamsController.getAll);

export default teamsRouter;
