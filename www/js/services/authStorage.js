angular
  .module('services.authStorage', [])
  .factory('authStorage', ['$window',
    function($window) {

      var setAuthStorage = function(cookies) {
        $window.localStorage.setItem('cookies', JSON.stringify(cookies));
      };

      var getAuthStorage = function() {
        return JSON.parse($window.localStorage.getItem('cookies'));
      };

      var hasAuthStorage = function() {
        return $window.localStorage.getItem('cookies') !== null;
      }

      var deleteAuthStorage = function() {
        $window.localStorage.removeItem('cookies');
      };

      return {
        set: setAuthStorage,
        get: getAuthStorage,
        has: hasAuthStorage,
        del: deleteAuthStorage
      }
  }]);