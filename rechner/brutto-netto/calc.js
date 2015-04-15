define([
  './config',
  './rechnerPast/BruttoNettoMain',
  './rechner/calc'
], function (
  config,
  calcPast,
  calcSince2013
) {

  return function calc(input) {
    input.lohnzahlzeitraum = parseInt(input.lohnzahlzeitraum, 10);
    input.config = config;

    if (input.veranlagungsjahr >= 2013) {
      return calcSince2013.calc(input);
    }
    else {
      return calcPast.calc(input);
    }
  }

});
