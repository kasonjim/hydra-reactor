const chalk = require('chalk');
const config = require('../config/config');
const Itinerary = require('../models/itinerary.js');
const Trip = require('../models/trip.js');

module.exports = {

  addItineraryItem: function (req, res, next) {
    if (config.debug) {
      console.log(chalk.magenta(('Received a POST request to ad an item to the Itinerary:')));
      console.log(chalk.white(JSON.stringify(req.body, null, 2)));
    }
    // Mongoose method to retrieve and update a user
    Trip.findOne({'_id': req.body.trip_id}, function (err) {
      if (err) {
        next(err);
      }
    }).then(trip => {
      var itineraryItem = new Itinerary({
        startDate: req.body.trip.tripName,
        title: req.body.trip.shortDescription,
        trips: trip._id
      });
      Itinerary.create(itineraryItem,function (err) {
        if (err) {
          next(err);
        }
      }).then(itinerary => {
        Trip.findOneAndUpdate({'_id': req.body.trip_id}, {$push:{itineraries: itinerary._id}}, function (err) {
          if (err) {
            next(err);
          }
        });
        console.log(chalk.magenta('Adding Itinerary ID to the Trip’s Record:'));
        console.log(chalk.white(trip._id));
        res.json(itinerary);
      });
    });
  }
};
