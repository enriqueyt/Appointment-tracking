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

  LoginCtrl.$inject = ['$scope', '$rootScope', '$state','authService'];

  function LoginCtrl($scope, $rootScope, $state,authService){
  	console.log('login')
  	$scope.user = {};

  	$scope.index = function(){

  		authService
  			.auth()
  			.login($scope.user)
  			.$promise
  			.then(function(data){
  				if(data.success){
  					$rootScope.isAuthenticate = true;
      				$rootScope.currentUser = data.doc.name;
      				$rootScope._id = data.doc._id;
  					$state.go('index.main');
  				}
  			})
  			.catch(function(error){
  				console.log('error')
  			})


  	};

  };
