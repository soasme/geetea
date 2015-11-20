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

    var isAppEnvironmentValid = function() {
      return $window.cordova !== undefined && $window.cordova !== null;
    };

    var getRedirectURI = function(options) {
      var redirectURI = "http://localhost/callback";
      if (options !== undefined && options.hasOwnProperty('redirect_uri')) {
        redirectURI = options.redirect_uri;
      }
      return redirectURI;
    };

    var auth = function(clientId, appScope, options) {
      return $q(function(resolve, reject) {
        if (!isAppEnvironmentValid()) {
          reject("App is running in invalid environment");
          return;
        }

        var redirectURL = getRedirectURI(options);
        var authURL = getOAuth2URL(clientId, appScope, redirectURL);

        $OAuthUtils.browseUntil(authURL, redirectURL).then(
          function(event) {
            var token = parseOAuth2Response(event.url);
            if (!token) {
              reject("Problem authenticating");
              return;
            }
            resolve(token);
          }, function(event) {
            reject("The authentication was canceled");
          }
        )
      });
    };

    return {
      // Helper functions
      getOAuth2URL: getOAuth2URL,
      parseOAuth2Response: parseOAuth2Response,
      isAppEnvironmentValid: isAppEnvironmentValid,
      getRedirectURI: getRedirectURI,

      // Exposed Main Function
      auth: auth
    };
  }]);
