const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, {
        foreignKey: 'club_id',
      });
      this.hasMany(models.Event, {
        foreignKey: 'club_id',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.Type, { through: 'Club_Type' });
    }
  }
  Club.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    avatar: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};
