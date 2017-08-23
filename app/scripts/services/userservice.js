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
		var url = 'http://'+((/localhost|127.0.0.1/g).test(location.href)?'localhost':'158.69.139.171')+':3000/';
  	return {
  		user : function(){
  			return $resource(url+'api/user/:id', {id : '@id'}, {
  					update : {
  						method : 'PUT'
  					}
  				});
  		},
			AllUser : function(){
  			return $resource(url+'api/user/:limit/:skip', {limit:'@limit',skip:'@skip'});
  		},
  		distributionLine : function(){
  			return $resource(url+'api/distributionLine/:id', {id : '@id'}, {
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
        return $resource(url+'api/distributionLine/:limit/:skip', {limit:'@limit',skip:'@skip'})
      },
  		userByDl : function(){
  			return $resource(url+'api/user/ByDl/:id', {id : '@id'}, {
            get : {
              method :'GET',
              isArray : true
            }
          });
  		},
			role : function(){
  			return $resource(url+'api/user/role/list/:id', {id : '@id'}, {
            get : {
              method :'GET'            
            }
        });
  		}
  	};
  };
