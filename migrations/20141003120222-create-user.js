"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: Sequelize.STRING,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
