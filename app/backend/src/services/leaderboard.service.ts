import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import MatchService from './match.service';
import TeamService from './team.service';
import ITable from '../interfaces/ITable';

export default class LeaderboardService {
  private matchesService = new MatchService();
  private teamsService = new TeamService();

  //  Funções
  private totalGamesTeam = (id: number, arrayMatches: any[], teamLocal: string)
  : number => arrayMatches
    .filter((match) => match[teamLocal] === id).length;

  private victoryTeam = (id: number, arrayMatches: any[], teamLocal: string): number => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches.filter((match) => match[teamLocal] === id
      && match.homeTeamGoals > match.awayTeamGoals).length;
    }
    return arrayMatches.filter((match) => match[teamLocal] === id
        && match.awayTeamGoals > match.homeTeamGoals).length;
  };

  private lossesTeam = (id: number, arrayMatches: any[], teamLocal: string): number => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches.filter((match) => match[teamLocal] === id
      && match.homeTeamGoals < match.awayTeamGoals).length;
    }
    return arrayMatches.filter((match) => match[teamLocal] === id
        && match.awayTeamGoals < match.homeTeamGoals).length;
  };

  private drawTeam = (id: number, arrayMatches: any[], teamLocal: string): number =>
    arrayMatches.filter((match) => match[teamLocal] === id
    && match.homeTeamGoals === match.awayTeamGoals).length;

  private goalsFavorTeam = (id: number, arrayMatches: any[], teamLocal: string): number => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches
        .filter((match) => match[teamLocal] === id)
        .reduce((acc, crr) => acc + crr.homeTeamGoals, 0);
    }
    return arrayMatches
      .filter((match) => match[teamLocal] === id)
      .reduce((acc, crr) => acc + crr.awayTeamGoals, 0);
  };

  private goalsOwnTeam = (id: number, arrayMatches: any[], teamLocal: string): number => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches
        .filter((match) => match[teamLocal] === id)
        .reduce((acc, crr) => acc + crr.awayTeamGoals, 0);
    }
    return arrayMatches
      .filter((match) => match[teamLocal] === id)
      .reduce((acc, crr) => acc + crr.homeTeamGoals, 0);
  };

  private totalPoints = (id: number, matches: IMatch[], teamLocal: string): number => {
    const victory = this.victoryTeam(id, matches, teamLocal) * 3;
    const draw = this.drawTeam(id, matches, teamLocal);
    return victory + draw;
  };

  private goalsBalanceTeam = (id: number, matches: IMatch[], teamLocal: string): number => {
    const Favor = this.goalsFavorTeam(id, matches, teamLocal);
    const Own = this.goalsOwnTeam(id, matches, teamLocal);
    return Favor - Own;
  };

  private efficiency = (id: number, matches: IMatch[], teamLocal: string): number => {
    const points = this.totalPoints(id, matches, teamLocal);
    const totalMatch = this.totalGamesTeam(id, matches, teamLocal);
    return (points / (totalMatch * 3)) * 100;
  };

  private mainFunctionTable = async (matches: IMatch[], teams: ITeam[], teamLocal: string)
  : Promise<ITable[]> => {
    const array = teams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: this.totalPoints(id, matches, teamLocal),
      totalGames: this.totalGamesTeam(id, matches, teamLocal),
      totalVictories: this.victoryTeam(id, matches, teamLocal),
      totalDraws: this.drawTeam(id, matches, teamLocal),
      totalLosses: this.lossesTeam(id, matches, teamLocal),
      goalsFavor: this.goalsFavorTeam(id, matches, teamLocal),
      goalsOwn: this.goalsOwnTeam(id, matches, teamLocal),
      goalsBalance: this.goalsBalanceTeam(id, matches, teamLocal),
      efficiency: this.efficiency(id, matches, teamLocal).toFixed(2),
    }));
    Promise.all(array);
    return array.sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);
  };

  //  Main Service
  public getTable = async (teamLocal: string): Promise<ITable[]> => {
    const matchesInProgress = await this.matchesService.getAllByInProgress(false);
    const teamInProgress = await this.teamsService.getAll();
    const table = await this.mainFunctionTable(matchesInProgress, teamInProgress, teamLocal);
    return table;
  };

  public getTableAll = async () => {
    const tableHome = await this.getTable('homeTeam');
    const tableAway = await this.getTable('awayTeam');
    return tableAway.map((away) => {
      const awayTable = away;
      tableHome.forEach((home) => {
        if (awayTable.name === home.name) {
          awayTable.totalPoints += home.totalPoints;
          awayTable.totalGames += home.totalGames; awayTable.totalVictories += home.totalVictories;
          awayTable.totalDraws += home.totalDraws; awayTable.totalLosses += home.totalLosses;
          awayTable.goalsFavor += home.goalsFavor; awayTable.goalsOwn += home.goalsOwn;
          awayTable.goalsBalance = awayTable.goalsFavor - awayTable.goalsOwn;
          awayTable.efficiency = ((awayTable.totalPoints / (awayTable.totalGames * 3)) * 100)
            .toFixed(2);
        }
      });
      return awayTable;
    });
  };
}
