'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Progress.init({
    username: DataTypes.STRING,
    score: DataTypes.INTEGER,
    questionNum: DataTypes.INTEGER,
    quizLength: DataTypes.INTEGER,
    incorrectAnswers: DataTypes.STRING(1234),
    questionIds: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Progress',
  });
  return Progress;
};