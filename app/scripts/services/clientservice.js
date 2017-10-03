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
	var url = 'http://'+((/localhost|127.0.0.1/g).test(location.href)?'localhost':'158.69.139.171')+':3000/';
  	return {
  		client : function(id){
  			return $resource(url+'api/client/:id', {id:'@id'}, {
				update : {
					method : 'PUT'
				}
			});
  		},
  		clients : function () {
  			return $resource(url+'api/client/complex/all/:limit/:skip', {
  					limit : '@limit',
  					skip : '@skip'
  				},{
  				get : {
  					method: 'GET'
  				}
  			});
  		},
  		clientsBy : function () {
  			return $resource(url+'api/client/complex/list/:isRead', {isRead:'@isRead'}, {
  				get: {
  					method: 'GET'
  				}
  			});
  		},
  		findReferredClient : function(id){
  			return $resource(url+'api/client/findReferredClient/:id', {id:'@id'}, {
  				get:{
  					method:'GET'
  				}
  			});
		}
  	};
  };
