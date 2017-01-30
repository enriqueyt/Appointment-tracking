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
  		user : function(){
  			return $resource('http://127.0.0.1:3000/users/:id', {id : '@id'}, 
  				{
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
  		distributionLine : function(){
  			return $resource('http://127.0.0.1:3000/api/distributionLine/:id', {id : '@id'}, {
  				  'update' : {
  					   method : 'PUT'
  					 },
             'save':{
              method:'POST',
              headers:{
                'Content-Type': 'application/json'
              }
             }
  				});
  		},
      allDistributionLine : function(){
        return $resource('http://127.0.0.1:3000/api/distributionLine/:limit/:skip', {limit:'@limit',skip:'@skip'})
      },
  		userByDl : function(){
  			$resource('http://127.0.0.1:3000/users/userByDl/:id', {id : '@id'},
          {
            get : {
              method :'GET',
              isArray : true
            }
          });
  		}
  	};
  };
