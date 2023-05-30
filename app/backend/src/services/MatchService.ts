import Teams, { TeamsAttributes } from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

class MatchesService {
  static async findAll(): Promise<TeamsAttributes[] | undefined> {
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
  }

  static async findAllByQueryTrue(): Promise<TeamsAttributes[] | void> {
    const matches = await Matches.findAll({
      include: [{ model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'] },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
      where: {
        inProgress: true,
      },
    });
    return matches;
  }

  static async findAllByQueryFalse(): Promise<TeamsAttributes[] | void> {
    const matches = await Matches.findAll({
      include: [{ model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'] },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
      where: {
        inProgress: false,
      },
    });
    return matches;
  }
}

export default MatchesService;
