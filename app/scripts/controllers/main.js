'use strict';

/**
 * @ngdoc function
 * @name iamWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iamWebApp
 */
angular
	.module('iamWebApp')
  	.controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [];

  function MainCtrl(){

  	this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
  }