import { Response, Request } from 'express';
import TeamsService from '../services/TeamsService';
import { TeamsAttributes } from '../models/TeamsModel';

class TeamsController {
  static async getAll(res: Response, _req: Request): Promise<Response> {
    try {
      const teams: TeamsAttributes[] = await TeamsService.findAll();

      return res.status(200).json(teams);
    } catch (error) {
      throw new Error('Erro ao buscar times');
    }
  }
}

export default TeamsController;
