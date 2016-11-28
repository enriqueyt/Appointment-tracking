'use strict';

describe('Service: appointmentService', function () {

  // load the service's module
  beforeEach(module('iamWebApp'));

  // instantiate service
  var appointmentService;
  beforeEach(inject(function (_appointmentService_) {
    appointmentService = _appointmentService_;
  }));

  it('should do something', function () {
    expect(!!appointmentService).toBe(true);
  });

});
