var mongoose = require('mongoose');
require('./userModel.js');
require('./tripModel.js');
require('./activityModel.js');
require('./itineraryModel.js');

if (process.env.DATABASE_URL) {
  mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
} else {
  mongoose.connect('mongodb://localhost/hydra');
}
var db = mongoose.connection;


