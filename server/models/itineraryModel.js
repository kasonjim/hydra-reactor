const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

const ActivitySchema = new Schema();
var ItinerarySchema = new Schema();

ItinerarySchema.add({
  startDate: Date,
  title: String,
  activities: [ActivitySchema]
});

var Itinerary = mongoose.model('Itinerary', ItinerarySchema);

module.exports = {
  Itinerary: Itinerary
};
