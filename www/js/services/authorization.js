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
        obtain: function(clientId, scope) {
          return $q(function(resolve, reject) {
            if (authStorage.has()) {
              var cookies = authStorage.get();
              resolve(cookies);
            } else {
              googleOAuth.auth(clientId, scope).then(function(token) {
                hangoutsCookies.get(token.tokenType, token.accessToken).then(function(cookies) {
                }, function(reason) {
                  reject(reason);
                });
              }, function(reason) {
                reject(reason);
              });
            }
          });
        }
      };
    }
  ]);
