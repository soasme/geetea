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
});
