import { Response, Request } from 'express';
import TeamsService from '../services/TeamsService';
import { TeamsAttributes } from '../models/TeamsModel';

class TeamsController {
  static async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const teams: TeamsAttributes[] = await TeamsService.findAll();

      return res.status(200).json(teams);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao buscar times');
    }
  }
}

export default TeamsController;
