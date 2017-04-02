const User = require('../models/user.js');
const Trip = require('../models/trip.js');
const Activity = require('../models/activity.js')

module.exports = {
  createTrip: function(req, res) {
    console.log('Received the following POST request to create a trip: ', req.body);
    // Mongoose method to retrieve and update a user
    User.findOneAndUpdate({'_id': req.body.user_id}, {$push: { trips: { tripName: req.body.trip.tripName } } }, {new: true}, function (err, user) {
      if (err) {
        console.log('Error: ', err);
      } else {
        res.json(user);
      }
    });
  }
};
