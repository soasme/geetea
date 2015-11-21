'use strict';

describe('libs.oauth.utils module', function() {
  var $OAuthUtils;
  beforeEach(module('libs.oauth.utils'));
  beforeEach(inject(function(_$OAuthUtils_) {
    $OAuthUtils = _$OAuthUtils_;
  }));

  describe('isInAppBrowserInstalled', function() {
    it('should check cordova-plugin-inappbrowser', function() {
      expect($OAuthUtils.isInAppBrowserInstalled({'cordova-plugin-inappbrowser': true})).toBeTruthy();
    });
    it('should check org.apache.cordova.inappbrowser', function() {
      expect($OAuthUtils.isInAppBrowserInstalled({'org.apache.cordova.inappbrowser': true})).toBeTruthy();
    });
    it('is not in app browser otherwise', function() {
      expect($OAuthUtils.isInAppBrowserInstalled({})).toBeFalsy();
    })
  });

  describe('createNonce', function() {
    it('should generate empty string if length == 0', function() {
      expect($OAuthUtils.createNonce(0)).toEqual('');
    });
    it('should generate 1 chars if length == 1', function() {
      expect($OAuthUtils.createNonce(1).length).toEqual(1);
    });
    it('should generate 99 chars if length == 99', function() {
      expect($OAuthUtils.createNonce(99).length).toEqual(99);
    });
  });

  describe('generateUrlParameters', function() {
    it('should map key and value to `key=value`', function() {
      expect($OAuthUtils.generateUrlParameters({key: 'value'})).toEqual('key=value');
    });
    it('should concat multiple keys via `&`', function() {
      expect($OAuthUtils.generateUrlParameters({k: 'v', v: 'k'})).toEqual('k=v&v=k');
    });
    it('should sort keys', function() {
      expect($OAuthUtils.generateUrlParameters({a: 3, b: 2})).toEqual('a=3&b=2');
      expect($OAuthUtils.generateUrlParameters({b: 3, a: 2})).toEqual('a=2&b=3');
    });
  });

  describe('parseResponseParameters', function() {
    it('should parse key and value separated by `=`', function() {
      expect($OAuthUtils.parseResponseParameters('key=value')).toEqual({key: 'value'});
    });
    it('should split multiple keys via `&`', function() {
      expect($OAuthUtils.parseResponseParameters("k=v&v=k")).toEqual({k: 'v', v: 'k'});
    });
  });

  describe('browseUntil', function() {
    it('should open window to start authentication flow', inject(function($window) {
      spyOn($window, 'open').and.callFake(function() {return {
        addEventListener: function(event, cb) {}
      };});
      $OAuthUtils.browseUntil('http://localhost', 'options=blah');
      expect($window.open).toHaveBeenCalledWith('http://localhost', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
    }));
  });
});
