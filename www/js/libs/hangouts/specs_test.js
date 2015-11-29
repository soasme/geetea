(function() {
  'use strict';

  describe('libs.hangouts module, hangoutsSpecs factory', function() {

    var hangoutsSpecs;

    beforeEach(module('libs.hangouts'));
    beforeEach(inject(function(_hangoutsSpecs_) {
      hangoutsSpecs = _hangoutsSpecs_;
    }));

    describe("proto", function() {
      it("should find proto success", function() {
        // see proto definition.
        expect(hangoutsSpecs.FocusDevice.FOCUS_DEVICE_DESKTOP).toEqual(20);
      });

      it("should encode+decode data success", function() {
        var message = new hangoutsSpecs.LinkData("link_target");
        var data = message.encode().toArrayBuffer();
        expect(hangoutsSpecs.LinkData.decode(data).link_target).toEqual("link_target");
      });
    })

  });

})();
