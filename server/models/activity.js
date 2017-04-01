const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema();

ActivitySchema.add({
  yelpBusinessName: {
    type: Date,
    required: false,
    unique: false
  },
  yelpUrl: {
    type: String,
    required: false,
    unique: false
  },
  yelpRating: {
    type: Number,
    required: false,
    unique: false
  },
  yelpPriceRange: {
    type: String,
    required: false,
    unique: false
  },
  yelpID: {
    type: String,
    required: false,
    unique: false
  },
  yelpReviewCount: {
    type: String,
    required: false,
    unique: false
  },
  yelpImage: {
    type: String,
    required: false,
    unique: false
  },
  totalLikes: {
    type: Number,
    required: false,
    unique: false
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Activity = mongoose.model('Activity', ActivitySchema);
