import { Request, Response, NextFunction } from 'express';
import TeamModel from '../database/models/teamsModel';

const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teamHome = await TeamModel.findOne({ where: { id: (+homeTeam) } });
  const teamAway = await TeamModel.findOne({ where: { id: (+awayTeam) } });
  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  return next();
};

export default validateTeam;
