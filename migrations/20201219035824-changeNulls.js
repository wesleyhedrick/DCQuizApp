'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
       await queryInterface.changeColumn('Questions', 'createdAt', {
        type:Sequelize.STRING,
        allowNull:true
        });
      queryInterface.changeColumn('Questions', 'updatedAt', {  
        type:Sequelize.STRING,
        allowNull:true
      })
        
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