'use strict';

angular
  .module('services.authorization', [
    'libs.oauth.google',
    'libs.hangouts.cookies',
    'services.authStorage',
  ])
  .factory('authorization', [
    '$q',
    'googleOAuth',
    'authStorage',
    'hangoutsCookies',
    function(
      $q,
      googleOAuth,
      authStorage,
      hangoutsCookies
    ) {
      return {
    }
  ]);
