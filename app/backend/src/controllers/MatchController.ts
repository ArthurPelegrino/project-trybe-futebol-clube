import { Response, Request } from 'express';
import MatchesService from '../services/MatchService';

class MatchController {
  static async getAll(_req: Request, res: Response): Promise<Response> {
    const allMatches = await MatchesService.findAll();
    return res.status(200).json(allMatches);
  }
}

export default MatchController;
