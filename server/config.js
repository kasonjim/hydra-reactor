// GOOGLE PLACES API CONFIGURATION

exports.gpPlaceTextSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch';
exports.gpPlacePhotoSearchURl = 'https://maps.googleapis.com/maps/api/place/photo';
exports.gpApiKey = process.env.GOOGLE_PLACES_API_KEY;
exports.gpOutputFormat = process.env.GOOGLE_PLACES_OUTPUT_FORMAT || "json";
exports.gpPhotoMaxWidth = "1080";

// YELP API CONFIGURATION

exports.yelpToken = process.env.YELP_TOKEN;

// DATABASE CONFIGURATION


