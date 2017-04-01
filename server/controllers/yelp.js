const config = require('../config/config');
const yelpFusion = require('yelp-fusion');
const yelp = yelpFusion.client(config.yelpToken);

module.exports = {
  keywordSearch: function(req, res) {
    var searchQuery = req.body;

    yelp.search(searchQuery).then(response => {
      res.status(200).send(response.jsonBody.businesses);
    }).catch(e => { console.log(e); });
  },

  businessSearch: function(req, res) {
    var id = req.body.id;
    var moreInfo = {};
    yelp.business(id)
      .then(response => {
        moreInfo['details'] = response.jsonBody;
        yelp.reviews(req.body.id)
          .then(response => {
            moreInfo['reviews'] = response.jsonBody.reviews;
            res.status(200).send(moreInfo);
          });
      });
  }
};
