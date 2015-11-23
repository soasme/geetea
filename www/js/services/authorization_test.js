'use strict';

describe('services.authorization module', function() {

  var authorization, $rootScope, authStorage, googleOAuth, hangoutsCookies, $q;

  beforeEach(module('services.authorization'));
  beforeEach(inject(function(_authorization_, _authStorage_, _googleOAuth_, _hangoutsCookies_, _$rootScope_, _$q_){
    authorization = _authorization_;
    authStorage = _authStorage_;
    googleOAuth = _googleOAuth_;
    hangoutsCookies = _hangoutsCookies_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  describe('obtain', function() {
    it('should resolve cookies if authStorage has stored before', function () {
      spyOn(authStorage, 'has').and.returnValue(true);
      spyOn(authStorage, 'get').and.returnValue({'session': 'stored!'});
      authorization.obtain('client@google.com', ['email']).then(function(cookies) {
        expect(cookies.session).toEqual('stored!');
      }, function(data) {
        throw data;
      });
      $rootScope.$apply();
    });
  });
});
