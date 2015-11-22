angular
  .module('libs.oauth.google', ['libs.oauth.utils'])
  .factory('googleOAuth', ['$window', '$http', '$q', 'OAuthUtils',
           function($window, $http, $q, OAuthUtils) {

    var _getOAuth2URL = function(clientId, appScope, redirectURI) {
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

    var _parseOAuth2Response = function(url) {
      if (url.split('#').length !== 2) {
        return null;
      }
      var parameters = OAuthUtils.parseResponseParameters(url.split('#')[1]);
      if (parameters.access_token === undefined || parameters.access_token === null) {
        return null;
      }
      return {
        accessToken: parameters.access_token,
        tokenType: parameters.token_type,
        expiresIn: parseInt(parameters.expires_in)
      };
    };

    var _isAppEnvironmentValid = function() {
      return $window.cordova !== undefined && $window.cordova !== null;
    };

    var _getRedirectURI = function(options) {
      var redirectURI = "http://localhost/callback";
      if (options !== undefined && options.hasOwnProperty('redirect_uri')) {
        redirectURI = options.redirect_uri;
      }
      return redirectURI;
    };

    var auth = function(clientId, appScope, options) {
      return $q(function(resolve, reject) {
        if (!_isAppEnvironmentValid()) {
          reject("App is running in invalid environment");
          return;
        }

        var redirectURL = _getRedirectURI(options);
        var authURL = _getOAuth2URL(clientId, appScope, redirectURL);

        OAuthUtils.browseUntil(authURL, redirectURL).then(
          function(event) {
            var token = _parseOAuth2Response(event.url);
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
      _getOAuth2URL: _getOAuth2URL,
      _parseOAuth2Response: _parseOAuth2Response,
      _isAppEnvironmentValid: _isAppEnvironmentValid,
      _getRedirectURI: _getRedirectURI,

      // Exposed Main Function
     /*
     * @param {string} clientId
     * Identifies the client that is making the request. The value passed in this parameter must exactly match the value shown in the Google Developers Console.(including the http or https scheme, case, and trailing '/').
     *
     * @param {string} appScope
     * Identifies the Google API access that your application is requesting.The values passed in this parameter inform the consent screen that is shown to the user.To see the available scopes for all Google APIs, visit https://developers.google.com/apis-explorer/#p/
     *
     * @param {object} options
     * You can customize `redirectURL` in options. It's optional.
     *
     * @return {promise}
     * You can get accessToken/tokenType/expiresIn in success callback, or reason in failure callback.
     *
     * @example
     * googleOAuth.auth('your-client-id.apps.googleusercontent.com', ['email']).then(
     *  function(data) {
     *    console.log(data.accessToken, data.tokenType, data.expiresIn);
     *  }, function(error_message) {
     *    console.log(error_message)
     *  }
     * )
     */
      auth: auth
    };
  }]);
