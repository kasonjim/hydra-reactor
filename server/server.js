const bodyParser = require('body-parser');
const chalk = require('chalk');
const config = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const request = require('request');
const yelpFusion = require('yelp-fusion');
const User = require('./models/userModel.js');

// We used ES6 syntax with the Authenticate middleware because it was easier to build with and understand


var {authenticate} = require('./middleware/authenticate');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, OPTIONS, DELETE',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
};

app.use(function (req, res, next) {
  res.set(defaultHeaders);
  res.set('x-xss-protection', 0);
  next();
});

require('./config/db');

app.use(express.static(path.join(__dirname, '../client/')));

// Set up POST request listener for creating a new user
// Expects to receive email and password in req.body
app.post('/api/signup', function(req, res) {
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
});

// Set up POST request listener for signing in a user
// Expects to receive a user_id in req.body
app.post('/api/signin', function(req, res) {
  var {email, password} = req.body;
  console.log('Received the following GET request for a user: ', req.body);
  User.findByCredentials(email, password).then(user => {
    return user.generateToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.get('/api/users', authenticate, (req, res) => {
  res.status(200).send(req.user);
});

app.delete('/api/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

// Set up POST request listener for creating a new trip
// Expects to receive user_id and trip in req.body, where trip is an object with a tripName property
app.post('/api/trips', authenticate, function(req, res) {
  console.log('Received the following POST request to create a trip: ', req.body);
  // Mongoose method to retrieve and update a user
  User.findOneAndUpdate({'_id': req.body.user_id}, {$push: { trips: { tripName: req.body.trip.tripName } } }, {new: true}, function(err, user) {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.json(user);
    }
  });
});

app.post('/api/itineraries', authenticate, function(req, res) {
  // Pass in request object that includes user id, trip object id, activity object
  console.log('Received the following POST request to create an itinerary item: ', req.body);
  User.findById(req.body.user_id, function(err, user) {
    if (err) {
      console.log('Error: ', error);
    } else {
      // Commented out version with day schema
      // user.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.push(req.body.activity);
      user.trips.id(req.body.trip_id).itineraries.push(req.body.itinerary);
      user.save();
      res.json(user);
    }
  });
});

// Set up POST request listener for creating a new activity
// Expects to receive user_id, trip_id, and activity in req.body,
// where activity is an object with description and category properties
app.post('/api/activities', authenticate, function(req, res) {
  // Pass in request object that includes user id, trip object id, activity object
  console.log('Received the following POST request to create an activity: ', req.body);
  User.findById(req.body.user_id, function(err, user) {
    if (err) {
      console.log('Error: ', error);
    } else {
      // Commented out version with day schema
      // user.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.push(req.body.activity);
      user.trips.id(req.body.trip_id).activities.push(req.body.activity);
      user.save();
      res.json(user);
    }
  });
});

// Set up DELETE request listener for deleting an activity
// Expects to receive user_id, trip_id, and activity_id in req.body
app.delete('/api/activities', authenticate, function(req, res) {
  console.log('Received the following DELETE request to delete an activity: ', req.body);
  // Call Mongoose remove method on id matching the request
  User.findById(req.body.user_id, function(err, user) {
    if (err) {
      console.log('Error: ', error);
    } else {
      // The following code splices an individual activity out of the activities array
      var activities = user.trips.id(req.body.trip_id).activities;
      activities.splice(activities.indexOf(activities.id(req.body.activity_id)), 1);
      user.save();
      res.json(user);
    }
  });
});

const yelp = yelpFusion.client(config.yelpToken);

app.post('/api/yelpSearch', function(req, res) {
  var searchQuery = req.body;

  yelp.search(searchQuery).then(response => {
    res.status(200).send(response.jsonBody.businesses);
  }).catch(e => { console.log(e); });
});

app.post('/api/yelpBusiness', function(req, res) {
  var id = req.body.id;
  var moreInfo = {};
  yelp.business(id)
    .then(response => {
      moreInfo['details'] = response.jsonBody;
      yelp.reviews(req.body.id)
        .then(response => {
          moreInfo['reviews'] = response.jsonBody.reviews;
          res.status(200).send(moreInfo);
        });
    });
});



app.post('/api/locations', function (req, res) {
  var chunks = [];
  var query = req.body.query;
  var queryUrl = config.gpPlaceTextSearchUrl + '/' + config.gpOutputFormat + '?query=' + query + '&key=' + config.gpApiKey;
  console.log(chalk.yellow('Querying Google Places API with: ', query));
  console.log(chalk.yellow(queryUrl));
  request.post(queryUrl)
    .on('response', function (response) {
      console.log('Status: ', response.statusCode);
      //console.log('Headers: ', response.headers['content-type']);
      console.log(chalk.white(JSON.stringify(response, null, 2)));
      //res.send(response);
    })
    .on('data', function (chunk) {
      chunks.push(chunk);
    })
    .on('end', function () {
      var body = Buffer.concat(chunks);
      console.log(chalk.white(body));
      res.send(body);
    })
});


var port = process.env.PORT || 3000;
// var ip = process.env.IP || 'localhost';

app.use(function (err, req, res, next) {
  console.error('ERROR: ', err);
  res.send(err);
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
