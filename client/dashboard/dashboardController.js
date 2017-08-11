angular.module('dashboardModule', [])

.controller('dashboardController', ['$scope', '$location', '$http', 'User', function($scope, $location, $http, User) {
  $scope.userData = User.userData;
  $scope.newTrip = User.newTrip;
  $scope.setTripIndex = User.setTripIndex;
  $scope.go = User.go;
}])