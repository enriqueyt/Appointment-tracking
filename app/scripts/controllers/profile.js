'use strict';

angular
  .module('iamWebApp')
  .controller('ProfileCtrl', ProfileCtrl);

  MainCtrl.$inject = ['$scope', '$rootScope'];

  function ProfileCtrl($scope, $rootScope){

  	$scope.init = 'Holis ProfileCtrl';
    
  };