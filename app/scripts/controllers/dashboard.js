'use strict';

/**
 * @ngdoc function
 * @name iamWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the iamWebApp
 */
angular.module('iamWebApp')
  .controller('DashboardCtrl', function () {
  	console.log('DashboardCtrl')
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
