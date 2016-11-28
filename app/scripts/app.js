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

  configure.$inject = ['$stateProvider','$httpProvider'];

  function configure ($stateProvider, $httpProvider) {
    
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
  };

  function run(){
    console.log('test run : WGU')
  };