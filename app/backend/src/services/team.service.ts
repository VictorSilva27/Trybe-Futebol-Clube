import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/teamsModel';

export default class TeamService {
  public getAll = async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  public getOneById = async (id: number): Promise<ITeam | null> => {
    const teams = await TeamModel.findOne({ where: { id } });
    return teams;
  };
}
