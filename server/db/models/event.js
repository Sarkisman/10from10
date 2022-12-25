const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Club, {
        foreignKey: 'club_id',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'event_id',
      });
      this.belongsToMany(models.User, { through: 'Event_User', foreignKey: 'event_id' });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.STRING,
    club_id: DataTypes.INTEGER,
    num_of_members: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
