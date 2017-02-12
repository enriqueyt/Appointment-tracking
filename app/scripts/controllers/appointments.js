'use strict';

angular
	.module('iamWebApp')
  .controller('AppointmentsCtrl', AppointmentsCtrl);

  AppointmentsCtrl.$inject = ['$scope', '$rootScope'];

  function AppointmentsCtrl($scope, $rootScope){

  	$scope.init = 'Appointments';
    
  };