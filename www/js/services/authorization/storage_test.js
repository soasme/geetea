(function() {
  'use strict';

  describe('services.authorization module', function () {
    var storage, $window;

    beforeEach(module('services.authorization'));
    beforeEach(inject(function(_storage_, _$window_) {
      storage = _storage_;
      $window = _$window_;
    }));

    afterEach(function() {
      storage.del();
    });

    describe('set get', function() {
      it('should set cookies to localStorage', function() {
        storage.set({key: 'value'});
        expect(storage.get().key).toEqual('value');
      });

      it('should get null form localStorage', function() {
        expect(storage.get()).toEqual(null);
      });
    });

    describe('has', function() {
      it('should return false for localStorage dose not have cookies', function() {
        expect(storage.has()).toBeFalsy();
      });

      it('should return true for localStorage has cookies', function() {
        storage.set({key: 'value'});
        expect(storage.has()).toBeTruthy();
      });
    });

    describe('del', function() {
      it('should delete cookies in localStorage', function() {
        storage.set({key: 'value'});
        storage.del();
        expect(storage.get()).toEqual(null);
      });

      it('should delete cookies in localStorage even if cookies is null', function() {
        storage.del();
        expect(storage.get()).toEqual(null);
      });
    });
  });
})();
