'use strict';

describe('libs.hangouts.cookies module', function() {
  var hangoutsCookies, $httpBackend, $cookies, $rootScope;
  beforeEach(module('libs.hangouts.cookies'));
  beforeEach(inject(function(_$httpBackend_, _hangoutsCookies_, _$cookies_, _$rootScope_) {
    hangoutsCookies = _hangoutsCookies_;
    $rootScope = _$rootScope_;
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;
  }));


  describe('get', function() {
    it('should get cookies successfully', function() {
      // mock uberauth api
      $httpBackend.when(
        'GET', 'https://accounts.google.com/accounts/OAuthLogin?source=geetea&issueuberauth=1',
        {'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a'}
      ).respond('some.kinda.ubertext');
      // mock merge session api
      $httpBackend.when(
        'GET', 'https://accounts.google.com/MergeSession?service=mail&continue=http://www.google.com&uberauth=some.kinda.ubertext',
        {'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a'}
      ).respond('whatever text', {
        'Set-Cookie': 'user-session=tada; expires=Sat, 18 Oct 2014 23:38:25 GMT'
      });
      // mock cookies' library action
      spyOn($cookies, 'getAll').and.returnValue({'user-session': 'tada', 'expires': 'Sat, 18 Oct 2014 23:38:25 GMT'});

      hangoutsCookies.get(
        'Bearer', 'e72e16c7e42f292c6912e7710c838347ae178b4a').then(
        function(data) {
          expect(data['user-session']).toEqual('tada');
          expect(data['expires']).toEqual('Sat, 18 Oct 2014 23:38:25 GMT');
        }, function() {
          throw data;
        }
      );

      $httpBackend.flush();
    });
  });

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

  it('should fail when merge session api failed', function() {
      // mock uberauth api
      $httpBackend.when(
        'GET', 'https://accounts.google.com/accounts/OAuthLogin?source=geetea&issueuberauth=1',
        {'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a'}
      ).respond('some.kinda.ubertext');
      // mock merge session api
      $httpBackend.when(
        'GET', 'https://accounts.google.com/MergeSession?service=mail&continue=http://www.google.com&uberauth=some.kinda.ubertext',
        {'Authorization': 'Bearer e72e16c7e42f292c6912e7710c838347ae178b4a'}
      ).respond(403, 'forbidden');

      hangoutsCookies.get(
        'Bearer', 'e72e16c7e42f292c6912e7710c838347ae178b4a'
      ).then(
        function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('merge session failed');
        }
      );

      $httpBackend.flush();
  });
});
