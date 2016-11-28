'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.userService
 * @description
 * # userService
 * Service in the iamWebApp.
 */
angular 
  	.module('iamWebApp')
  	.service('userService', userService);

  userService.$inject = ['$resource'];

  function userService($resource){
  	return {
  		user : function(id){
  			return $resource('http://127.0.0.1:3000/users/:user_id', {user_id : id}, 
  				{
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
  		distributionLine : function(id){
  			return $resource('http://127.0.0.1:3000/distributionLine/:ln_id', {ln_id : id}, 
  				{
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
  		userByDl : function(id){
  			$resource('http://127.0.0.1:3000/userByDl/:_id', {_id:id},
          {
            get : {
              method :'GET',
              isArray : true
            }
          });
  		}
  	};
  };
