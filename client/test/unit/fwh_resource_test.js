const angular = require('angular');
var $httpBackend;

describe('it should test the app service', function() {

  beforeEach(angular.mock.module('demoApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all the trails resource', angular.mock.inject(function(fwhResource) {
    var resourceArr = [];
    var errsArr = [];
    var resource = new fwhResource(resourceArr, errsArr, 'http://localhost:3000/api/trails');

    $httpBackend.expectGET('http://localhost:3000/api/trails').respond(200, [{ trailName: 'Annette Lake' }]);
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArr.length).toBe(1);
    expect(errsArr.length).toBe(0);
    expect(resourceArr[0].trailName).toBe('Annette Lake');
  }));

  it('should return a function', angular.mock.inject(function(fwhResource) {
    expect(typeof fwhResource).toBe('function');
  }));

  it('should create a trail resource', angular.mock.inject(function(fwhResource, $httpBackend) {
    var resourceArr = [];
    var errsArr = [];
    var resource = new fwhResource(resourceArr, errsArr, 'http://localhost:3000/api/trails');

    $httpBackend.expectPOST('http://localhost:3000/api/trails', {trailName: 'Carbon Glacier'}).respond(200, { trailName: 'Bandera Mountain Trail', _id: 0 });
    resource.create({ trailName: 'Carbon Glacier' });
    $httpBackend.flush();
    expect(resourceArr.length).toBe(1);
    expect(errsArr.length).toBe(0);
    expect(resourceArr[0].trailName).toBe('Bandera Mountain Trail');
  }));

  it('should have update the trail resource', angular.mock.inject(function(fwhResource, $q) {
    var resourceArr = [{ trailName: 'Bare Mountain', _id: 1 }];
    var errsArr = [];
    var resource = new fwhResource(resourceArr, errsArr, 'http://localhost:3000/api/trails');

    $httpBackend.expectPUT('http://localhost:3000/api/trails/1', { trailName: 'Bare Mountain', _id: 1 }).respond(200);
    resource.update({ trailName: 'Bare Mountain', _id: 1 });
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(resourceArr[0].trailName).toBe('Bare Mountain');
  }));

 it('should delete the trails resource', angular.mock.inject(function(fwhResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:3000/api/trails/1').respond(200);
    var resourceArr = [{ trailName: 'Bandera Mountain Trail', _id: 1 }];
    var errsArr = [];
    var resource = new fwhResource(resourceArr, errsArr, 'http://localhost:3000/api/trails');
    resource.remove(resourceArr[0]);
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(resourceArr.length).toBe(0);
  }));
});