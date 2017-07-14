'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface
      .createTable('Logs', {
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        request: Sequelize.TEXT,
        response: Sequelize.TEXT,
        user_id: Sequelize.INTEGER,
        logged_in : Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },


      });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface
      .dropTable('Logs');
  }
};
