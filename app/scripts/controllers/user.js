'use strict';

angular
	.module('iamWebApp')
  .controller('UsersCtrl', UsersCtrl);

  MainCtrl.$inject = ['$scope', '$rootScope'];

  function UsersCtrl($scope, $rootScope){

  	$scope.init = 'Holis UsersCtrl';
    
  };