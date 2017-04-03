const chalk = require('chalk');
const config = require('../config/config');
const User = require('../models/user.js');
const Itinerary = require('../models/itinerary.js');
const Activity = require('../models/activity.js');
const Trip = require('../models/trip.js');

module.exports = {
  suggestActivity: function (req, res, next) {
    if (config.debug) {
      console.log(chalk.magenta(('Received a POST request to suggest an Itinerary location:')));
      console.log(chalk.white(JSON.stringify(req.body, null, 2)));
    }
    // Mongoose method to retrieve and update a user
    Itinerary.findOne({'_id': req.body.itinerary_id}, function (err) {
      if (err) {
        next(err);
      }
    }).then(itinerary => {
      var activity = new Activity({
        yelpBusinessName: req.body.activity.yelpBusinessName,
        yelpUrl: req.body.activity.yelpUrl,
        yelpRating: req.body.activity.yelpRating,
        yelpPriceRange: req.body.activity.yelpPriceRange,
        yelpID: req.body.activity.yelpID,
        yelpReviewCount: req.body.activity.yelpReviewCount,
        yelpImage: req.body.activity.yelpImage,
        itineraries: itinerary._id
      });
      Activity.create(activity,function (err) {
        if (err) {
          next(err);
        }
        res.json(activity);
      });
    });
  },
};
