'use strict';

describe('services.authStorage module', function () {
  var authStorage, $window;

  beforeEach(module('services.authStorage'));
  beforeEach(inject(function(_authStorage_, _$window_) {
    authStorage = _authStorage_;
    $window = _$window_;
  }));

  afterEach(function() {
    authStorage.del();
  });

  describe('set get', function() {
    it('should set cookies to localStorage', function() {
      authStorage.set({key: 'value'});
      expect(authStorage.get().key).toEqual('value');
    });

    it('should get null form localStorage', function() {
      expect(authStorage.get()).toEqual(null);
    });
  });

  describe('has', function() {
    it('should return false for localStorage dose not have cookies', function() {
      expect(authStorage.has()).toBeFalsy();
    })

    it('should return true for localStorage has cookies', function() {
      authStorage.set({key: 'value'});
      expect(authStorage.has()).toBeTruthy();
    })
  });

  describe('del', function() {
    it('should delete cookies in localStorage', function() {
      authStorage.set({key: 'value'});
      authStorage.del();
      expect(authStorage.get()).toEqual(null);
    });

    it('should delete cookies in localStorage even if cookies is null', function() {
      authStorage.del();
      expect(authStorage.get()).toEqual(null);
    });
  })
})