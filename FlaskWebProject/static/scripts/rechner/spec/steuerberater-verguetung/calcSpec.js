define([
  "require",
  "steuerberater-verguetung/calc",
  "./testData1.js",
  "./testData2.js",
  "./testData3.js",
  "./testData4.js",
  "./testData5.js",
  "./testData6.js",
  "./testData7.js",
  "./testData8.js",
  "./testData9.js",
  "./testData10.js"
], function (
  require,
  calc
) {
  "use strict";

  describe("steuerberater-verguetung/calc", function () {
    [
      "testData1",
      "testData2",
      "testData3",
      "testData4",
      "testData5",
      "testData6",
      "testData7",
      "testData8",
      "testData9",
      "testData10"
    ].forEach(function (dataModule) {
      it("should return the correct result for " + dataModule, function () {
        var testData = require("./" + dataModule + ".js");
        expect(calc(testData.input)).toEqual(testData.expectedOutput);
      });
    });
  });
});
