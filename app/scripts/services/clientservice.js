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
  			return $resource('http://127.0.0.1:3000/api/client/:client_id', {client_id:id}, {
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
  		clients : function (_client) {
  			return $resource('http://127.0.0.1:3000/api/client/complex/all/:limit/:skip', {
  					limit : _client.limit,
  					skip : _client.skip
  				},{
  				query : {
  					method: 'GET',
  					isArray : true
  				}
  			});
  		},
  		clientsBy : function (_client) {
  			return $resource('http://127.0.0.1:3000/api/client/complex/list/:isRead', {isRead:_client.isRead}, {
  				query : {
  					method: 'GET',
  					isArray : true
  				}
  			});
  		},
  		findReferredClient : function(id){
  			return $resource('http://127.0.0.1:3000/api/client/findReferredClient/:client_id', {client_id:id}, {
  				query:{
  					method:'GET',
  					isArray:true
  				}
  			});
  		}
  	};
  };
