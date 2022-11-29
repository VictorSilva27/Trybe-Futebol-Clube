import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
import TeamModel from './teamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchesModel;
