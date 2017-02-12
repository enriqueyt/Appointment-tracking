'use strict';

angular
	.module('iamWebApp')
    .controller('ClientCtrl', ClientCtrl)
    .controller('AddClientCtrl', AddClientCtrl)

    ClientCtrl.$inject = ['$scope', '$rootScope'];

    function ClientCtrl($scope, $rootScope){

  	    $scope.init = 'ClientCtrl';
    
    };

    AddClientCtrl.$inject = ['$scope', '$rootScope'];

    function AddClientCtrl($scope, $rootScope){

  	    $scope.init = 'AddClientCtrl';
    
    };