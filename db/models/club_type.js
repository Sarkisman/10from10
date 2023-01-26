const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Club_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Club_Type.init({
    club_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Club_Type',
  });
  return Club_Type;
};
