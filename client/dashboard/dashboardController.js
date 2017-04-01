angular.module('dashboardModule', [])

.controller('dashboardController', ['$scope', '$location', '$http', 'User', function($scope, $location, $http, User) {
  $scope.userData = User.userData;
  $scope.newTrip = User.newTrip;
  $scope.setTripIndex = User.setTripIndex;
  $scope.go = User.go;
}])

//creates subarrays from a single array where each subarray serves as a row within boostrap framework
.filter('listToMatrix', function() {
  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  }
  return function(list, elementsPerSubArray) {
    return listToMatrix(list, elementsPerSubArray);
  };
});
