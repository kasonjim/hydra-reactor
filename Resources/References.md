# References

## Documentation

* [AngularJS.org](https://angularjs.org/)
* [AngularJS Documentation](https://docs.angularjs.org/api)
* [UI-Router for AngularJS(1.x)](https://ui-router.github.io/ng1/)
* [Bootstrap](http://getbootstrap.com/getting-started/)
* [Yelp API](https://www.yelp.com/developers/documentation/v3)
* [Google Places API](https://developers.google.com/places/)

## Research

* [MongoDB Embed vs. Reference](https://docs.google.com/presentation/d/1hAJnl3J0KG01q5FUi8wPeTF7Y-bINZlaKylPbThaw7M/edit#slide=id.p)
* [Mongoose Schema Basics](http://coursework.vschool.io/mongoose-schemas/)
* [Mongoose Population](http://mongoosejs.com/docs/populate.html)
* [50 Tips and Tricks for MongoDB Developers: Chapter 1. Application Design Tips](https://www.safaribooksonline.com/library/view/50-tips-and/9781449306779/ch01.html)
* [Model One-to-Many Relationships with  Document References](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)
* [MongoDB Datatypes](https://www.tutorialspoint.com/mongodb/mongodb_datatype.htm)
* [Invalid Value for Schema Array Path](http://stackoverflow.com/questions/30856208/invalid-value-for-schema-array-path)
* [Styling angular-ui-boostrap DatePicker](http://matthewyarlett.blogspot.com/2014/09/styling-ui-bootstrap-angularjs.html);

## CDN Links

* [Angular 1.6.1](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js): https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js
* [Angular Route 1.6.1](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.min.js): https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.min.js
* [Angular UI Router 0.4.2](https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.min.js): https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router.min.js
* [Bootstrap 3.x](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css): https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css

## Cheatsheets/Quick References

* [MongoDB 2.4 Shell Cheatsheet](https://dhodgin.files.wordpress.com/2013/10/mongo-shell-cheat-sheet-v2-4.pdf)

## Tools

* [Robomongo](https://robomongo.org/): Native MongoDB Management Tool (Admin UI)

## Troubleshooting

* **Cannot connect to MongoDB/Connection Refused**:
    * Navigate to `/data/db` in the Terminal
    * If there is a `mongod.lock` file, delete it
    * Try to restart the `mongod` service using `brew services start mongodb`
    * Try to enter the shell using the command `mongo`

[Emmet.io](https://emmet.io/)
