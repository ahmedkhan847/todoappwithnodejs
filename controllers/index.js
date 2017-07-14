var models = require('../models');
var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");
var helpers = require("../helpers/")({models: models});

router.get('/', function (req, res) {
  models.Users.findAll({
    include: [{
      model: models.Task
    }]
  }).then(function (users) {
    var result = helpers.prepareResult();
    result.status = true;
    result.message = "Users along with tasks"; 
    result.data = users;
    res.json(result);
  }).catch(err => {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting users"; 
    err.errors.forEach(function(element) {
      var obj = {};
      obj[element.path] = element.message;
      errors.push(obj);
    }, this);
    result.errors = errors;
    res.json(result);
  });
});

module.exports = router;
