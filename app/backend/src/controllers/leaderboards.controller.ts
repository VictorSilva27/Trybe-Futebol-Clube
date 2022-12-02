import { Response, Request } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LearderboardController {
  public leaderboardService = new LeaderboardService();

  public getTableHome = async (_req: Request, res: Response) => {
    const table = await this.leaderboardService.getTable('homeTeam');
    return res.status(200).json(table);
  };

  public getTableAway = async (_req: Request, res: Response) => {
    const table = await this.leaderboardService.getTable('awayTeam');
    return res.status(200).json(table);
  };

  public getAllTable = async (_req: Request, res: Response) => {
    const table = await this.leaderboardService.getTableAll();
    const result = table.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
    return res.status(200).json(result);
  };
}
