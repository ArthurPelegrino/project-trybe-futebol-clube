import { Response, Request } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async getHomeTeamData(req: Request, res: Response): Promise<Response> {
    const homeTeams = await LeaderboardService.findHomeTeams();
    // console.log(homeTeams);
    return res.status(200).json(homeTeams);
  }
}

export default LeaderboardController;
