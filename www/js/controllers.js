goog.provide('starter.controllers.DashCtrl');
goog.provide('starter.controllers.ChatsCtrl');
goog.provide('starter.controllers.ChatDetailCtrl');
goog.provide('starter.controllers.AccountCtrl');

// TODO: controllers below should be moved to separated modules.

starter.controllers.DashCtrl = function($scope) {
};

/*
 * Chats Controller.
 * @param {!angular.$scope} $scope
 * @param {!starter.services.Chats} Chats
 * @constructor
 * @export
 * @ngInject
 */
starter.controllers.ChatsCtrl = function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
};

/*
 * Chat Detail Controller.
 * @param {!angular.$scope} $scope
 * @param {!angular.$scopeParams} $scopeParams
 * @param {!starter.services.Chats} Chats
 * @constructor
 * @export
 * @ngInject
 */
starter.controllers.ChatDetailCtrl = function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
};

/*
 * Account Controller.
 * @param {!angular.$scope} $scope
 * @constructor
 * @export
 * @ngInject
 */
starter.controllers.AccountCtrl = function($scope) {
  $scope.settings = {
    enableFriends: true
  };
};
