'use strict';

angular
	.module('iamWebApp')
  .controller('AppointmentsCtrl', AppointmentsCtrl);

  MainCtrl.$inject = ['$scope', '$rootScope'];

  function AppointmentsCtrl($scope, $rootScope){

  	$scope.init = 'Appointments';
    
  };