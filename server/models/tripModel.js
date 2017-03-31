const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

const UserSchema = new Schema();
const ActivitySchema = new Schema();
var TripSchema = new Schema();

TripSchema.add({
  tripName: String,
  shortDescription: String,
  location: String,
  imageUrl: String,
  users: [UserSchema],
  activities: [ActivitySchema]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = {
  Trip: Trip
};
