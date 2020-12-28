'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Questions.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    wrongAnswer1: DataTypes.STRING, 
    wrongAnswer2: DataTypes.STRING, 
    wrongAnswer3: DataTypes.STRING, 

  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};