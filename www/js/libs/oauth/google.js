angular
  .module('libs.oauth.google', ['libs.oauth.utils'])
  .factory('$googleOAuth', ['$window', '$http', '$q', '$OAuthUtils',
           function($window, $http, $q, $OAuthUtils) {

    var getOAuth2URL= function(clientId, appScope, redirectURI) {
      return (
        'https://accounts.google.com/o/oauth2/auth?client_id=' +
        clientId +
        '&redirect_uri=' +
        redirectURI +
        '&scope=' +
        appScope.join(" ") +
        '&approval_prompt=force&response_type=token'
      );
    };

    var parseOAuth2Response = function(url) {
      if (url.split('#').length != 2) {
        return null;
      }
      var parameters = $OAuthUtils.parseResponseParameters(url.split('#')[1]);
      if (parameters.access_token === undefined || parameters.access_token === null) {
        return null;
      }
      return {
        accessToken: parameters.access_token,
        tokenType: parameters.token_type,
        expiresIn: parseInt(parameters.expires_in)
      };
    };
  }]);
