'use strict';

/**
 * @ngdoc service
 * @name iamWebApp.appointmentService
 * @description
 * # appointmentService
 * Service in the iamWebApp.
 */
angular.module('iamWebApp')
  .service('appointmentService', appointmentService);

  appointmentService.$inject = ['$resource'];

  function appointmentService ($resource){
	var url = 'http://'+((/localhost|127.0.0.1/g).test(location.href)?'localhost':'158.69.139.171')+':3000/';
  	return {
  		appointment : function(id){
  			return $resource(url+'api/appointment/:appointment_id', {appointment_id:'@appointment_id'}, {
  				'update' : {
					method : 'PUT'
				}
  			});
  		},
  		reassignedAppointment : function(app){
  			return $resource(url+'api/appointment/reassignedAppointment/:id/:newDate',{
  				id:app.id,
  				newDate:app.newDate
  			},{
  				method:'PUT'
  			});
  		},
  		list : function(app){
  			return $resource(url+'api/appointment/list/:by/:value',{
  				by:app.by,
  				value:app.value
  			},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		allAppointments : function(){
  			return $resource(url+'api/appointment/allAppointments/:limit/:skip',{limit:'@limit', skip:'@skip'});
  		},
  		appointmentsByUser : function(app){
  			return $resource(url+'api/appointment/appointmentsByUser/:createBy/:skip/:limit',{
  				createBy : app.createBy,
  				limit : app.limit,
  				skip : app.skip
  			},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		appointmentsUserByDay : function(app){
  			return $resource(url+'api/appointment/appointmentsUserByDay/:createBy/:date/:skip/:limit',{
  				createBy : app.createBy,
  				date : app.date,
  				limit : app.limit,
  				skip : app.skip
  			},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		appointmentsUserByDay : function(app){
  			return $resource(url+'api/appointment/groupByuser/:user_id/:date/:attended',{
  				user_id : app.user_id,
  				date : app.date,
  				attended : app.attended
  			},{
  				method:'GET',
  				isArray:true
  			});
  		}
  	};
  };
