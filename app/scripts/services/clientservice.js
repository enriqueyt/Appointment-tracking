'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.clientService
 * @description
 * # clientService
 * Service in the iamWebApp.
 */
angular
	.module('iamWebApp')
  	.service('clientService', clientService);	

  clientService.$inject = ['$resource'];

  function clientService($resource){
  	return {
  		client : function(id){
  			return $resource('http://127.0.0.1:3000/api/client/:id', {id:'@id'}, {
				update : {
					method : 'PUT'
				}
			});
  		},
  		clients : function () {
  			return $resource('http://127.0.0.1:3000/api/client/complex/all/:limit/:skip', {
  					limit : '@limit',
  					skip : '@skip'
  				},{
  				get : {
  					method: 'GET'
  				}
  			});
  		},
  		clientsBy : function () {
  			return $resource('http://127.0.0.1:3000/api/client/complex/list/:isRead', {isRead:'@isRead'}, {
  				get: {
  					method: 'GET'
  				}
  			});
  		},
  		findReferredClient : function(id){
  			return $resource('http://127.0.0.1:3000/api/client/findReferredClient/:id', {id:'@id'}, {
  				get:{
  					method:'GET'
  				}
  			});
  		}
  	};
  };
