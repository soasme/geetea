(function() {
  'use strict';

  angular
    .module('services.authorization')
    .factory('obtain', obtain);

  obtain.$inject = ['$q', 'googleOAuth', 'authStorage', 'hangoutsCookies'];

  function obtain($q, googleOAuth, authStorage, hangoutsCookies) {
    return function(clientId, scope) {
      return $q(function(resolve, reject) {
        if (authStorage.has()) {
          var cookies = authStorage.get();
          resolve(cookies);
        } else {
          googleOAuth.auth(clientId, scope).then(function(token) {
            hangoutsCookies.get(token.tokenType, token.accessToken).then(function(cookies) {
              authStorage.set(cookies);
              resolve(cookies);
            }, function(reason) {
              reject(reason);
            });
          }, function(reason) {
            reject(reason);
          });
        }
      });
    };
  }
})();
