const User = require('../models/userModel.js');

module.exports = {
  addItineraryItem: function(req, res) {
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
  }
};
