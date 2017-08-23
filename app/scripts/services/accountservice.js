'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.accountService
 * @description
 * # accountService
 * Service in the iamWebApp.
 */
angular.module('iamWebApp')
  .service('accountService', accountService);

accountService.$inject=['$resource'];

function accountService ($resource){  
	var url = 'http://'+((/localhost|127.0.0.1/g).test(location.href)?'localhost':'158.69.139.171')+':3000/';
  	return {
  		userAccountLogged : function(id){
  			return $resource(url+'api/userAccountLogged', {}, {
  				'save' : {
            method : 'POST'
          }
  			});
  		}
  	};
  };
