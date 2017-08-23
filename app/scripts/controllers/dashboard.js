'use strict';

/**
 * @ngdoc function
 * @name iamWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the iamWebApp
 */
angular.module('iamWebApp')
  .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject=['$scope', 'authentication'];

function DashboardCtrl($scope, authentication) {
  	console.log('DashboardCtrl')
    var temp = authentication.getCredentials();
    var currentAccount=JSON.parse(JSON.parse(temp))
    $scope.role=currentAccount.data.role[0];
    
  };