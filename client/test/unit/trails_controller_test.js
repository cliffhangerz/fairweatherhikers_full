var angular = require('angular');
require('angular-mocks');

describe('test trails controller', () => {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a trails controller', () => {
    var trailsctrl = $controller('TrailsController');
    expect(typeof trailsctrl).toBe('object');
    expect(typeof trailsctrl.getAll).toBe('function');
  });

  describe('REST functionality', () => {
    var $httpBackend;
    var trailsctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      trailsctrl = $controller('TrailsController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET trails', () => {
      $httpBackend.expectGET('http://localhost:3000/api/trails').respond(200, [{ trailName: 'Tiger Mountain' }]);
      trailsctrl.getAll();
      $httpBackend.flush();
      expect(trailsctrl.trails.length).toBe(1);
      expect(trailsctrl.trails[0].trailName).toBe('Tiger Mountain');
    });

    it('should create trail info', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/trails', { trailName: 'Jolly Mountain' }).respond(200, { trailName: 'Dragon Mountain' }); // eslint-disable-line
      expect(trailsctrl.trails.length).toBe(0);
      trailsctrl.newTrail = { trailName: 'Jolly Mountain' };
      trailsctrl.createTrail();
      $httpBackend.flush();
      expect(trailsctrl.trails[0].trailName).toBe('Dragon Mountain');
      expect(trailsctrl.newTrail).toBe(null);
    });

    it('should update trail', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/trails/1', { trailName: 'Mima Lake Falls', editing: true, _id: 1 }).respond(200); // eslint-disable-line

      trailsctrl.trails = [ { trailName: 'Mima Lake', editing: true, _id: 1 } ];
      trailsctrl.trails[0].trailName = 'Mima Lake Falls';
      trailsctrl.updateTrail(trailsctrl.trails[0]);
      $httpBackend.flush();
      expect(trailsctrl.trails[0].editing).toBe(false);
    });

    it('should delete trail info', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/trails/1').respond(200);
      trailsctrl.trails = [{ trailName: 'Jolly Mountain', _id: 1 }];
      trailsctrl.removeTrail(trailsctrl.trails[0]);
      $httpBackend.flush();
      expect(trailsctrl.trails.length).toBe(1);
    });
  });
});