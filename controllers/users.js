var models = require('../models');
var express = require('express');
var router = express.Router();
var helpers = require("../helpers/")({ models: models });
var X2JS = require('x2js');
var x2js = new X2JS();

router.get('/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  console.log(x2js);
  models.Users.findAll({
    include: [{
      model: models.Task
    }]
  }).then(function (users) {
    var result = helpers.prepareResult();
    result.status = true;
    result.message = "Users along with tasks";
    result.data = users;
    var request = x2js.xml2js(req.body);
    models.Logs.log('main request', result, req.user.id, "fetching all data");
    res.json(result);
  }).catch(err => {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting users";
    result.errors = err.errors;
    models.Logs.log('main request', result, req.user.id, "error while fetching all data");
    res.json(result);
  });
});

router.post('/create', function (req, res) {
  models.Users.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password : req.body.password
  }).then(function () {
    var result = helpers.prepareResult();
    result.status = true;
    result.message = "User created successfully";
    models.Logs.log(req.body, result, 0, "creating new user");
    res.json(result);
  }).catch(err => {
    var result = helpers.prepareResult();
    result.status = false;
    result.message = "Error in creating user";
    result.errors = helpers.fetchErrors(err);
    models.Logs.log(req.body, result, 0, "error while creating new user");
    res.json(result);
  });
});

router.delete('/:user_id/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  if (req.user.id == req.params.user_id) {
    models.Users.destroy({
      where: {
        id: req.params.user_id
      }
    }).then(function () {
      var result = helpers.prepareResult();
      result.status = true;
      result.message = "User deleted successfully";
      models.Logs.log(req.params, result, req.user.id, "Deleting user");
      res.json(result);
    }).catch(err => {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Error in deleting user";
      result.errors = helpers.fetchErrors(err);
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    });
  } else {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in deleting user";
    errors['user_id'] = "User Id doesn't match with the authenticated user.";
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }

});

router.get('/:user_id/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  if (req.user.id == req.params.user_id) {
    models.Users.findAll({
      where: {
        id: req.params.user_id
      },
      include: [{
        model: models.Task
      }]
    }).then(function (user) {
      var result = helpers.prepareResult();
      result.status = true;
      result.message = "User along with tasks";
      result.data = user;
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    }).catch(err => {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Error in getting user";
      result.errors = helpers.fetchErrors(err);
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    });
  } else {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting user";
    errors['user_id'] = "User Id doesn't match with the authenticated user.";
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }

});

router.get('/:user_id/task', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  if (req.user.id == req.params.user_id) {
    models.Task.findAll({
      where: {
        id: req.params.user_id
      }
    }).then(function (user) {
      var result = helpers.prepareResult();
      result.status = true;
      result.message = "User along with tasks";
      result.data = user;
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    }).catch(err => {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Error in getting user";
      result.errors = helpers.fetchErrors(err);
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    });
  } else {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in getting user";
    errors['user_id'] = "User Id doesn't match with the authenticated user.";
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }

});

router.post('/:user_id/tasks/create', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  if (req.user.id == req.params.user_id) {
    models.Task.create({
      title: req.body.title,
      user_id: req.params.user_id,
      description: req.body.description
    }).then(function () {
      var result = helpers.prepareResult();
      result.status = true;
      result.message = "Task created successfully";
      models.Logs.log(req.body, result, req.user.id, result.message);
      res.json(result);
    }).catch(err => {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Error in creating user task";
      result.errors = helpers.fetchErrors(err);
      models.Logs.log(req.body, result, req.user.id, result.message);
      res.json(result);
    });
  } else {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in creating new task";
    errors['user_id'] = "User Id doesn't match with the authenticated user.";
    result.errors = errors;
    models.Logs.log(req.body, result, req.user.id, result.message);
    res.json(result);
  }
});

router.delete('/:user_id/tasks/:task_id/', helpers.httpauth.authenticate('basic', { session: false }), function (req, res) {
  if (req.user.id == req.params.user_id) {
    models.Task.destroy({
      where: {
        id: req.params.task_id
      }
    }).then(function (task) {

      var result = helpers.prepareResult();
      if (task) {
        result.status = true;
        result.message = "User task deleted successfully";
      } else {
        result.status = false;
        result.message = "Task not found";
      }
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    }).catch(err => {
      var result = helpers.prepareResult();
      result.status = false;
      result.message = "Error in deleting user task";
      result.errors = helpers.fetchErrors(err);
      models.Logs.log(req.params, result, req.user.id, result.message);
      res.json(result);
    });
  } else {
    var result = helpers.prepareResult();
    var errors = [];
    result.status = false;
    result.message = "Error in deleting user Task";
    errors['user_id'] = "User Id doesn't match with the authenticated user.";
    result.errors = errors;
    models.Logs.log(req.params, result, req.user.id, result.message);
    res.json(result);
  }

});


module.exports = router;
