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

  describe('parseOAuth2Response', function() {
    it('should find empty access token and then return empty object', function(){
      spyOn($OAuthUtils, 'parseResponseParameters').and.returnValue({});
      expect($googleOAuth.parseOAuth2Response('#')).toEqual(null);
      expect($googleOAuth.parseOAuth2Response('')).toEqual(null);
    });

    it('should find access_token and other related fields', function() {
      spyOn($OAuthUtils, 'parseResponseParameters').and.returnValue({
        access_token: 'token',
        token_type: 'type',
        expires_in: '1'
      });
      var parsed = $googleOAuth.parseOAuth2Response('#');
      expect(parsed.accessToken).toEqual('token');
      expect(parsed.tokenType).toEqual('type');
      expect(parsed.expiresIn).toEqual(1);
    });
  });


  describe('auth', function() {

    it('should be able to reject on parsing error', function() {
      authDeferred.resolve({
        url: 'http://localhost/callback', // without any parameters
      });
      $googleOAuth.auth('client@google.com', ['email']).then(function(data) {
        throw data;
      }, function(data) {
        expect(data).toEqual('Problem authenticating');
      });
      $rootScope.$apply();
    });

    it('should be able to reject on calceling flow', function() {
      authDeferred.reject({});
      $googleOAuth.auth('client@google.com', ['email']).then(function(data) {
        throw data;
      }, function(data) {
        expect(data).toEqual('The authentication was canceled');
      });
      $rootScope.$apply();
    });

    it('should be able to reject in wrong env', function() {
      $window.cordova = null;
      $googleOAuth.auth('client@google.com', ['email']).then(function(data) {
        throw data;
      }, function(data) {
        expect(data).toEqual('App is running in invalid environment');
      });
      $rootScope.$apply();
    });
  });


  describe('isAppEnvironmentValid', function() {
    it("should return false if cordova is not in env", function() {
      $window.cordova = null;
      expect($googleOAuth.isAppEnvironmentValid()).toBeFalsy();
    });

    it("should return true if cordova is in env", function() {
      $window.cordova = {};
      expect($googleOAuth.isAppEnvironmentValid()).toBeTruthy();
    });
  });


  describe('getRedirectURI', function() {
    it("should get http://localhost/callback as default uri", function() {
      expect($googleOAuth.getRedirectURI()).toEqual('http://localhost/callback');
    });
  })
});
