const chalk = require('chalk');
const config = require('../config/config');
const User = require('../models/user.js');

module.exports = {
  signup: function (req, res, next) {
    if (config.debug) {
      console.log(chalk.magenta('Received a POST request to create a user:'));
      console.log(chalk.white(JSON.stringify(req.body, null, 2)));
    }
    // Mongoose method to create a user
    var user = new User(req.body);
    user.save(function (err) {
      if (err) {
        next(err);
      }
    }).then(() => {
      if (config.debug) {
        console.log(chalk.white('User Saved to DB. Generating token...'));
      }
      return user.generateToken();
    }).then(token => {
      res.header('x-auth', token).send(user);
    }).catch(err => {
      res.status(400).send(err);
    });
  },

  signin: function (req, res) {
    var {email, password} = req.body;
    if (config.debug) {
      console.log(chalk.magenta('Received a GET request for a user:'));
      console.log(chalk.white(JSON.stringify(req.body, null, 2)));
    }
    User.findByCredentials(email, password).then(user => {
      return user.generateToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    }).catch(err => {
      res.status(400).send(err);
    });
  },

  getUsers: function (req, res) {
    res.status(200).send(req.user);
  },

  deleteToken: function (req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  }


};
