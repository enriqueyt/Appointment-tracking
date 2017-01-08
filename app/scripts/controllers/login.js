'use strict';

/**
 * @ngdoc function
 * @name iamWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the iamWebApp
 */
angular.module('iamWebApp')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', '$state','authService', 'authentication'];

  function LoginCtrl($scope, $rootScope, $state,authService, authentication){
  	
  	$scope.user = {};
    $scope.message = '';

  	$scope.index = function(){

  		authService
  			.auth()
  			.login($scope.user)
  			.$promise
  			.then(function(data){
          debugger
  				if(data.success){
            authentication.setCredencial(data.doc.name, data.doc.id);
  					$state.go('index.main.dash');
  				}
          else{
            $scope.message = 'Error iniciando sesion';
          }
  			})
  			.catch(function(error){
  				console.log('error')
  			})


  	};

  };
