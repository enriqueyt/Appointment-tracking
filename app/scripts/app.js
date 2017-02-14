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
    'ui.router',
    'ui.bootstrap'
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
      .state('index.main.distributorline', {
        url:'/distributorline',
        templateUrl:'views/distributorLine.html',
        controller:'DistributorLineCtrl',
        controllerAs:'dist'
      })
      .state('index.main.createdistributorline', {
        url:'/createdistributorline',
        templateUrl:'views/createdistributorline.html',
        controller:'CreateDistributionLineCtrl',
        controllerAs:'cdl'
      })
      .state('index.main.appointments', {
        url:'/appointments',
        templateUrl:'views/appointments.html',
        controller:'AppointmentsCtrl',
        controllerAs:'cdl'
      })
      .state('index.main.addappointments', {
        url:'/addappointments',
        templateUrl:'views/addappointments.html',
        controller:'AddAppointmentsCtrl',
        controllerAs:'acdl'
      })
      .state('index.main.users', {
        url:'/users',
        templateUrl:'views/users.html',
        controller:'UsersCtrl',
        controllerAs:'userCtrl'
      })
      .state('index.main.addusers', {
        url:'/addusers',
        templateUrl:'views/addusers.html',
        controller:'AddUsersCtrl',
        controllerAs:'adduserCtrl'
      })
      .state('index.main.client', {
        url:'/client',
        templateUrl:'views/client.html',
        controller:'ClientCtrl',
        controllerAs:'clientCtrl'
      })
      .state('index.main.addclient', {
        url:'/addclient',
        templateUrl:'views/addclient.html',
        controller:'AddClientCtrl',
        controllerAs:'addclientCtrl'
      })
      .state('index.main.roles', {
        url:'/roles',
        templateUrl:'views/roles.html',
        controller:'RolesCtrl',
        controllerAs:'rolesCtrl'
      })

      $urlRouterProvider.otherwise('/');
  };

  run.$inject = ['$rootScope', '$cookieStore', '$state']

  function run($rootScope, $cookieStore, $state){
    $rootScope.alerts = [];
    
    $rootScope.globals = $cookieStore.get('globals') || {};

    if(typeof $rootScope.globalscurrentUser == 'undefined')
      $state.go('index.main.dash');
    console.log($rootScope.globals)
    
    $rootScope.logout = function(){
      //llamar al servidor logout
      $rootScope.globals = {};
      $cookieStore.remove('globals')
      $state.go('index.main.dash');
    };

    console.log('test run : WGU')
  };