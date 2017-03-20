'use strict';

angular
	.module('iamWebApp')
  .controller('AppointmentsCtrl', AppointmentsCtrl)
  .controller('AddAppointmentsCtrl', AddAppointmentsCtrl)
  .controller('ModalAppointmentCtrl', ModalAppointmentCtrl);

  AppointmentsCtrl.$inject = ['$scope', '$rootScope', '$uibModal', 'appointmentService'];

  function AppointmentsCtrl($scope, $rootScope, $uibModal, appointmentService){

    appointmentService
      .allAppointments()
      .get({limit:100, skip:0})
      .$promise
      .then(function(data){
        console.log(data);
        if(data.error){
          $rootScope.alert = {
            msg:data.message.message,
            type:'danger'
          };
          return;
        }
        $scope.lstAppointments = data.data;
      })
      .catch(function(err){
        console.log(err);
      });

    $scope.showAppointment = function(appointment){

      var modalInstance = $uibModal.open({
        animation:true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/views/modals/modal_appointment.html',
        controller: 'ModalAppointmentCtrl',
        controllerAs: '$ctrl',
        size: 'lg',        
        resolve: {
          appointment: function () {
            return appointment;
          }
        }
      });

      modalInstance.result.then(function (data) {
        if(typeof data.data=='object'){
          for(var i=0;$scope.lstAppointments.length<i;i++){
              if($scope.lstAppointments[i]==appointment){
                $scope.lstAppointments[i]=data.data;
              }
          };
        }
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

  };

  AddAppointmentsCtrl.$inject = ['$scope', '$rootScope', 'clientService', 'userService', 'appointmentService'];

  function AddAppointmentsCtrl($scope, $rootScope, clientService, userService, appointmentService){

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
        var mt = moment($scope.mytime),
            ad = moment($scope.appointmentDate),
            dif = ad.diff(mt, 'days');
        console.log(mt)
        $scope.appointment.appointmentDate = mt.add(dif+1, 'days').format();
        
        appointmentService
          .appointment()
          .save({appointment_id:0}, $scope.appointment)
          .$promise
          .then(function(data){
            if(!data.error){
              $scope.appointment = data.data
              $rootScope.alert = {
                msg:'Cita creada correctamente!',
                type:'success'
              };
            }
            else{
              $rootScope.alert = {
                msg:data.message,
                type:'danger'
              };
            }
          })
          .catch(function(err){
            $rootScope.alert = {
              msg:err.message,
              type:'danger'
            };
          });

      };

      $rootScope.mytime = new Date();

      $rootScope.hstep = 1;
      $rootScope.mstep = 15;

      $rootScope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };

      $rootScope.ismeridian = true;
      $rootScope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $rootScope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };

      $rootScope.clear = function() {
        $scope.mytime = null;
      };

      $rootScope.today = function() {
        $scope.dt = new Date();
      };
      $rootScope.today();

      $rootScope.clear = function() {
        $scope.dt = null;
      };

      $rootScope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $rootScope.dateOptions = {
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

      $rootScope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $rootScope.toggleMin();

      $rootScope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $rootScope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $rootScope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $rootScope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $rootScope.format = $scope.formats[0];
      $rootScope.altInputFormats = ['M!/d!/yyyy'];

      $rootScope.popup1 = {
        opened: false
      };

      $rootScope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $rootScope.events = [
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

  ModalAppointmentCtrl.$inject=['$scope', '$rootScope', '$uibModalInstance', 'appointment', 'appointmentService'];

  function ModalAppointmentCtrl($scope, $rootScope, $uibModalInstance, appointment, appointmentService){
    var aux = new Date(), auxDate = appointment.appointmentDate;
    
    $scope.appointment=appointment;
    $scope.appointmentDate = new Date(moment(appointment.appointmentDate, moment.ISO_8601).format("YYYY"),moment(appointment.appointmentDate, moment.ISO_8601).format("MM"),moment(appointment.appointmentDate, moment.ISO_8601).format("DD"))
    aux.setHours( moment(appointment.appointmentDate, moment.ISO_8601).format('HH') );
    aux.setMinutes( moment(appointment.appointmentDate, moment.ISO_8601).format('mm') );
    $scope.mytime = aux;
    
    $scope.updateAppointment = function(){
      
      var mt = moment($scope.mytime),
          ad = moment($scope.appointmentDate),
          dif = ad.diff(mt, 'days'),
          obj = {};

      $scope.appointment.appointmentDate = mt.add(dif+1, 'days').format();
          
      obj._id=$scope.appointment._id;
      obj.appointmentDate=$scope.appointment.appointmentDate;
      
      if(obj.appointmentDate!=auxDate){
        appointment.reAssigned=true;
        obj.reAssigned=true;
      }
        
      if($scope.appointment.address.length>0)
        obj.address=$scope.appointment.address;

      if($scope.appointment.description.length>0)
        obj.description=$scope.appointment.description;
      
      appointmentService
        .appointment()
        .update({appointment_id:obj._id},obj)
        .$promise
        .then(function(data){
          $uibModalInstance.dismiss(data);
        })
        .catch(function(err){
          console.log(err);
        })
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.appointment);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };    

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
      $scope.appointmentDate = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
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

    $scope.changed = function () {
      $log.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };

    
  };