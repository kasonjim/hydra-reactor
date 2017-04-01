angular.module('logoutModule', []).controller('logoutController', ['$scope', '$http', 'User', function($scope, $http, User) {

  $scope.check = function() {
    if(sessionStorage.getItem('auth')) {
      return false;
    } else {
      return true;
    }
  }
  
  $scope.logout = function () {
    sessionStorage.removeItem('x-auth');
    sessionStorage.removeItem('auth');
    window.location.href = 'index.html';
  }  
}]);