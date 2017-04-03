const chalk = require('chalk');
const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/db');
var {authenticate} = require('./middleware/authenticate');

app.use(function (req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  res.header('x-xss-protection', 0);
  next();
});

app.use(express.static('client'));

const usersController = require('./controllers/users');
app.post('/api/signup', usersController.signup);
app.post('/api/signin', usersController.signin);
app.get('/api/users', authenticate, usersController.getUsers);
app.delete('/api/token', authenticate, usersController.deleteToken);

const tripsController = require('./controllers/trips');
app.post('/api/trips', authenticate, tripsController.createTrip);

const itinerariesController = require('./controllers/itineraries');
app.post('/api/itineraries', authenticate, itinerariesController.addItineraryItem);

const activitiesController = require('./controllers/activities');
app.post('/api/activities', authenticate, activitiesController.suggestActivity);
//app.delete('/api/activities', authenticate, activitiesController.deleteActivity);

const yelpController = require('./controllers/yelp');
app.post('/api/yelpSearch', yelpController.keywordSearch);
app.post('/api/yelpBusiness', yelpController.businessSearch);

const googlePlacesController = require('./controllers/googleplaces');
app.post('/api/locations', googlePlacesController.getLocations);

app.use(function (err, req, res, next) {
  console.error(chalk.red.bold('ERROR: ', err));
  res.send(err);
  next();
});

const nodemailer = require('nodemailer');
app.post('/api/mail', function (req,res) {
  

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: 'postmaster@sandbox3cef9df6cd7543b396b055d708cff793.mailgun.org',
        pass: 'hrr22hydra'
      }
  });

// setup email data with unicode symbols
  console.log(req.body.email);
  let mailOptions = {
    from: 'travelwithhydra@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'You\'ve been invited to plan a trip', // Subject line
    text: 'Please go to http://hydra-travel.herokuapp.com and sign in with your email to help your friends plan a trip' // plain text body
      //html: '<b>Hello world ?</b>' // html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
      }
    console.log('Message %s sent: %s', info.messageId, info.response);  
  });
});  

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port);
});
