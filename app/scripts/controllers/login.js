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

  LoginCtrl.$inject = ['$scope', '$rootScope', '$state','authService', 'authentication','$cookies'];

  function LoginCtrl($scope, $rootScope, $state,authService, authentication, $cookies){
  	
  	$scope.user = {};
    $scope.message = '';
    $scope.errorMessage = false;
		authentication.clearCredentials();

    $scope.index = function(){

      $scope.dataLoading = true;
      debugger
      authentication.login($scope.user, function(data){
					console.log("data")
					console.log(data)					
          if(data.success){
							$state.go('index.main.dash');
							$rootScope.globals = data.data;							
							$cookies.put('mySession', JSON.stringify(data.data));
                          }
          else{
             $scope.message = 'Usuario o Contraseña Incorrecto!';
          }
          $scope.dataLoading = false;
        });

    };

  };
