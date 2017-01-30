'use strict';

angular
  .module('iamWebApp')
  .controller('CreateDistributionLineCtrl', CreateDistributionLineCtrl)
  .controller('DistributorLineCtrl', DistributorLineCtrl);

  MainCtrl.$inject = ['$scope', '$rootScope', 'userService'];

  function CreateDistributionLineCtrl($scope, $rootScope, userService){
  	
    $scope.dom = {
        message :'',
        link:'',
        class:''
      };

  	$scope.createDistributionLine = function(){

  		userService
  			.distributionLine()
  			.save({id:0}, $scope.dl)
  			.$promise
  			.then(function(data){
  				console.log(data)
  				$scope.dom.message = 'Creación exitosa!';
  				$scope.dom.class = 'alert-success col-md-12';
  			})
  			.catch(function(err){
  				console.log('Error', err)
  				$scope.dom.message = 'Ups! ' + err.data;
  				$scope.dom.class = 'alert-danger col-md-12';
  			});
  	};
    
  };

  MainCtrl.$inject = ['$scope', '$rootScope', 'userService'];

  function DistributorLineCtrl($scope, $rootScope, userService){    

    $scope.dom = {
      message :'',
      link:'',
      class:''
    };

    $scope.lstDistributionLine = [];

    userService
      .allDistributionLine()
      .get({limit:5,skip:1})
      .$promise
      .then(function(data){
          console.log(data.data)
          $scope.lstDistributionLine = data.data;
      })
      .catch(function(err){
        $scope.dom.message = 'Ups! ' + err.data;
        $scope.dom.class = 'alert-danger col-md-12';
      });

  };