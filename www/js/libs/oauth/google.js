angular
  .module('libs.oauth.google', ['libs.oauth.utils'])
  .factory('$googleOAuth', ['$window', '$http', '$q', '$OAuthUtils',
           function($window, $http, $q, $OAuthUtils) {
  }]);
