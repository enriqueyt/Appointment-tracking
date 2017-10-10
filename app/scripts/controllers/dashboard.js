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

  DashboardCtrl.$inject=['$scope','$rootScope', 'authentication', 'userService'];

function DashboardCtrl($scope, $rootScope, authentication, userService) {
  	
    var temp = authentication.getCredentials();
    var currentAccount=JSON.parse(JSON.parse(temp))
    $scope.role=currentAccount.data.role[0];
    $rootScope.$broadcast("currentAccount",currentAccount);
    userService
      .dashboard()
      .get({id:currentAccount.data.id})
      .$promise
      .then(function(data){
        $scope.dashboard=data.data;
      })
      .catch(function(err){
        console.log(err)
      });
    
  };