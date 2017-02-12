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
  			return $resource('http://127.0.0.1:3000/api/user/:id', {id : '@id'}, {
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
			AllUser : function(){
  			return $resource('http://127.0.0.1:3000/api/user/:limit/:skip', {limit:'@limit',skip:'@skip'});
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
  			return $resource('http://127.0.0.1:3000/api/user/ByDl/:id', {id : '@id'}, {
            get : {
              method :'GET',
              isArray : true
            }
          });
  		},
			role : function(){
  			return $resource('http://127.0.0.1:3000/api/user/role/list/:id', {id : '@id'}, {
            get : {
              method :'GET'            
            }
        });
  		}
  	};
  };
