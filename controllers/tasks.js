var models = require('../models');
var express = require('express');
var router = express.Router();
var helpers = require("../helpers/")({ models: models });

router.get('/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  models.Task.findAll().then(function (user) {
    var result = helpers.prepareResult();
    result.status = true;
    result.message = "All Tasks";
    result.data = user;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }).catch(err => {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting all tasks";
    err.errors.forEach(function (element) {
      var obj = {};
      obj[element.path] = element.message;
      errors.push(obj);
    }, this);
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  });
});

router.get('/:task_id/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  models.Task.findAll({
    where: {
      id: req.params.task_id
    }
  }).then(function (user) {
    var result = helpers.prepareResult();
    result.status = true;
    result.message = "Single Task";
    result.data = user;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }).catch(err => {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting single task";
    err.errors.forEach(function (element) {
      var obj = {};
      obj[element.path] = element.message;
      errors.push(obj);
    }, this);
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  });
});

router.put('/:task_id/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  models.Task.findAll({
    where: {
      id: req.params.task_id,
      user_id : req.user.id
    }
  }).then(function (task) {

    if (task.length != 0) {

      models.Task.update(req.body, {
        where: {
          id: req.params.task_id
        }
      }).then(function () {
        var result = helpers.prepareResult();
        result.status = true;
        result.message = "Task Updated";
        result.data = req.body;
        models.Logs.log(req.params, result, req.user.id, result.message);
        res.json(result);
      }).catch(err => {
        var result = helpers.prepareResult();
        var errors = [];
        result.status = false;
        result.message = "Error in updating task";
        err.errors.forEach(function (element) {
          var obj = {};
          obj[element.path] = element.message;
          errors.push(obj);
        }, this);
        result.errors = errors;
        models.Logs.log(req.params, result, req.user.id, result.message);
        res.json(result);
      });
    } else {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Task Not Found";
      result.data = req.body;
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    }

  }).catch(err => {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in updating task";

    err.errors.forEach(function (element) {
      var obj = {};
      obj[element.path] = element.message;
      errors.push(obj);
    }, this);

    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  });
});

module.exports = router;