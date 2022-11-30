import { Response, Request } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchService = new MatchService();

  public getAllMatch = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const result = JSON.parse(inProgress as string);
      const matches = await this.matchService.getAllByInProgress(result);
      return res.status(200).json(matches);
    }
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public insertMatch = async (req: Request, res: Response) => {
    const match = req.body;
    const matchInsert = await this.matchService.insert(match);
    return res.status(201).json(matchInsert);
  };

  public updateMatchFinished = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { response } = await this.matchService.updateFinished((+id));
    return res.status(200).json(response);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status,
      response } = await this.matchService.updateMatch(id, awayTeamGoals, homeTeamGoals);
    return res.status(status).json(response);
  };
}
