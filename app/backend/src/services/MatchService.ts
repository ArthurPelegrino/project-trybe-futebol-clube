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

  static async findById(id: number): Promise<string | null> {
    // console.log('id recebido por parametro', id);
    const team = await Teams.findOne({
      where: { id },
    });
    if (!team) {
      return 'fail';
    }
    return null;
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

  static async finishMatch(id: number): Promise<TeamsAttributes | null> {
    // console.log('id recebido por parametro', id);
    const match = await Matches.findOne({
      where: { id },
      include: [{ model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'] },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    if (match?.inProgress) {
      match.inProgress = false;
      await match.save();
    }
    // console.log('adasdasdas321829718937 MATCH', match);
    return match;
  }

  static async changeScore(
    id: number,
    awayGoals: number,
    homeGoals: number,
  ): Promise<TeamsAttributes | null> {
    const match = await Matches.findOne({
      where: { id },
    });
    if (match) {
      match.awayTeamGoals = awayGoals;
      match.homeTeamGoals = homeGoals;
      await match.save();
    }
    return match;
  }

  static async registerGame(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<TeamsAttributes> {
    const newGame = await Matches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newGame;
  }
}

export default MatchesService;
