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
        url:'/main',
        templateUrl:'views/main.html',
        controller:'MainCtrl',
        controllerAs:'main'
      })
      .state('index.main.init', {
        url:'/init',
        templateUrl:'views/init.html'
      })
      .state('index.login', {
        url:'/login',
        templateUrl:'views/login.html',
        controller:'LoginCtrl',
        controllerAs:'login'
      })
      .state('index.main.dash', {
        url:'/',
        templateUrl:'views/dashboard.html',
        controller:'DashboardCtrl',
        controllerAs:'dash'
      })

      $urlRouterProvider.otherwise('/');
  };

  run.$inject = ['$rootScope', '$cookieStore', '$state']

  function run($rootScope, $cookieStore, $state){

    $rootScope.globals = $cookieStore.get('globals') || {};

    if(typeof $rootScope.globalscurrentUser == 'undefined')
      $state.go('index.main.init');
    console.log($rootScope.globals)
    
    $rootScope.logout = function(){
      //llamar al servidor logout
      $rootScope.globals = {};
      $cookieStore.remove('globals')
      $state.go('index.main.init');
    };

    console.log('test run : WGU')
  };