const User = require('../models/user.js');

module.exports = {
  signup: function (req, res) {
    console.log('Received the following POST request to create a user: ', req.body);
    // Mongoose method to create a user

    var user = new User(req.body);
    user.save().then(() => {
      return user.generateToken();
    }).then(token => {
      res.header('x-auth', token).send(user);
    }).catch(err => {
      res.status(400).send(err);
    });
  },

  signin: function (req, res) {
    var {email, password} = req.body;
    console.log('Received the following GET request for a user: ', req.body);
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
