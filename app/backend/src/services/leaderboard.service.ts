import MatchService from './match.service';
import TeamService from './team.service';

export default class LeaderboardService {
  private matchesService = new MatchService();
  private teamsService = new TeamService();

  //  Funções
  private totalGamesTeam = (id: number, arrayMatches: any[], teamLocal: string) => arrayMatches
    .filter((match) => match[teamLocal] === id).length;

  private victoryTeam = (id: number, arrayMatches: any[], teamLocal: string) => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches.filter((match) => match[teamLocal] === id
        && match.homeTeamGoals > match.awayTeamGoals).length;
    }
    return arrayMatches.filter((match) => match[teamLocal] === id
        && match.awayTeamGoals > match.homeTeamGoals).length;
  };

  private lossesTeam = (id: number, arrayMatches: any[], teamLocal: string) => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches.filter((match) => match[teamLocal] === id
      && match.homeTeamGoals < match.awayTeamGoals).length;
    }
    return arrayMatches.filter((match) => match[teamLocal] === id
        && match.awayTeamGoals < match.homeTeamGoals).length;
  };

  private drawTeam = (id: number, arrayMatches: any[], teamLocal: string) =>
    arrayMatches.filter((match) => match[teamLocal] === id
    && match.homeTeamGoals === match.awayTeamGoals).length;

  private goalsFavorTeam = (id: number, arrayMatches: any[], teamLocal: string) => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches
        .filter((match) => match[teamLocal] === id)
        .reduce((acc, crr) => acc + crr.homeTeamGoals, 0);
    }
    return arrayMatches
      .filter((match) => match[teamLocal] === id)
      .reduce((acc, crr) => acc + crr.awayTeamGoals, 0);
  };

  private goalsOwnTeam = (id: number, arrayMatches: any[], teamLocal: string) => {
    if (teamLocal === 'homeTeam') {
      return arrayMatches
        .filter((match) => match[teamLocal] === id)
        .reduce((acc, crr) => acc + crr.awayTeamGoals, 0);
    }
    return arrayMatches
      .filter((match) => match[teamLocal] === id)
      .reduce((acc, crr) => acc + crr.homeTeamGoals, 0);
  };

  private totalPoints = (id: number, matches: any[], teamLocal: string) => {
    const victory = this.victoryTeam(id, matches, teamLocal) * 3;
    const draw = this.drawTeam(id, matches, teamLocal);
    return victory + draw;
  };

  private goalsBalanceTeam = (id: number, matches: any[], teamLocal: string) => {
    const Favor = this.goalsFavorTeam(id, matches, teamLocal);
    const Own = this.goalsOwnTeam(id, matches, teamLocal);
    return Favor - Own;
  };

  private efficiency = (id: number, matches: any[], teamLocal: string) => {
    const points = this.totalPoints(id, matches, teamLocal);
    const totalMatch = this.totalGamesTeam(id, matches, teamLocal);
    return (points / (totalMatch * 3)) * 100;
  };

  private mainFunction = async (matches: any[], teams: any[], teamLocal: string)
  : Promise<any[]> => {
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
  public getTable = async (teamLocal: string) => {
    const matchesInProgress = await this.matchesService.getAllByInProgress(false);
    const teamInProgress = await this.teamsService.getAll();
    const table = await this.mainFunction(matchesInProgress, teamInProgress, teamLocal);
    return table;
  };
}
