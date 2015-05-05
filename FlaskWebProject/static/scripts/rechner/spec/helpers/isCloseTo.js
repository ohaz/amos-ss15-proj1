(function () {

  function isCloseTo(actual, expected, jasmine) {
    var absDivergence,
        relDivergence;

    if (isNumber(actual) && isNumber(expected)) {
      absDivergence = actual - expected;
      relDivergence = absDivergence / (expected || 1e-10);

      return Math.abs(relDivergence) < 1e-12;
    }

    return jasmine.undefined;
  }

  function isNumber(a) {
    return typeof a === "number" && !isNaN(a) && isFinite(a);
  }

  jasmine.getEnv().addEqualityTester(isCloseTo);

}());
