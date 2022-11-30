import { Response, Request } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public matchService = new MatchService();

  public getAllMatch = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const result = JSON.parse(inProgress as string);
      const matches = await this.matchService.getAllByInProgress(result);
      res.status(200).json(matches);
    }
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public insertMatch = async (req: Request, res: Response) => {
    const match = req.body;
    console.log('Entrou no Insert');
    const matchInsert = await this.matchService.insert(match);
    return res.status(201).json(matchInsert);
  };

  public updateMatchFinished = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('Entrou no MacthFinished');
    const { response } = await this.matchService.updateFinished((+id));
    return res.status(200).json(response);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('Entrou no UpdateMatch');
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateMatch((+id), (+homeTeamGoals), (+awayTeamGoals));
    return res.status(200).json({ message: 'Atualizado' });
  };
}
