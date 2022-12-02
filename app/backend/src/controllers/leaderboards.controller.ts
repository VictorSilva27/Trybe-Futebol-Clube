import { Response, Request } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LearderboardController {
  public leaderboardService = new LeaderboardService();

  public getTableHome = async (req: Request, res: Response) => {
    const table = await this.leaderboardService.getTable('homeTeam');
    return res.status(200).json(table);
  };

  public getTableAway = async (req: Request, res: Response) => {
    const table = await this.leaderboardService.getTable('awayTeam');
    return res.status(200).json(table);
  };
}
