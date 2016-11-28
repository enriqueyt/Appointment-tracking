'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.authService
 * @description
 * # authService
 * Service in the iamWebApp.
 */
angular.module('iamWebApp')
  .service('authService', authService);

  authService.$inject = ['$resource'];

  function authService($resource){
  	return {
  		auth : function(){
  			return $resource('/auth/login');
  		},
  		signup: function(){
  			return $resource('/auth/signup');
  		},
  		signout: function(){
  			return $resource('/auth/signout');
  		}
  	};
  };	