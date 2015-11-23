(function() {
  'use strict';

  angular
    .module('services.authorization')
    .factory('storage', storage);

  storage.$inject = ['$window'];

  function storage($window) {
    return {
      set: setAuthStorage,
      get: getAuthStorage,
      has: hasAuthStorage,
      del: deleteAuthStorage
    };


    function setAuthStorage(cookies) {
      $window.localStorage.setItem('cookies', JSON.stringify(cookies));
    }

    function getAuthStorage() {
      return JSON.parse($window.localStorage.getItem('cookies'));
    }

    function hasAuthStorage() {
      return $window.localStorage.getItem('cookies') !== null;
    }

    function deleteAuthStorage() {
      $window.localStorage.removeItem('cookies');
    }
  }
})();
