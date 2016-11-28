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
  	return {
  		appointment : function(id){
  			return $resource('http://127.0.0.1:3000/api/appointment/:appointment_id', {appointment_id:id}, {
  				update : {
					method : 'PUT'
				}
  			});
  		},
  		reassignedAppointment : function(app){
  			return $resource('http://127.0.0.1:3000/api/appointment/reassignedAppointment/:id/:newDate',{
  				id:app.id,
  				newDate:app.newDate
  			},{
  				method:'PUT'
  			});
  		},
  		list : function(app){
  			return $resource('http://127.0.0.1:3000/api/appointment/list/:by/:value',{
  				by:app.by,
  				value:app.value
  			},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		list : function(){
  			return $resource('http://127.0.0.1:3000/api/appointment/allAppointments',{},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		appointmentsByUser : function(app){
  			return $resource('http://127.0.0.1:3000/api/appointment/appointmentsByUser/:createBy/:skip/:limit',{
  				createBy : app.createBy,
  				limit : app.limit,
  				skip : app.skip
  			},{
  				method:'GET',
  				isArray:true
  			});
  		},
  		appointmentsUserByDay : function(app){
  			return $resource('http://127.0.0.1:3000/api/appointment/appointmentsUserByDay/:createBy/:date/:skip/:limit',{
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
  			return $resource('http://127.0.0.1:3000/api/appointment/groupByuser/:user_id/:date/:attended',{
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
