'use strict';

describe('libs.hangouts.cookies module', function() {
  var hangoutsCookies, $httpBackend, $cookies, $rootScope;
  beforeEach(module('libs.hangouts.cookies'));
  beforeEach(inject(function($injector, _hangoutsCookies_, _$cookies_, _$rootScope_) {
    hangoutsCookies = _hangoutsCookies_;
    $rootScope = _$rootScope_;
    $cookies = _$cookies_;
    $httpBackend = $injector.get('$httpBackend');
  }));
});
