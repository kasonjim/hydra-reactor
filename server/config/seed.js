const chalk = require('chalk');
const config = require('./config');
const seeder = require('mongoose-seeder');
const mongoose = require('mongoose');
const connection = mongoose.connection;

const uri = config.dbRedesignUri;
const options = {
  user: config.dbUser,
  password: config.dbPwd
};

mongoose.connect(uri, options);

connection.on('error', console.error.bind(console, 'Error Seeding the MongoDB Database: '));
connection.once('open', function () {
  console.log(chalk.green.bold('MongoDB connection established successfully!'));
  console.log(chalk.blue('MongoDB Using Database: ', connection.db.s.databaseName));
});

const User = require('../models/user');
const Trip = require('../models/trip');
const Itinerary = require('../models/itinerary');
const Activity = require('../models/activity');

const data = require('./seed-data.json');

seeder.seed(data, {dropDatabase: false}).then(function (dbData) {
  console.log(chalk.green(JSON.stringify(dbData.trips)));
}).catch(function (err) {
  console.log(chalk.red(err));
});
