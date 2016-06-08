var angular = require('angular');
require('angular-mocks');

describe('user profile controller', () => {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var userprofilectrl = $controller('UserprofileController');
    expect(typeof userprofilectrl).toBe('object');
    expect(typeof userprofilectrl.getAll).toBe('function');
  });

  describe('REST operation', () => {
    var $httpBackend;
    var userprofilectrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      userprofilectrl = $controller('UserprofileController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve trails', () => {
      $httpBackend.expectGET('http://localhost:3000/api/trails').respond(200, [{
        name: 'test trail'
      }]);
      userprofilectrl.getAll();
      $httpBackend.flush();
      expect(userprofilectrl.trails.length).toBe(1);
      expect(userprofilectrl.trails[0].name).toBe('test trail');
    });
  });
});
