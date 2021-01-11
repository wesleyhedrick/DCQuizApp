'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.addColumn(
            'Users',
            'first',
             Sequelize.STRING
           ),
          queryInterface.addColumn(
            'Users',
            'last',
            Sequelize.STRING, 
            ),
          queryInterface.addColumn(
            'Users',
            'email',
            Sequelize.STRING
          )
        
        ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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


