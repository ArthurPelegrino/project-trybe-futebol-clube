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
  goalsBalance: number,
  efficiency: string
}

interface HomeTeamInfo {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeTeam: {
    teamName: string
  },
  goalsBalance: number,
  efficiency: string
}

interface AwayTeamInfo {
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
  awayTeam: {
    teamName: string
  },
  goalsBalance: number,
  efficiency: string
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

  static async mySort(param: TeamDataInterface[]) {
    param.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          return a.goalsOwn > b.goalsOwn ? -1 : 1;
        }
        return a.goalsBalance > b.goalsBalance ? -1 : 1;
      }
      return a.totalPoints > b.totalPoints ? -1 : 1;
    });
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
    this.mySort(fullData);
    return fullData;
  }

  static async getData(teamName: string[], matches: HomeTeamInfo[]): Promise<TeamDataInterface[]> {
    const fullData: TeamDataInterface[] = [];
    teamName.forEach((team) => {
      const d = new TeamDataClass(team);
      matches.map((m) => {
        if (team === m.homeTeam.teamName) {
          d.totalGames += 1; d.goalsFavor += m.homeTeamGoals;
          d.goalsBalance += (m.homeTeamGoals - m.awayTeamGoals);
          d.goalsOwn += m.awayTeamGoals;
          if (m.homeTeamGoals === m.awayTeamGoals) { d.totalPoints += 1; d.totalDraws += 1; }
          if (m.homeTeamGoals > m.awayTeamGoals) { d.totalPoints += 3; d.totalVictories += 1; }
          if (m.homeTeamGoals < m.awayTeamGoals) { d.totalLosses += 1; }
        }
        d.efficiency = ((d.totalPoints / (d.totalGames * 3)) * 100).toFixed(2);
        return null;
      });
      fullData.push(d);
    });
    return fullData;
  }

  static async getAwayTeamsName(param: AwayTeamInfo[]): Promise<string[]> {
    const awayTeamsArray: string[] = [];
    param.map((elemento) => {
      if (!awayTeamsArray.includes(elemento.awayTeam.teamName)) {
        awayTeamsArray.push(elemento.awayTeam.teamName);
      }
      return null;
    });
    return awayTeamsArray;
  }

  static async findAwaysTeam(): Promise<TeamDataInterface[]> {
    const matches = await Matches.findAll({
      where: {
        inProgress: false,
      },
      attributes: ['awayTeamId', 'homeTeamGoals', 'awayTeamGoals'],
      include: [{
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    }) as unknown as AwayTeamInfo[];
    const awayTeamsName = await this.getAwayTeamsName(matches);
    const fullData = await this.getAData(awayTeamsName, matches);
    this.mySort(fullData);
    return fullData;
  }

  static async getAData(teamName: string[], matches: AwayTeamInfo[]): Promise<TeamDataInterface[]> {
    const fullData: TeamDataInterface[] = [];
    teamName.forEach((team) => {
      const d = new TeamDataClass(team);
      matches.map((m) => {
        if (team === m.awayTeam.teamName) {
          d.totalGames += 1; d.goalsFavor += m.awayTeamGoals;
          d.goalsBalance += (m.awayTeamGoals - m.homeTeamGoals); d.goalsOwn += m.homeTeamGoals;
          if (m.homeTeamGoals === m.awayTeamGoals) { d.totalPoints += 1; d.totalDraws += 1; }
          if (m.homeTeamGoals < m.awayTeamGoals) { d.totalPoints += 3; d.totalVictories += 1; }
          if (m.homeTeamGoals > m.awayTeamGoals) { d.totalLosses += 1; }
        } d.efficiency = ((d.totalPoints / (d.totalGames * 3)) * 100).toFixed(2);
        return null;
      });
      fullData.push(d);
    });
    return fullData;
  }
}

export default LeaderboardService;
