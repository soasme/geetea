(function(){
  'use strict';

  describe('services.authorization module', function() {

    var obtain, $rootScope, storage, googleOAuth, hangoutsCookies, $q;

    beforeEach(module('services.authorization'));
    beforeEach(inject(function(_obtain_, _storage_, _googleOAuth_, _hangoutsCookies_, _$rootScope_, _$q_){
      obtain = _obtain_;
      storage = _storage_;
      googleOAuth = _googleOAuth_;
      hangoutsCookies = _hangoutsCookies_;
      $rootScope = _$rootScope_;
      $q = _$q_;
    }));

    describe('obtain', function() {
      it('should resolve cookies if storage has stored before', function () {
        spyOn(storage, 'has').and.returnValue(true);
        spyOn(storage, 'get').and.returnValue({'session': 'stored!'});
        obtain('client@google.com', ['email']).then(function(cookies) {
          expect(cookies.session).toEqual('stored!');
        }, function(data) {
          throw data;
        });
        $rootScope.$apply();
      });

      it('should resolve cookies if google respond cookies', function() {
        spyOn(storage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve){ resolve({}); });
        });
        spyOn(hangoutsCookies, 'get').and.callFake(function() {
          return $q(function(resolve){ resolve({'session': 'respond!'}); });
        });

        obtain('client@google.com', ['email']).then(function(cookies) {
          expect(cookies.session).toEqual('respond!');
        }, function(data) {
          throw data;
        });
        $rootScope.$apply();
      });

      it('should reject if google oauth failed', function() {
        spyOn(storage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve, reject){ reject('google oauth failed'); });
        });

        obtain('client@google.com', ['email']).then(function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('google oauth failed');
        });
        $rootScope.$apply();
      });

      it('should reject if get hangouts cookies failed', function() {
        spyOn(storage, 'has').and.returnValue(false);
        spyOn(googleOAuth, 'auth').and.callFake(function() {
          return $q(function(resolve){ resolve({}); });
        });
        spyOn(hangoutsCookies, 'get').and.callFake(function() {
          return $q(function(resolve, reject) { reject('get hangouts cookies failed'); });
        });

        obtain('client@google.com', ['email']).then(function(data) {
          throw data;
        }, function(reason) {
          expect(reason).toEqual('get hangouts cookies failed');
        });
        $rootScope.$apply();
      });
    });
  });
})();

