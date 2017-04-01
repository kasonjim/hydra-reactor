angular.module('signinSplash', [
  'ngRoute',
  'hydraApp',
  'signinModule',
  'signupModule',
  'dashboardModule',
  'tripCreatorModule',
  'tripViewModule',
  'suggestModule',
  'logoutModule'
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
    templateUrl: 'tripview/tripView.html',
    controller: 'tripViewController'
  })
  .when('/suggest', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'tripview/suggest.html',
    controller: 'suggestController'
  })
  .otherwise({
    redirectTo: '/signin'
  });

  $locationProvider.hashPrefix('');
});
