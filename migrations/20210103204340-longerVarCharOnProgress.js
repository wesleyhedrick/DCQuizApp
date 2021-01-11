'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn(
                'Progresses',
                'incorrectAnswers', 
                {
                    type: Sequelize.STRING(1234),
                    allowNull: true,
                    unique: false,
                }   
            )
      ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
