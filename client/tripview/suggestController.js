angular.module('suggestModule', [
  'ui.bootstrap'
])

.controller('suggestController', ['$scope', '$http', function($scope, $http) {
  $scope.results = [];
  $scope.allCategories = [];  // "title" is shown on page, "alias" is the category value

  $scope.term = 'Four Barrel Coffee';
  $scope.location = 'san francisco, ca';
  $scope.categories = 'coffee';

  // Search yelp based on the three fields above (location will be automatic in our site later)
  $scope.search = function() {
    return $http({
      method: 'POST',
      url: '/api/yelpSearch',
      data: {
        term: $scope.term,
        location: $scope.location,
        radius: 16000,
        categories: $scope.categories,
        limit: 5,
        offset: 0,
        sort_by: 'best_match',
        price: '1,2,3,4'
      }
    }).then( (res) => {
      console.log('search results', res.data);
      $scope.results = res.data;
    });
  };

  // Get more details on the specific business (for now, you click on the image)
  $scope.businessDetails = function(index) {
    return $http({
      method: 'POST',
      url: '/api/yelpBusiness',
      data: {
        id: $scope.results[index].id
      }
    }).then( (res) => {
      console.log('more details', res.data);
      // res.data.details
      // res.data.reviews
    });
  };

  // Populate categories array with array of { "alias": ..., "title": ... } (1457 of them)
  $scope.seed = function() {
    return $http({
      method: 'GET',
      url: '../lib/categories.json'
    }).then( (res) => {
      $scope.allCategories = res.data.map( category => {
        return { alias: category.alias, title: category.title };
      });
      console.log($scope.allCategories);
    }).catch( (err) => {
      console.error('error: ', err);
    });
  };

  $scope.seed();
}]);


