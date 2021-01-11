'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn(
                'Users',
                'username', 
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
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
