'use strict';

describe('Service: studentService', function () {

  // load the service's module
  beforeEach(module('studentPerformaceApp'));

  // instantiate service
  var studentService;
  beforeEach(inject(function (_studentService_) {
    studentService = _studentService_;
  }));

  it('should do something', function () {
    expect(!!studentService).toBe(true);
  });

});
