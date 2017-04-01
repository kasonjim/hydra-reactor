// GOOGLE PLACES API CONFIGURATION
exports.gpPlaceTextSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch';
exports.gpPlacePhotoSearchURl = 'https://maps.googleapis.com/maps/api/place/photo';
exports.gpApiKey = process.env.GOOGLE_PLACES_API_KEY;
exports.gpOutputFormat = process.env.GOOGLE_PLACES_OUTPUT_FORMAT || 'json';
exports.gpPhotoMaxWidth = '1080';

// YELP API CONFIGURATION
exports.yelpToken = process.env.YELP_TOKEN;

// DATABASE CONFIGURATION
exports.dbUri = process.env.MONGODB_URI_HYDRA || 'mongodb://localhost/hydra';
exports.dbRedesignUri = 'mongodb://localhost/hydra-redesign';
exports.dbUser = process.env.MONGODB_HYDRA_USER || 'hydra_admin';
exports.dbPwd = process.env.MONGODB_HYDRA_PWD || '';

// SERVER
exports.port = process.env.PORT || 3000;
