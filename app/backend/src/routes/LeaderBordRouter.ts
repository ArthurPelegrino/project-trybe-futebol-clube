import * as express from 'express';
import leaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', leaderboardController.getHomeTeamData);
leaderboardRouter.get('/away', leaderboardController.getAwayTeamData);
export default leaderboardRouter;
