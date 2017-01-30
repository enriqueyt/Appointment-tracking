'use strict';

angular
  .module('iamWebApp')
  .controller('SettingCtrl', SettingCtrl);

  MainCtrl.$inject = ['$scope', '$rootScope'];

  function SettingCtrl($scope, $rootScope){

  	$scope.init = 'Holis SettingCtrl';
    
  };