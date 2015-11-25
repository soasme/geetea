goog.provide('starter.services.Chats');

var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];


starter.services.Chats = function() { };

starter.services.Chats.prototype.all = function() {
  return chats;
};

starter.services.Chats.prototype.remove = function(chat) {
  chats.splice(chats.indexOf(chat), 1);
};

starter.services.Chats.prototype.get = function(chatId) {
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].id === parseInt(chatId)) {
      return chats[i];
    }
  }
  return null;
};

angular.module('starter.services', []).service('Chats', starter.services.Chats);
