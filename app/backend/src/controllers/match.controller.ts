import { Response, Request } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchService = new MatchService();

  public getAllMatch = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }
    const result = JSON.parse(inProgress as string);
    const matches = await this.matchService.getAllByInProgress(result);
    res.status(200).json(matches);
  };
}
