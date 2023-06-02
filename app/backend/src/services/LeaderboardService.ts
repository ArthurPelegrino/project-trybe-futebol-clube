import TeamDataClass from '../middlewares/Classes';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

interface TeamDataInterface {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

interface HomeTeamInfo {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeam: {
    teamName: string
  }
}

class LeaderboardService {
  static async getHomeTeamsName(param: HomeTeamInfo[]): Promise<string[]> {
    const homeTeamsArray: string[] = [];
    param.map((elemento) => {
      if (!homeTeamsArray.includes(elemento.homeTeam.teamName)) {
        homeTeamsArray.push(elemento.homeTeam.teamName);
      }
      return null;
    });
    return homeTeamsArray;
  }

  static async findHomeTeams(): Promise<TeamDataInterface[]> {
    const matches = await Matches.findAll({
      where: {
        inProgress: false,
      },
      attributes: ['homeTeamId', 'homeTeamGoals', 'awayTeamGoals'],
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }],
    }) as unknown as HomeTeamInfo[];

    const homeTeamsName = await this.getHomeTeamsName(matches);
    const fullData = await this.getData(homeTeamsName, matches);
    return fullData;
  }

  static async getData(teamName: string[], matches: HomeTeamInfo[]): Promise<TeamDataInterface[]> {
    const fullData: TeamDataInterface[] = [];
    teamName.forEach((team) => {
      const d = new TeamDataClass(team);
      matches.map((match) => {
        if (team === match.homeTeam.teamName) {
          d.totalGames += 1; d.goalsFavor += match.homeTeamGoals;
          d.goalsOwn += match.awayTeamGoals;
          if (match.homeTeamGoals > match.awayTeamGoals) d.totalPoints += 3; d.totalVictories += 1;
          if (match.homeTeamGoals === match.awayTeamGoals) d.totalPoints += 1; d.totalDraws += 1;
          if (match.homeTeamGoals < match.awayTeamGoals) d.totalLosses += 1;
        }
        return null;
      });
      fullData.push(d);
    });
    return fullData;
  }
}

export default LeaderboardService;
