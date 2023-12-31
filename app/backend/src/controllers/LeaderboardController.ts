import { Response, Request } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async getHomeTeamData(req: Request, res: Response): Promise<Response> {
    const homeTeams = await LeaderboardService.findHomeTeams();
    // console.log(homeTeams);
    return res.status(200).json(homeTeams);
  }

  static async getAwayTeamData(req: Request, res: Response): Promise<Response> {
    const awayTeams = await LeaderboardService.findAwaysTeam();
    // console.log(homeTeams);
    return res.status(200).json(awayTeams);
  }

  static async getTeamData(req: Request, res: Response): Promise<Response> {
    const teams = await LeaderboardService.findTeams();
    // console.log(homeTeams);
    return res.status(200).json(teams);
  }
}

export default LeaderboardController;
