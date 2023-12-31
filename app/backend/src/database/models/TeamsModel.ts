import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export type TeamsAttributes = {
  id: number;
  teamName: string;
  // inProgress?: boolean
};

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'teams',
  sequelize,
  timestamps: false,
  underscored: true,
});

export default Teams;
