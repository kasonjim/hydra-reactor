const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema();

ItinerarySchema.add({
  startDate: {
    type: Date,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

var Itinerary = mongoose.model('Itinerary', ItinerarySchema);
