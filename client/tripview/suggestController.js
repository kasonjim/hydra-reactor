angular.module('suggestModule', [
  'ui.bootstrap'
])

.controller('suggestController', ['$scope', '$http', function($scope, $http) {
  $scope.active = 0;

  $scope.allCategories = [];  // "title" is shown on page, "alias" is the category value
  $scope.results = [];
  $scope.reviews = [];
  $scope.morePhotos = [];
  $scope.showAdditionalInfo = false;

  $scope.categories = '';
  $scope.term = '';
  $scope.location = 'san francisco, ca';

  $scope.$watch('active', function(index) {
    if ($scope.results.length !== 0) {
      // Hide header until new review/photo results are in
      $scope.showAdditionalInfo = false;
      $scope.businessDetails(index);
    }
  });

  // Search yelp based on the three fields above (location will be automatic in our site later)
  $scope.search = function() {
    // Set to -1 to invoke a "change" when watching for active
    // This will reset to 0 when search returns successful results
    $scope.active = -1;
    // Hide header until new review/photo results are in
    $scope.showAdditionalInfo = false;

    return $http({
      method: 'POST',
      url: '/api/yelpSearch',
      data: {
        term: $scope.term,
        location: $scope.location,
        radius: 16000,
        categories: $scope.categories.alias,
        limit: 10,
        offset: 0,
        sort_by: 'best_match',
        price: '1,2,3,4'
      }
    }).then( (res) => {
      console.log('search results', res.data);
      $scope.results = res.data;
      $scope.active = 0;
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
      // console.log('more details', res.data);
      $scope.reviews = res.data.reviews;
      $scope.morePhotos = res.data.details.photos;
      $scope.showAdditionalInfo = true;
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
      // console.log($scope.allCategories);
    }).catch( (err) => {
      console.error('error: ', err);
    });
  };

  $scope.seed();
}]);


