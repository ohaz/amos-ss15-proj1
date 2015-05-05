define([
  "require",
  "annuitaetendarlehen/calc",
  "./testData1.js"
], function (
  require,
  calc
) {
  "use strict";

  describe("annuitaetendarlehen/calc", function () {
    [
      "testData1"
    ].forEach(function (dataModule) {
      it("should return the correct result for " + dataModule, function () {
        var testData = require("./" + dataModule + ".js");
        expect(calc(testData.input)).toEqual(testData.expectedOutput);
      });
    });
  });
});
