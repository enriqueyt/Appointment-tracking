'use strict';

angular
	.module('iamWebApp')
  .controller('AppointmentsCtrl', AppointmentsCtrl);

  AppointmentsCtrl.$inject = ['$scope', '$rootScope', 'clientService', 'userService', 'appointmentService'];

  function AppointmentsCtrl($scope, $rootScope, clientService, userService, appointmentService){

       $rootScope.alert = {
          msg:'',
          tyoe:'',
          link:''
        };

      clientService
        .clients()
        .get({limit:10, skip:0})
        .$promise
        .then(function(data){
          $scope.lstclients = data.data;
        })
        .catch(function(err){
           $rootScope.alert = {
              msg:err.message,
              tyoe:'danger',
              link:''
            };
        });

      userService
        .AllUser()
        .get({limit:10, skip:0})
        .$promise
        .then(function(data){        
          $scope.lstusers = (data.data.filter(function(item){ return item.role.toString().indexOf('Admin') ==-1 }));
        })
        .catch(function(err){
           $rootScope.alert = {
              msg:err.message,
              tyoe:'danger',
              link:''
            };
        });

      $scope.addappointment = function(){
        
        var mt = moment(($scope.mytime)),
            ad = moment($scope.appointmentDate),
            dif = ad.diff(mt, 'days');
            
        $scope.appointment.appointmentDate = mt.add(dif+1, 'days').format();

        appointmentService
          .appointment()
          .save({}, $scope.appointment)
          .$promise
          .then(function(data){
            console.log(data)
            $rootScope.alert = {
              msg:'Cita creada correctamente!',
              tyoe:'success'
            };
          })
          .catch(function(err){
            $rootScope.alert = {
              msg:err.message,
              tyoe:'error'
            };
          })

        console.log($scope.appointment);

      };

      $scope.mytime = new Date();

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };

      $scope.clear = function() {
        $scope.mytime = null;
      };

      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
    
  };