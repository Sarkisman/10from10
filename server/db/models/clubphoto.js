const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClubPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Club, {
        foreignKey: 'club_id',
      });
    }
  }
  ClubPhoto.init({
    img: DataTypes.STRING,
    club_id: DataTypes.INTEGER,
    isAllowed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ClubPhoto',
  });
  return ClubPhoto;
};
