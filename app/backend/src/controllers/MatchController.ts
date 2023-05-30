import { Response, Request } from 'express';
import MatchesService from '../services/MatchService';

class MatchController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    console.log(req.query);
    const search = req.query;
    console.log(typeof search);
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
}

export default MatchController;
