'use strict';

angular
	.module('iamWebApp')
    .controller('ClientCtrl', ClientCtrl)
    .controller('AddClientCtrl', AddClientCtrl)

    ClientCtrl.$inject = ['$scope', '$rootScope', 'clientService'];

    function ClientCtrl($scope, $rootScope, clientService){

        clientService
            .clients()
            .get({limit:10, skip:0})
            .$promise
            .then(function(data){
                $scope.lstclients = data.data||[];
            })
            .catch(function(err){
                console.log(err);
            })
    };

    AddClientCtrl.$inject = ['$scope', '$rootScope', 'clientService'];

    function AddClientCtrl($scope, $rootScope, clientService){

  	    $scope.init = 'AddClientCtrl';

        $scope.addclient=function(){
            
            clientService
                .client()
                .save({id:0}, $scope.client)
                .$promise
                .then(function(data){
                    if(!data.error){             
                        $scope.client = data.data;
                        $rootScope.alert = {
                            msg:'Creacion exitosa!',
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
                        msg:err.message.errmsg,
                        type:'danger',
                        link:''
                    };
                });
        };
    
    };