module.exports = {
    up: async (queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.changeColumn(
          'Questions',
          'answer',
           Sequelize.STRING
         ),
        queryInterface.addColumn(
          'Questions',
          'wrongAnswer2',
          Sequelize.STRING
        ),
        queryInterface.addColumn(
            'Questions',
            'wrongAnswer3',
            Sequelize.STRING
        ),
        queryInterface.addColumn(
            'Questions',
            'wrongAnswer4',
            Sequelize.STRING
        )
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
