"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already exists"
      },
      validate: {
        len: {
          args: [5],
          msg: "Username must be at least of 5 characters",
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Name must be at least of 6 characters",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password must be at least of 6 characters",
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists"
      },
      validate: {
        isEmail: {
          msg: "Enter a valid email"
        }
      }
    },
  }, {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Task)
        }
      },
      underscored: true,
    });

  return User;
};
