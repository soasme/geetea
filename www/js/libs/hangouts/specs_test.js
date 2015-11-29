(function() {
  'use strict';

  describe('libs.hangouts module, hangoutsSpecs factory', function() {

    var hangoutsSpecs;

    beforeEach(module('libs.hangouts.specs'));
    beforeEach(inject(function(_hangoutsSpecs_) {
      hangoutsSpecs = _hangoutsSpecs_;
    }));

    describe("proto", function() {
      it("should find proto success", function() {
        // see proto definition.
        expect(hangoutsSpecs.FocusDevice.FOCUS_DEVICE_DESKTOP).toEqual(20);
      });
    })

  });

})();
