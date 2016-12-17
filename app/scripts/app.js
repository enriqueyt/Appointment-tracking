'use strict';

/**
 * @ngdoc overview
 * @name iamWebApp
 * @description
 * # iamWebApp
 *
 * Main module of the application.
 */
angular
  .module('iamWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ui.router'
  ])
  .config(configure)
  .run(run);

  configure.$inject = ['$stateProvider','$httpProvider', '$urlRouterProvider'];

  function configure ($stateProvider, $httpProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('index', {
        url:'',
        templateUrl:'index.html'
      })
      .state('index.main', {
        url:'/',
        templateUrl:'views/main.html',
        controller:'MainCtrl',
        controllerAs:'main'
      })
      .state('index.login', {
        url:'/login',
        templateUrl:'views/login.html',
        controller:'LoginCtrl',
        controllerAs:'login'
      })

      $urlRouterProvider.otherwise('/');
  };

  run.$inject = ['$rootScope']

  function run($rootScope){
    $rootScope.isAuthenticate = false;
    $rootScope.currentUser = '';
    $rootScope.logout = function(){
      //llmar al servidor logout
      $rootScope.isAuthenticate = false;
      $rootScope.currentUser = '';
    };
    console.log('test run : WGU')
  };