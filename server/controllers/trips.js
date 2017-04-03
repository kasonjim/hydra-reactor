const chalk = require('chalk');
const config = require('../config/config');
const User = require('../models/user.js');
const Trip = require('../models/trip.js');
const Activity = require('../models/activity.js')

module.exports = {
  createTrip: function(req, res, next) {
    if (config.debug) {
          console.log(chalk.magenta(('Received a POST request to create a trip:')));
          console.log(chalk.white(JSON.stringify(req.body, null, 2)));
    }
    // Mongoose method to retrieve and update a user
    User.findOne({'_id': req.body.user_id}, function (err, user) {
      if (err) {
        console.log('Error: ', err);
      } else {
      }
    }).then( user => {
      var trip = new Trip({
        tripName: req.body.trip.tripName,
        shortDescription: req.body.trip.shortDescription,
        location: req.body.trip.location,
        imageUrl: req.body.trip.imageUrl,
        planner: user._id,
        users: user._id
      });
      Trip.create(trip,function (err) {
        if (err) {
          next(err);
        }
        res.json(user);
      }).then( trip => {
        User.findOneAndUpdate({'_id': req.body.user_id}, {$push:{trips: trip._id}} , function (err, user) {
          if (err) {
            next(err);
          }
        });
        console.log(chalk.magenta(trip._id));
      });
    });
  }
};
//{$push: { trips: { tripName: req.body.trip.tripName } } }, {new: true}
