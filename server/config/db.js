const chalk = require('chalk');
const config = require('./config');
const mongoose = require('mongoose');
const connection = mongoose.connection;

var uri = config.dbUri;
var options = {
  user: config.dbUser,
  password: config.dbPwd
};

if (process.env.MONGODB_URI) {
  mongoose.connect(MONGODB_URI);
} else {
  mongoose.connect(uri, options);
}

connection.on('error', console.error.bind(console, 'MongoDB Error: '));
connection.once('open', function () {
  console.log(chalk.green.bold('MongoDB connection established successfully!'));
  console.log(chalk.blue('MongoDB Using Database: ', connection.db.s.databaseName));
});