const User = require('../models/userModel.js');

module.exports = {
  suggestActivity: function (req, res) {
    // Pass in request object that includes user id, trip object id, activity object
    console.log('Received the following POST request to create an activity: ', req.body);
    User.findById(req.body.user_id, function (err, user) {
      if (err) {
        console.log('Error: ', err);
      } else {
        // Commented out version with day schema
        // user.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.push(req.body.activity);
        user.trips.id(req.body.trip_id).activities.push(req.body.activity);
        user.save();
        res.json(user);
      }
    });
  },

  deleteActivity: function(req, res) {
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
  }
};
