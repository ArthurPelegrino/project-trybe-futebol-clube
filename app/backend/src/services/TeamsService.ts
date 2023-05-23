import Teams, { TeamsAttributes } from '../database/models/TeamsModel';

class TeamsService {
  static async findAll(): Promise<TeamsAttributes[]> {
    try {
      const teams = await Teams.findAll();

      return teams;
    } catch (error) {
      throw new Error('Erro ao buscar times');
    }
  }

  static async findById(id: number): Promise<TeamsAttributes> {
    const teamFound = await Teams.findOne({
      where: { id },
    });
    if (!teamFound) {
      throw new Error('Time não encontrado');
    }

    return teamFound;
  }
}

export default TeamsService;
