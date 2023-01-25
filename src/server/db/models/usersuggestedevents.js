const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserSuggestedEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Club, {
        foreignKey: 'club_id',
      });
    }
  }
  UserSuggestedEvents.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    user_id: DataTypes.INTEGER,
    club_id: DataTypes.INTEGER,
    num_of_members: DataTypes.INTEGER,
    time: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserSuggestedEvents',
  });
  return UserSuggestedEvents;
};
