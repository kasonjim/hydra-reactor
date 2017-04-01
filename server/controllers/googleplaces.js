const chalk = require('chalk');
const config = require('../config/config');
const request = require('request');

module.exports = {
  getLocations: function (req, res) {
    var chunks = [];
    var query = req.body.query;
    var queryUrl = config.gpPlaceTextSearchUrl + '/' + config.gpOutputFormat + '?query=' + query + '&key=' + config.gpApiKey;
    console.log(chalk.yellow('Querying Google Places API with: ', query));
    console.log(chalk.yellow(queryUrl));
    request.post(queryUrl)
      .on('response', function (response) {
        console.log('Status: ', response.statusCode);
        //console.log('Headers: ', response.headers['content-type']);
        console.log(chalk.white(JSON.stringify(response, null, 2)));
        //res.send(response);
      })
      .on('data', function (chunk) {
        chunks.push(chunk);
      })
      .on('end', function () {
        var body = Buffer.concat(chunks);
        console.log(chalk.white(body));
        res.send(body);
      });
  }
};
