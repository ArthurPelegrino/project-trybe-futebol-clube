import Teams, { TeamsAttributes } from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

class MatchesService {
  static async findAll(): Promise<TeamsAttributes[] | undefined> {
    try {
      const matches = await Matches.findAll({
        include: [{
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      });

      return matches;
    } catch (error) {
      console.log('erro');
    }
  }
}

export default MatchesService;
