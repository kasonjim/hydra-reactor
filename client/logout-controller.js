angular.module('logoutModule', []).controller('logoutController', ['$scope', '$http', 'User', function($scope, $http, User) {

  
  $scope.logout = function () {
    sessionStorage.removeItem('x-auth');
    sessionStorage.removeItem('auth');
  }  
}]);