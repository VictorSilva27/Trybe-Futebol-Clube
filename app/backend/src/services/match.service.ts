import IMatch from '../interfaces/IMatch';
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

  public insert = async (match: IMatch): Promise<MatchModel> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const matchInsert = await MatchModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true });
    return matchInsert;
  };

  public updateFinished = async (id: number): Promise<{ response: { message: string; }; }> => {
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return { response: { message: 'Finished' } };
  };

  public updateMatch = async (
    id: string,
    awayTeamGoals: string,
    homeTeamGoals: string,
  ): Promise<{ status: number; response: { message: string; }; }> => {
    await MatchModel.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id } },
    );
    return { status: 200, response: { message: 'Updated' } };
  };
}
