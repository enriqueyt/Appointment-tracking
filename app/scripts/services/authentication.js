'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.authentication
 * @description
 * # authentication
 * Service in the iamWebApp.
 */
angular
	.module('iamWebApp')
  	.service('authentication', authentication);

  authentication.$inject = ['$rootScope', '$cookieStore'];

  function authentication($rootScope, $cookieStore) {
    var service = {};

    service.setCredencial = function(username, id){
    	$rootScope.globals = {
    		currentUser : {
    			username: username,
    			id: id
    		},
    		isAuthenticate : true
    	};

    	$cookieStore.put('globals', $rootScope.globals);
    };

    service.crearCredential = function(){
    	$rootScope.globals = {};
    	$cookieStore.remove('globals');    		
    };

    return service;

  };
