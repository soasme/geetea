(function(){
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

      it('should resolve cookies if google respond cookies', function() {
        spyOn(authStorage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve){ resolve({}); });
        });
        spyOn(hangoutsCookies, 'get').and.callFake(function() {
          return $q(function(resolve){ resolve({'session': 'respond!'}); });
        });

        authorization.obtain('client@google.com', ['email']).then(function(cookies) {
          expect(cookies.session).toEqual('respond!');
        }, function(data) {
          throw data;
        });
        $rootScope.$apply();
      });

      it('should reject if google oauth failed', function() {
        spyOn(authStorage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve, reject){ reject('google oauth failed'); });
        });

        authorization.obtain('client@google.com', ['email']).then(function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('google oauth failed');
        });
        $rootScope.$apply();
      });

      it('should reject if get hangouts cookies failed', function() {
        spyOn(authStorage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve){ resolve({}); });
        });
        spyOn(hangoutsCookies, 'get').and.callFake(function() {
          return $q(function(resolve, reject) { reject('get hangouts cookies failed'); });
        });

        authorization.obtain('client@google.com', ['email']).then(function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('get hangouts cookies failed');
        });
        $rootScope.$apply();
      });
    });
  });
})();

