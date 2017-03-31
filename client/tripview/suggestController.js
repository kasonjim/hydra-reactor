angular.module('suggestModule', [])

.controller('suggestController', ['$scope', '$http', function($scope, $http) {
  $scope.term = 'Four Barrel Coffee';
  $scope.location = 'san francisco, ca';
  $scope.categories = 'coffee';

  $scope.results = [];

  $scope.search = function() {
    return $http({
      method: 'POST',
      url: '/api/yelpSearch',
      data: {
        term: $scope.term,
        location: $scope.location,
        radius: 16000,
        categories: $scope.categories,
        limit: 10,
        offset: 0,
        sort_by: 'best_match',
        price: '1,2,3,4'
      }
    }).then(function(res) {
      console.log('response', res.data);
      $scope.results = res.data;
    });
  };

  $scope.business = function() {
    return $http({
      method: 'POST',
      url: '/api/yelpBusiness',
      data: {
        id: $scope.results[0].id
      }
    }).then(function(res) {
      console.log('response', res.data);
      // res.data.details
      // res.data.reviews
    });
  };
}]);


