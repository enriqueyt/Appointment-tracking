'use strict';

angular
	.module('iamWebApp')
  .controller('UsersCtrl', UsersCtrl)
  .controller('AddUsersCtrl', AddUsersCtrl)
  .controller('RolesCtrl', RolesCtrl);

  UsersCtrl.$inject = ['$scope', '$rootScope', 'userService'];

  function UsersCtrl($scope, $rootScope, userService){

    userService
      .AllUser()
      .get({limit:10,skip:0})
      .$promise
      .then(function(data){
        console.log(data);
        $scope.lstUsuarios = data.data||[];
      })
      .catch(function(err){
        console.log(err)
      });
  };

  AddUsersCtrl.$inject = ['$scope', '$rootScope', 'userService'];

  function AddUsersCtrl($scope, $rootScope, userService){

    userService
      .allDistributionLine()
      .get({limit:10,skip:1})
      .$promise
      .then(function(data){        
        $scope.lstdl = data.data || [];
      })
      .catch(function(err){
        console.log(err);
      })
   
    userService
      .role()
      .get({id:0})
      .$promise
      .then(function(data){
        $scope.lstrols = data.data||[];
      })
      .catch(function(err){
        console.log(err);
      });

    $scope.adduser = function(){
      
      var user = {
        name : $scope.user.name,
        username: $scope.user.username,
        password: $scope.user.password,
        email: $scope.user.email,
        admin: $scope.user.admin,
        location: $scope.user.location,
        role : $scope.user.rol.name
      };

      if(typeof $scope.user.dl != 'undefined')
        user.distributorLine = $scope.user.dl
        
      userService
        .user()
        .save({id:0}, user)
        .$promise
        .then(function(data){
          $scope.user = data.data;
          if(!data.error){
            $rootScope.alert = {
              msg:'Se creo con exito!',
              type:'success',
              link:''
            };
          }
          else{
            $rootScope.alert = {
              msg:data.message.errmsg,
              type:'danger',
              link:''
            };
          }
        })
        .catch(function(err){
          $rootScope.alert = {
            msg:err,
            type:'danger',
            link:''
          };
        });
    }; 
};

  RolesCtrl.$inject=['$scope', '$rootScope', 'userService'];

  function RolesCtrl($scope, $rootScope, userService){

    userService
      .role()
      .get({id:0})
      .$promise
      .then(function(data){
        if(!data.error){             
          $scope.roles = data.data;
        }
        else{
          $rootScope.alert = {
            msg:data.message.errmsg,
            type:'danger',
            link:''
          };
        }
      })
      .catch(function(err){
        $rootScope.alert = {
            msg:err.message,
            tyoe:'danger',
            link:''
          };
      });

    $scope.addrole = function(){      
      userService
        .role()
        .save({id:0}, $scope.role)
        .$promise
        .then(function(data){
          if(!data.error){
            $rootScope.alert = {
              msg:'Se creo con exito!',
              type:'success',
              link:''
            };          
            $scope.roles.push(data.data);
          }
          else{
            $rootScope.alert = {
              msg:data.message.errmsg,
              type:'danger',
              link:''
            };
          }
        })
        .catch(function(err){
          $rootScope.alert = {
            msg:err.message,
            tyoe:'danger',
            link:''
          };
        });
    };

  };