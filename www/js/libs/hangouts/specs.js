(function() {
  'use strict';

  angular
    .module('libs.hangouts.specs', [])
    .factory('hangoutsSpecs', hangoutsSpecs);

  function hangoutsSpecs() {
    var ProtoBuf = dcodeIO.ProtoBuf;
    var ByteBuffer = dcodeIO.ByteBuffer;
    var builder = ProtoBuf.loadProtoFile('./base/www/js/libs/hangouts/specs.proto');
    var root = builder.build();
    return root;
  }
})();
