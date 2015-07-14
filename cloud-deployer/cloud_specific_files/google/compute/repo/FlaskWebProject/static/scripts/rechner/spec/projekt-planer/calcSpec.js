define([
  "require",
  "projekt-planer/calc",
  "./testData1.js",
  "./testData2.js"
], function (
  require,
  calc
) {
  "use strict";

  describe("projekt-planer/calc", function () {
    [
      "testData1",
      "testData2"
    ].forEach(function (dataModule) {
      it("should return the correct result for " + dataModule, function () {
        var testData = require("./" + dataModule + ".js");
        expect(calc(testData.input)).toEqual(testData.expectedOutput);
      });
    });
  });
});
