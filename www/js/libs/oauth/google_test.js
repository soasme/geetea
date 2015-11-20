'use strict';

describe('libs.oauth.google module', function() {
  var $OAuthUtils, $window, $googleOAuth, $q, $rootScope;
  var authDeferred;

  beforeEach(module('libs.oauth.google'));
  beforeEach(inject(function(_$OAuthUtils_, _$googleOAuth_, _$window_, _$q_, _$rootScope_){
    $OAuthUtils = _$OAuthUtils_;
    $googleOAuth = _$googleOAuth_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    $window.cordova = jasmine.createSpyObj('cordova', ['require']);
    authDeferred = $q.defer();
    spyOn($OAuthUtils, 'browseUntil').and.returnValue(authDeferred.promise);
  }));

  describe('getOAuth2URL', function() {
    it('should build oauth2 url', function() {
      expect($googleOAuth.getOAuth2URL('clientId', ['scope1', 'scope2'], 'http://localhost')).toEqual(
        'https://accounts.google.com/o/oauth2/auth?client_id=clientId&redirect_uri=http://localhost&scope=scope1 scope2&approval_prompt=force&response_type=token'
      );
    })
  });
});
