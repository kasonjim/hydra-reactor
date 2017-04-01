const chalk = require('chalk');
const config = require('./config');
const mongoose = require('mongoose');
const connection = mongoose.connection;

var uri = config.dbUri;
var options = {
  user: config.dbUser,
  password: config.dbPwd
};

if (process.env.DATABASE_URL) {
  mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
} else {
  mongoose.connect(uri, options);
}

connection.on('error', console.error.bind(console, 'MongoDB Error: '));
connection.once('open', function () {
  console.log(chalk.green.bold('MongoDB connection established successfully!'));
  console.log(chalk.blue('MongoDB Using Database: ', connection.db.s.databaseName));
});




