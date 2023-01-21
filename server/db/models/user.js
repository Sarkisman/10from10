const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Club, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.Event, {
        through: 'Event_User',
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true,
      });
      this.hasMany(models.UserSuggestedEvents, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    description: DataTypes.TEXT,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
