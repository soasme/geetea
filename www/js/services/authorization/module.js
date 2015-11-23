(function() {
  'use strict';

  angular.module('services.authorization', [
    'libs.oauth.google',
    'libs.hangouts.cookies',
    'services.authStorage'
  ]);

})();
