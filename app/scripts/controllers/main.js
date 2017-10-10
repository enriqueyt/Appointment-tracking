'use strict';

/**
 * @ngdoc function
 * @name iamWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iamWebApp
 */
angular
	.module('iamWebApp')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope','$rootScope'];

  function MainCtrl($scope,$rootScope){
  	angular.element('.dropdown-toggle').dropdown();
    $scope.avatar='';
     console.log('MainCtrl')
     
     $scope.$on("currentAccount", function(evt,data){
      console.log(data);
      $scope.avatar=data.data.avatar;
    });

     $scope.$on("MyEvent", function(evt,data){
      $rootScope.globals=data;
      console.log(data)
      initNav();
    });
  };