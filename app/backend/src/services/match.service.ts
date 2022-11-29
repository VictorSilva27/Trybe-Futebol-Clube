import MatchModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';

export default class MatchService {
  public getAll = async (): Promise<MatchModel[]> => {
    const matches = await MatchModel.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        }] });
    return matches;
  };

  public getAllByInProgress = async (inProgress: boolean): Promise<MatchModel[]> => {
    const matches = await MatchModel.findAll({
      where: {
        inProgress,
      },
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  };
}
