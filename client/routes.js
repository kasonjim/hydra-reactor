angular.module('signinSplash', [
  'ngRoute',
  'hydraApp',
  'signinModule',
  'signupModule',
  'dashboardModule',
  'tripCreatorModule',
  'tripViewModule'
])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'signinController'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'signupController'
  })
  .when('/dashboard', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboardController'
  })
  .when('/tripcreator', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'tripcreator/tripCreator.html',
    controller: 'tripCreatorController'
  })
  .when('/tripview', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'tripView/tripView.html',
    controller: 'tripViewController'
  })
  .otherwise({
    redirectTo: '/signin'
  });

  $locationProvider.hashPrefix('');
});
