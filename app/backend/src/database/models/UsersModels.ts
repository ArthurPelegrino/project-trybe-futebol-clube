import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

// export type UsersAttributes = {
//   id: number;
//   teamName: string;
// };

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  sequelize,
  timestamps: false,
  underscored: true,
});

export default Users;
