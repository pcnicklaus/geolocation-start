var app = angular.module('myApp', ['ui-router', 'satellizer']);

///// satellizer config
///////////////////////
app.config(function($authProvider) {
  $authProvider.facebook({
    clientId: 'Facebook App ID'
  });
  $authProvider.google({
    clientId: 'Google Client ID'
  });
  $authProvider.github({
    clientId: 'Github Client ID'
  });

});

/////router config
///////////////////
app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html'
    })

    // nested list with custom controller
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: function ($scope) {
        }
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: function ($scope) {
        }
    })

    // nested list with just some random string data
    .state('findme', {
        url: '/findme',
        template: 'partials/findme.html',
        controller: function ($scope) {

        }
    });

    $authProvider.loginUrl = 'http://twitter-server.herokuapp.com/auth/login';
       $authProvider.signupUrl = 'http://instagram-server.herokuapp.com/auth/signup';
       $authProvider.oauth2({
         name: 'instagram',
         url: 'http://instagram-server.herokuapp.com/auth/instagram',
         redirectUri: 'https://dl.dropboxusercontent.com/u/14131013/instagram/index.html',
         clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1',
         requiredUrlParams: ['scope'],
         scope: ['likes'],
         scopeDelimiter: '+',
         authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
       });
     })
     .run(function($rootScope, $window, $auth) {
       if ($auth.isAuthenticated()) {
         $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
       }


});

