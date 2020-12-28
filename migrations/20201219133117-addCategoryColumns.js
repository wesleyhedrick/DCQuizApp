module.exports = {
    up: async (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'Questions',
          'lesson',
           Sequelize.STRING
         ),
        queryInterface.addColumn(
          'Questions',
          'difficulty',
          Sequelize.INTEGER, 
          {max: 10}
          ),
      ]);
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
