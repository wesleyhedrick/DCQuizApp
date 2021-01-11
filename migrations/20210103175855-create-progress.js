'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Progresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      questionNum: {
        type: Sequelize.INTEGER
      },
      quizLength: {
        type: Sequelize.INTEGER
      },
      incorrectAnswers: {
        type: Sequelize.STRING
      },
      questionIds: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Progresses');
  }
};