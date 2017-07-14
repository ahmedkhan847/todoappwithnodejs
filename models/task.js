"use strict";

module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Title must be at least of 12 characters",
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Description must be at least of 12 characters",
        }
      }
    }
  }, {
      classMethods: {
        associate: function (models) {
          Task.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      },
      underscored: true,
    });

  return Task;
};
