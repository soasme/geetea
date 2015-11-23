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

});
