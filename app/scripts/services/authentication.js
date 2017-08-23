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

  authentication.$inject = ['$cookies', '$rootScope', '$timeout', '$http', '$window', 'authService','accountService'];

  function authentication($cookies, $rootScope, $timeout, $http, $window, authService, accountService) {

      var auth = {};

      auth.login = function(obj, callback){

          authService
            .auth()
  			    .login(obj)
            .$promise
            .then(function (data) {
              if(data.success){
                  callback({success:true, data:data});
                  return;
              }
              else{
                 callback({success:false, doc:data.message});
                  return;
              }
             
            })
            .catch(function (err) {
              callback({success:false});
            })
      };

      auth.logout = function(callback){
        callback(authService.clearCredentials());
      };

      auth.setCredentials = function(data){
        $rootScope.globals = $sessionStorage.globals = data.data;
      };

      auth.loadCredentials = function(access_token, done){
          accountService
            .userAccountLogged()
            .get({ access_token:access_token})
            .$promise
            .then(function (data) {
                $rootScope.globals = data;
                done(true, globals)
            });
      };

      auth.clearCredentials = function () {
        $rootScope.globals = {};
        $cookies.remove('mySession');
        //$window.sessionStorage.removeItem('mySession');
        //$window.sessionStorage.clear();
        return true;
      };

      auth.getCredentials = function(){
        var aux = $cookies.get('mySession');
        if(aux!=null){
          aux = JSON.stringify(aux);
        }
        return aux;
      };

      return auth;
  };
