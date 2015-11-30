(function() {
  'use strict';

  angular
    .module('libs.hangouts')
    .factory('hangoutsSpecs', hangoutsSpecs);

  // Need libs.hangouts provide `HANGOUT_SPECS_PROTO` constant.
  function hangoutsSpecs(HANGOUT_SPECS_PROTO) {
    var ProtoBuf = dcodeIO.ProtoBuf;
    var ByteBuffer = dcodeIO.ByteBuffer;
    var builder = ProtoBuf.loadProtoFile(HANGOUT_SPECS_PROTO);
    var root = builder.build();
    return root;
  }
})();
