const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema();

TripSchema.add({
  tripName: {
    type: String,
    required: true,
    unique: false
  },
  shortDescription: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: String,
    required: true,
    unique: false
  },
  imageUrl: {
    type: String,
    required: false,
    unique: false
  },
  planner: {
    type: String,
    required: false,
    unique: false
  },
  itineraries: [{
    type: Schema.Types.ObjectId,
    ref: 'Itinerary'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Trip = mongoose.model('Trip', TripSchema);
