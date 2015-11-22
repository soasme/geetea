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


  describe('get', function() {

  it('should fail when ubertext api failed', function() {
      $httpBackend.when(
        'GET', 'https://accounts.google.com/accounts/OAuthLogin?source=geetea&issueuberauth=1',
        {'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a'}
      ).respond(403, 'forbidden');
      hangoutsCookies.get(
        'Bearer', 'e72e16c7e42f292c6912e7710c838347ae178b4a'
      ).then(
        function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('get uberauth failed');
        }
      );
      $httpBackend.flush();
  });
  });
});
