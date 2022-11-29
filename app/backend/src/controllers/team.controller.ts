import { Request, Response } from 'express';
import TeamService from '../services/team.service';

require('dotenv/config');

export default class TeamController {
  public teamService = new TeamService();

  public getAllTeams = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  };

  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getOneById((+id));
    res.status(200).json(team);
  };
}
