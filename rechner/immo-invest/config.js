define(function () {

  var DATEV = {};

  DATEV.constants = {};

  DATEV.values = {
    monatlMiete: {
      value: 500,
      min: 0,
      max: 5000
    },
    zahlungszeitraum: {
      value: 5,
      min: 0,
      max: 30
    },
    prozMietsteigerung: {
      value: 5.00,
      min: 0.00,
      max: 10.00
    },
    zusaetzlichVerfuegbar: {
      value: 0,
      min: 0,
      max: 5000
    },
    einsetzbaresEK: {
      value: 0,
      min: 0,
      max: 999999
    },
    zinsUndTilgung: {
      value: 1.00,
      min: 1.00,
      max: 15.00
    },
    nebenkostenInProz: {
      value: 1.00,
      min: 1.00,
      max: 25.00
    }
  };

  return DATEV;

});
