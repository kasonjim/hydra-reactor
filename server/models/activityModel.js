const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var UserSchema = new Schema();
var ActivitySchema = new Schema();

ActivitySchema.add({
  yelpBusinessName: String,
  yelpUrl: String,
  yelpRating: Number,
  yelpPriceRange: String,
  yelpID: String,
  yelpReviewCount: Number,
  yelpImage: String,
  totalLikes: Number,
  likedBy: [UserSchema],
  description: String,
  category: String
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports = {
  Activity: Activity
};
