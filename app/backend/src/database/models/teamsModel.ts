import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import MatchesModel from './matchesModel';

class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

TeamModel.belongsTo(MatchesModel, { foreignKey: 'id', as: 'home_team' });
TeamModel.belongsTo(MatchesModel, { foreignKey: 'id', as: 'away_team' });

export default TeamModel;
