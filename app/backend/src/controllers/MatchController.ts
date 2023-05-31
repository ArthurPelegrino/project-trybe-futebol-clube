import { Response, Request } from 'express';
import MatchesService from '../services/MatchService';

class MatchController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    // console.log(req.query);
    const search = req.query;
    // console.log(typeof search);
    if (Object.values(search).includes('true')) {
      const matchesByQueryTrue = await MatchesService.findAllByQueryTrue();
      return res.status(200).json(matchesByQueryTrue);
    }
    if (Object.values(search).includes('false')) {
      const matchesByQueryFalse = await MatchesService.findAllByQueryFalse();
      return res.status(200).json(matchesByQueryFalse);
    }
    const allMatches = await MatchesService.findAll();
    return res.status(200).json(allMatches);
  }

  static async registerGame(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await MatchesService.registerGame(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(201).json(newMatch);
  }

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // console.log(id);
    await MatchesService.finishMatch(Number(id));
    // console.log(finishedMatch);
    return res.status(200).json({ message: 'Finished' });
  }

  static async changeScore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.changeScore(Number(id), awayTeamGoals, homeTeamGoals);
    return res.status(200).json({ message: 'success' });
  }
}

export default MatchController;
