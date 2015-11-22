angular
  .module('libs.hangouts.cookies', ['ngCookies'])
  .factory('hangoutsCookies', ['$http', '$cookies', '$q', function($http, $cookies, $q) {

    var _getHeaders = function(tokenType, accessToken) {
      return {
        Authorization: tokenType + ' ' + accessToken
      };
    };

    var _OAuthLogin = function(headers) {
      return $q(function(resolve, reject) {
        var uberAuthURL = 'https://accounts.google.com/accounts/OAuthLogin?source=geetea&issueuberauth=1';
        $http.get(uberAuthURL, {headers: headers}).then(function(resp) {
          resolve(resp.data);
        }, function(resp) {
          reject(resp.data);
        });
      });
    };

    var _mergeSession = function(ubertext, headers) {
      return $q(function(resolve, reject) {
        var mergeSessionURL = 'https://accounts.google.com/MergeSession?service=mail&continue=http://www.google.com&uberauth=' + ubertext;
        $http.get(mergeSessionURL, {headers: headers}).then(function(resp) {
          resolve($cookies.getAll());
        }, function(resp) {
          reject(resp.data);
        });
      });
    };
    return {
    };
  }]);
