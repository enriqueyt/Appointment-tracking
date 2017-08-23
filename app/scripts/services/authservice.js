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
		var url = 'http://'+((/localhost|127.0.0.1/g).test(location.href)?'localhost':'158.69.139.171')+':3000/';
  	return {
  		auth : function(){
  			return $resource(url+'auth/login',{},{
          login:{
            method:'POST'
          }
        });
  		},
  		signup: function(){
  			return $resource('/auth/signup');
  		},
  		signout: function(){
  			return $resource('/auth/signout');
  		}
  	};
  };	