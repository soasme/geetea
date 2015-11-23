(function() {
  'use strict';

  angular
    .module('services.authorization')
    .factory('obtain', obtain);

  obtain.$inject = ['$q', 'googleOAuth', 'hangoutsCookies', 'storage'];

  function obtain($q, googleOAuth, hangoutsCookies, storage) {
    return function(clientId, scope) {
      return $q(function(resolve, reject) {
        if (storage.has()) {
          resolve(storage.get());
        } else {
          googleOAuth.auth(clientId, scope).then(function(token) {
            hangoutsCookies.get(token.tokenType, token.accessToken).then(function(cookies) {
              storage.set(cookies);
              resolve(cookies);
            }, reject);
          }, reject);
        }
      });
    };
  }
})();
