import Teams, { TeamsAttributes } from '../models/TeamsModel';

class TeamsService {
  static async findAll(): Promise<TeamsAttributes[]> {
    try {
      const teams = await Teams.findAll();

      return teams;
    } catch (error) {
      throw new Error('Erro ao buscar times');
    }
  }
}

export default TeamsService;
